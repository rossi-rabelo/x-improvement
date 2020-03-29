import Employee from '../models/Employees';
import EventEmployeeCompanion from '../models/EventEmployeeCompanion';
import Companion from '../models/Companion';
import EventEmployee from '../models/EventEmployee';
import Events from '../models/Events';

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

    console.log(employee, 'employee')
    console.log(employee.email, 'email')

    const employeeExits = await Employee.findOne({ where: { email: employee.email } });

    if (!employeeExits)
    {
      employeeExits = await this.createEmployeeReturnId(employee);
    }

    const idEmployee = employeeExits.dataValues.id;
    console.log(event.id, 'eventid')
    console.log(idEmployee, 'idemployee')

    const employeeInEvent = await EventEmployee.findOne({ where: { idEvent: event.id, idEmployee: idEmployee } });
    console.log(employeeInEvent, 'employee in event')
    
    if (employeeInEvent)
    {
      await this.deleteEventsEmployeeCompanionByIdEmployee(employeeInEvent.dataValues.id);
    }

    const eventEmployee = {
      idEvent: event.id,
      idEmployee: idEmployee
    }

    await EventEmployee.create(eventEmployee);

    const idEventEmployee = await EventEmployee.findOne({ where: { idEvent: event.id, idEmployee: idEmployee } });
    console.log(idEventEmployee.dataValues);

    const existsCompanions = [];

    for (const [index, element] of companions.entries())
    {
      console.log(element, 'elemnt')
      const companionExists = await Companion.findOne({ where: { name: element.name } });

      if (companionExists)
      {
        existsCompanions.push({ id: companionExists.dataValues.id });
      }
      else
      {
        const companion = {
          name: element.name
        }

        await Companion.create(companion);
        const insertedCompanion = await Companion.findOne({ where: { name: element.name } });
        existsCompanions.push(insertedCompanion.dataValues.id);
      }
    }

    console.log(existsCompanions)

    await existsCompanions.map(async (element) => {
      const eventEmployeeCompanion = {
        idEventEmployee: idEventEmployee.dataValues.id,
        idCompanion: element.id,
      }

      await EventEmployeeCompanion.create(eventEmployeeCompanion);
    });
  }

  async createEmployeeReturnId(employee) {
    await Employee.create(employee);

    return await Employee.findOne({ where: { email: employee.email } }).dataValues.id;
  }

  async getEventEmployeeByIds(idEmployee, idEvent) {
    return await EventEmployee.findOne({ where: { idEvent: idEvent, idEmployee: idEmployee } }).dataValues.id;
  }

  async deleteEventsEmployeeCompanionByIdEmployee(idEventEmployee) {
    await EventEmployeeCompanion.destroy({
      where : { idEventEmployee: idEventEmployee }
    });
  }
}

export default new EmployeeController();
