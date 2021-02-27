import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-form-employees',
  templateUrl: './form-employees.component.html',
  styleUrls: ['./form-employees.component.css']
})
export class FormEmployeesComponent implements OnInit {

  action: string;
  formEmployee: FormGroup;
  actionCompleted: boolean;
  alertMessage: string;

  constructor( private activatedRoute: ActivatedRoute,
               private formBuilder: FormBuilder,
               public employeesService: EmployeesService ) { 
    this.action = '';
    this.formEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.actionCompleted = false;
    this.alertMessage = '';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params.action === 'add') {
        this.action = 'agregar';
      } else {
        this.employeesService.getEmployee(params.action)
            .subscribe(resp => {
              this.employeesService.employee = resp;
              this.formEmployee.setValue({
                name: resp.name,
                lastname: resp.lastname,
                position: resp.position,
                office: resp.office,
                salary: resp.salary,
                age: resp.age,
                image: resp.image
              });
            });
        this.action = 'editar';
      }
    });
  }

  addOrUpdateEmployee(selectedEmployee?: Employee): void {
    if(this.formEmployee.invalid) {
        Object.values(this.formEmployee.controls).forEach(control => {
          control.markAsTouched();
        });
    } else {
        if(this.action === 'agregar') {
          this.employeesService.createEmployee(this.formEmployee.value)
              .subscribe(resp => {
                console.log(resp);
                this.actionCompleted = true;
                this.alertMessage = resp.message;
              });
        } else {
           const employeeData = {
             _id: this.employeesService.employee._id,
             ...this.formEmployee.value
           };
           this.employeesService.employee._id;
           this.employeesService.updateEmployee(employeeData)
               .subscribe(resp => {
                 console.log(resp);
                 this.actionCompleted = true;
                 this.alertMessage = resp.message;
               });
        }
    }
  }

  validateField(field: string) {
    return this.formEmployee.get(field).invalid && this.formEmployee.get(field).touched;
  }
}
