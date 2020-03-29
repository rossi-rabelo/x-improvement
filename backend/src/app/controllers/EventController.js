import * as Yup from 'yup';

import Event from '../models/Event';
import DataBase from '../../database/index';

class EventController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      maxCompanion: Yup.number().required(),
      description: Yup.string().max(100),
      place: Yup.string().max(100),
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
  const selectQuery = " select e.id eventId, e.name eventName, e.maxCompanion eventCompanion, e.description eventDescription, employees.id employeeId, employees.email employeeEmail, employees.name employeeName, c.id companionId, c.name companionName " +
                      "from " +
                      "events e " +
                      "inner join eventsemployees ee on e.id = ee.idEvent " +
                      "inner join employees on ee.idEmployee = employees.id  " +
                      "inner join eventsemployeescompanions eec on eec.idEventEmployee = ee.id " +
                      "inner join companions c on eec.idCompanion = c.id ";
  const event = await DataBase.connection.query(selectQuery);
  const eventArray = [];
  const employeeArray = [];
  const companionArray = [];

  event[0].forEach(elem => {
    if (!companionArray.find(function(element) { return element.id == elem.companionId }))
    {
      companionArray.push({ id: elem.companionId, name: elem.companionName });
    }
  });

  event[0].forEach(elem => {
    if (!employeeArray.find(function(element) { return element.id == elem.employeeId }))
    {
      employeeArray.push({ id: elem.employeeId, name: elem.employeeName, email: elem.employeeEmail, companions: companionArray });
    }
  });

  event[0].forEach(elem => {
    if (!eventArray.find(function(element) { return element.id == elem.eventId }))
    {
      eventArray.push({ id: elem.eventId, name: elem.name, maxCompanion: elem.eventCompanion, employees: employeeArray });
    }
  });

    return res.json(eventArray);
  }
}

export default new EventController();