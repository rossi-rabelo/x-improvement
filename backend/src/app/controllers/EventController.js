import * as Yup from 'yup';
import Event from '../models/Event';
import DataBase from '../../database/index';

class EventController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      maxCompanion: Yup.number().required(),
      description: Yup.string().max(700),
      place: Yup.string().max(100),
	  image: Yup.string().max(200),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const eventExists = await Event.findOne({ where: { name: req.body.name } });

    if (eventExists) {
      return res.status(400).json({ error: 'Event already exists.' });
    }

    await Event.create(req.body);

    const event = await Event.findOne({ where: { name: req.body.name } });

    return res.json(event);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().max(100),
      maxCompanion: Yup.number(),
      description: Yup.string().max(100),
      place: Yup.string().max(100),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const event = await Event.findByPk(req.body.id);

    if (!event) {
      return res.status(400).json({ error: 'Event not found' });
    }

    const updatedEvent = await event.update(req.body);

    return res.json(updatedEvent);
  }

  async index(req, res) {
    const selectQuery =
      ' select e.id eventId, e.name eventName, e.maxCompanion eventCompanion, e.description eventDescription, e.place eventPlace, e.image eventImage, employees.id employeeId, employees.email employeeEmail, employees.name employeeName, c.id companionId, c.name companionName ' +
      'from ' +
      'events e ' +
      'inner join eventsEmployees ee on e.id = ee.idEvent ' +
      'inner join employees on ee.idEmployee = employees.id  ' +
      'inner join eventsEmployeesCompanions eec on eec.idEventEmployee = ee.id ' +
      'inner join companions c on eec.idCompanion = c.id ' +
      'union ' +
      'select e.id eventId, e.name eventName, e.maxCompanion eventCompanion, e.description eventDescription, e.place eventPlace, e.image eventImage, null employeeId, null employeeEmail, null employeeName, null companionId, null companionName ' +
      'from ' +
      'events e ';
    const event = await DataBase.connection.query(selectQuery);
    const eventArray = [];
	
    event[0].forEach((e) => {
      let employeeArray = [];
      let companionArray = [];
        event[0].forEach((elem) => {
          if (!companionArray.find(function (element) { return element.id == elem.companionId }) &&
              elem.companionId) 
          {
            companionArray.push({ id: elem.companionId, name: elem.companionName, idEmployee: elem.employeeId });
          }
        });
  
        event[0].forEach((elem) => {
          if (
            !employeeArray.find(function (element) {
              return element.id == elem.employeeId;
            })
            && (employeeArray.find(function (element) {
                return element.idEvent == elem.eventId;
              }) || employeeArray.length == 0)
            && (companionArray.find(function (element) { return element.idEmployee == elem.employeeId } ))
            && elem.employeeId
          )
          {
            const tempCompanion = []
            companionArray.forEach((companion) => {
              if (companion.idEmployee == elem.employeeId)
              {
                tempCompanion.push(companion);
              }
            });
            employeeArray.push({
              id: elem.employeeId,
              name: elem.employeeName,
              email: elem.employeeEmail,
              companions: tempCompanion,
              idEvent: elem.eventId
            });
          }
        });
        companionArray = []
  
        event[0].forEach((elem) => {
          if (
            (!eventArray.find(function (element) {
              return element.id == elem.eventId;
            }) 
			|| eventArray.length == 0)
            && (employeeArray.find(function (element) { return element.idEvent == elem.eventId } ) || eventArray.length == 0)
            && elem.eventId
          )
          {
            const tempEmployee = [];
            employeeArray.forEach((employee) => {
              if (employee.idEvent == elem.eventId)
              {
                tempEmployee.push(employee);
              }
            });
            eventArray.push({
              id: elem.eventId,
              name: elem.eventName,
              description: elem.eventDescription,
              place: elem.eventPlace,
              image: elem.eventImage,
              maxCompanion: elem.eventCompanion,
              employees: tempEmployee,
            });
          }
       });
    });
	
	console.log(eventArray);

    return res.json(eventArray);
  }
}

export default new EventController();
