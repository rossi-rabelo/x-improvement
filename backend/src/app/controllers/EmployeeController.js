import * as Yup from 'yup';
import Employee from '../models/Employees';
import EventEmplooyeeCompanion from '../models/EventEmplooyeeCompanion';
import Companion from '../models/Companion';
import EventEmployee from '../models/EventEmployee';
import Events from '../models/Events';

class EmployeeController {
  async store(req, res) {
    const employee = req.body.Employee;
    const companions = req.body.Companions;
    const event = req.body.Event;

    const event = await Events.findOne({ where: { id: event.id } });

    if (companions.length > event.dataValues.maxCompanion)
    {
      return res.status(400).json({ error: 'Companions exceeded!' });
    }

    console.log(employee, 'employee')
    console.log(employee.email, 'email')

    const employeeExits = await Employee.findOne({ where: { email: employee.email } });

    if (!employeeExits)
    {
      employeeExits = await createEmployeeReturnId(employee);
    }

    const idEmployee = employeeExits.dataValues.id;

    const employeeInEvent = await getEventEmployeeByIds(event.id, idEmployee);
    
    if (employeeInEvent)
    {
      await deleteEventsEmployeeCompanionByIdEmployee(employeeInEvent.dataValues.id);
    }

    const idEventEmployee = await this.createEventEmployeeReturnId(event.id, employee.id);
    const existsCompanions = createCompanionsPopulateArray(companions);

    existsCompanions.forEach(element => {
      const eventEmployeeCompanion = {
        idEventEmployee: idEventEmployee,
        idCompanion: element.id,
      }

      await EventEmplooyeeCompanion.create(eventEmployeeCompanion);
    });
  }

  async createCompanionsPopulateArray(companions) {
    const existsCompanions = [];
    
    companions.forEach(element => {
      const companionExists = await getCompanionByName(element.name);

      if (companionExists)
      {
        existsCompanions.push({ id: companionExists.dataValues.id });
        companions.filter(function(value) { return value != element; });
      }
      else
      {
        await Companion.create(element.name);
        existsCompanions.push(await getCompanionByName(element.name).dataValues.id);
      }
    });

    return existsCompanions;
  }

  async createEmployeeReturnId(employee) {
    await Employee.create(employee);

    return await Employee.findOne({ where: { email: employee.email } }).dataValues.id;
  }

  async createEventEmployeeReturnId(idEvent, idEmployee) {
    const eventEmployee = {
      idEvent: idEvent,
      idEmployee: idEmployee
    }

    await EventEmployee.create(eventEmployee, { w: 1 }, { returning: true });

    return await EventEmployee.findOne({ where: { idEvent: idEvent, idEmployee: idEmployee } }).dataValues.id;
  }

  async getCompanionByName(name) {
    return await Companion.findOne({ where: { name: name } });
  }

  async getEventEmployeeByIds(idEmployee, idEvent) {
    return await EventEmployee.findOne({ where: { idEvent: idEvent, idEmployee: idEmployee } });
  }

  async deleteEventsEmployeeCompanionByIdEmployee(idEventEmployee) {
    await EventEmplooyeeCompanion.destroy({
      where : { idEventEmployee: idEventEmployee }
    });
  }
}

export default new EmployeeController();