import * as Yup from 'yup';
import Employee from '../models/Employee';

class EmployeeController {
  async store(req, res) {
    const employee = req.body.Employee
    const companions = req.body.Companions
    const event = req.body.Event

    console.log(employee, 'employee')
    console.log(employee.email, 'email')

    const employeeExits = await Employee.findOne({ where: { email: employee.email } });

    console.log(employeeExits, 'employeeExits')
    console.log(companions, 'companions')
    console.log(event, 'event')
  }
}

export default new EmployeeController();