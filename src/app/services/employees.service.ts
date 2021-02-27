import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseURL: string;
  employees: Employee[];
  employee: Employee;

  constructor( private http: HttpClient ) {

    this.baseURL = 'http://localhost:3000/api/employees';
    this.employees = [];
    this.employee = new Employee();
    
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL);
  }

  getEmployee(employeeID: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseURL}/${employeeID}`);
  }

  createEmployee(employee: Employee): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseURL, employee, { headers });
  }

  updateEmployee(employee: Employee): any {
    return this.http.put(`${this.baseURL}/${employee._id}`, employee);
  }

  deleteEmployee(employeeID: string): any {
    return this.http.delete(`${this.baseURL}/${employeeID}`);
  }
}
