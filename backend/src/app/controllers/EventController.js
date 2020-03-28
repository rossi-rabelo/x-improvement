import * as Yup from 'yup';
import Event from '../models/Event';

class EventController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      maxCompanion: Yup.number().required(),
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
      name: Yup.string(),
      maxCompanion: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const event = await Event.findByPk(req.body.id);

    const updatedEvent = await event.update(req.body);

    return res.json(updatedEvent);
  }
}

export default new EventController();
