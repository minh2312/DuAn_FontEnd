import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { ListDepartmentComponent } from './pages/department/list-department/list-department.component';

// Phân Trang
import {NgxPaginationModule} from 'ngx-pagination'; 
// Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { Ng2OrderModule } from 'ng2-order-pipe';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './pages/department/add-department/add-department.component';
import { AddLevelsComponent } from './pages/levels/add-levels/add-levels.component';
import { ListLevelComponent } from './pages/levels/list-level/list-level.component';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './pages/employees/list-employee/list-employee.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    IndexComponent,
    ListDepartmentComponent,
    AddDepartmentComponent,
    AddLevelsComponent,
    ListLevelComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule
  ],
  exports:[HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    IndexComponent,
    ListDepartmentComponent,
    AddDepartmentComponent,
    AddLevelsComponent,
    ListLevelComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,RouterModule
  ]
})
export class AdminModule { }
