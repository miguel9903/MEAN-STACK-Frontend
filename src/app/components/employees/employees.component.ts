import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor( public employeesService: EmployeesService ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getEmployees()
        .subscribe(resp => {
          console.log(resp);
          this.employeesService.employees = resp;
        });
  }

  deleteEmployee(employeeID: string): void {
    Swal.fire({
      title: 'Eliminar empleado',
      text: `¿Está seguro de eliminar a este empleado?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
          this.employeesService.deleteEmployee(employeeID)
              .subscribe(resp => {
                console.log(resp);
                this.getEmployees();
              });
      } 
    });
  }

}
