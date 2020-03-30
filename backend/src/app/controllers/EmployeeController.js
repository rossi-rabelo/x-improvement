import Employee from '../models/Employee';
import EventEmployeeCompanion from '../models/EventEmployeeCompanion';
import Companion from '../models/Companion';
import EventEmployee from '../models/EventEmployee';
import Events from '../models/Event';

class EmployeeController {
  async store(req, res) {
    const employee = req.body.Employee;
    const companions = req.body.Companions;
    const event = req.body.Event;

    const existedEvent = await Events.findOne({ where: { id: event.id } });

    if (companions.length > existedEvent.dataValues.maxCompanion)
    {
      return res.status(400).json({ error: 'Companions exceeded!' });
    }

    let employeeExits = await Employee.findOne({ where: { email: employee.email } });

    if (!employeeExits)
    {
      await Employee.create(employee);
      employeeExits = await Employee.findOne({ where: { email: employee.email } });
    }

    const idEmployee = employeeExits.dataValues.id;

    const employeeInEvent = await EventEmployee.findOne({ where: { idEvent: event.id, idEmployee: idEmployee } });
    
    if (employeeInEvent)
    {
      await EventEmployeeCompanion.destroy({ where : { idEventEmployee: employeeInEvent.dataValues.id } });
      await EventEmployee.destroy({ where : { idEmployee: employeeInEvent.dataValues.idEmployee, idEvent: employeeInEvent.dataValues.idEvent } });
    }

    const eventEmployeeSave = {
      idEvent: event.id,
      idEmployee: idEmployee
    }

    await EventEmployee.create(eventEmployeeSave);

    const eventEmployee = await EventEmployee.findOne({ where: { idEvent: event.id, idEmployee: idEmployee } });

    const existsCompanions = [];

    for (const [index, element] of companions.entries())
    {
      const companionExists = await Companion.findOne({ where: { name: element.name } });

      if (companionExists)
      {
        existsCompanions.push({ id: companionExists.dataValues.id, name: companionExists.dataValues.name });
      }
      else
      {
        const companion = {
          name: element.name
        }

        await Companion.create(companion);
        const insertedCompanion = await Companion.findOne({ where: { name: element.name } });
        existsCompanions.push({ id: insertedCompanion.dataValues.id, name: element.name });
      }
    }

    const existsEventEmployeeCompanion = [];

    for (const [index, element] of existsCompanions.entries())
    {
      const eventEmployeeCompanion = {
        idEventEmployee: eventEmployee.dataValues.id,
        idCompanion: element.id,
      }

      await EventEmployeeCompanion.create(eventEmployeeCompanion);
      const insertedEventEmployeeCompanion = await EventEmployeeCompanion.findOne({ where: { idEventEmployee: eventEmployee.dataValues.id, idCompanion: element.id } });
      existsEventEmployeeCompanion.push(insertedEventEmployeeCompanion);
    }

    return res.json({ employee: employeeExits, eventEmployee: eventEmployee, companions: existsCompanions, eventEmployeeCompanion: existsEventEmployeeCompanion });
  }

  async delete(req, res) {
    const idEmployee = req.params.idEmployee.replace('idEmployee=', '');
    const idEvent = req.params.idEvent.replace('idEvent=', '');

    console.log(idEmployee, 'idemployee')

    const employeeInEvent = await EventEmployee.findOne({ where: { idEvent: idEvent, idEmployee: idEmployee } });

    if (employeeInEvent)
    {
      console.log(employeeInEvent.dataValues.id, 'employee in event')
      await EventEmployeeCompanion.destroy({ where : { idEventEmployee: employeeInEvent.dataValues.id } });
      await EventEmployee.destroy({ where : { idEmployee: employeeInEvent.dataValues.idEmployee, idEvent: idEvent } });
      res.sendStatus(200);
    }

    return  res.status(400).json({ error: 'Nothing to delete!' });
  }
}

export default new EmployeeController();
