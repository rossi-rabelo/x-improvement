import * as Yup from 'yup';

import sequelize, { Sequelize } from 'sequelize';
import Event from '../models/Event';
import DataBase from '../../database/index';
import Employee from '../models/Employee';
import EventEmployee from '../models/EventEmployee';
import Companion from '../models/Companion';
import EventEmployeeCompanion from '../models/EventEmployeeCompanion';
import e from 'express';

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
    const employeeArray = [];
    const companionArray = [];

    event[0].forEach((elem) => {
      if (
        !companionArray.find(function (element) {
          return element.id == elem.companionId;
        })
        && elem.companionId
      ) {
        companionArray.push({ id: elem.companionId, name: elem.companionName });
      }
    });

    event[0].forEach((elem) => {
      if (
        !employeeArray.find(function (element) {
          return element.id == elem.employeeId;
        })
        && elem.employeeId
      ) {
        employeeArray.push({
          id: elem.employeeId,
          name: elem.employeeName,
          email: elem.employeeEmail,
          companions: companionArray,
        });
      }
    });

    event[0].forEach((elem) => {
      if (
        !eventArray.find(function (element) {
          return element.id == elem.eventId;
        }) && elem.eventId
      ) {
        eventArray.push({
          id: elem.eventId,
          name: elem.eventName,
          description: elem.eventDescription,
          place: elem.eventPlace,
          image: elem.eventImage,
          maxCompanion: elem.eventCompanion,
          employees: employeeArray,
        });
      }
    });

    return res.json(eventArray);
  }
}

export default new EventController();