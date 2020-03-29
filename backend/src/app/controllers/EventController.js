import * as Yup from 'yup';

import Event from '../models/Event';
import Employee from '../models/Employee';
import EventEmployee from '../models/EventEmployee';
import Companion from '../models/Companion';

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
    const event = await Event.findAll({
      include: [
        {
          model: Employee,
          through: { attributes: [] },
          include: [
            {
              model: EventEmployee,
              include: [
                {
                  model: Companion,
                },
              ],
              // through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return res.json(event);
  }
}

export default new EventController();
