import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddDepartmentComponent } from './pages/department/add-department/add-department.component';
import { ListDepartmentComponent } from './pages/department/list-department/list-department.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './pages/employees/list-employee/list-employee.component';
import { AddLevelsComponent } from './pages/levels/add-levels/add-levels.component';
import { ListLevelComponent } from './pages/levels/list-level/list-level.component';

const routes: Routes = [
  {path:'',component:IndexComponent,children:[
    {path:'',component:DashboardComponent},
    
    // route quản lý phòng ban
    {path:'list-department',component:ListDepartmentComponent},
    {path:'add-department',component:AddDepartmentComponent},

    // route quản lý cấp bậc
    {path:'list-level',component:ListLevelComponent},
    {path:'add-level',component:AddLevelsComponent},

    // route quản lý nhân viên
    {path:'list-employee',component:ListEmployeeComponent},
    {path:'list-employee/:id',component:EditEmployeeComponent},
    {path:'add-employee',component:AddEmployeeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
