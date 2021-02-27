import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormEmployeesComponent } from './components/form-employees/form-employees.component';

const routes: Routes = [
    { path: 'employees', component: EmployeesComponent },
    { path: 'employee/:action', component: FormEmployeesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'employees' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}