import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { Levels } from 'src/app/model/levels';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { LevelsService } from 'src/app/service/levels.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private empService:EmployeeService,
    private departmentService:DepartmentService,
    private levelService:LevelsService,
    private httpClient:HttpClient,
    private route:Router,
    private r: ActivatedRoute) { }
    file:any;
    listDepartment:Department[] = [];
    listLevel:Levels[] = [];
    form: any = {};
    depControl = new FormControl();
    levelControl = new FormControl();
    email = new FormControl('', [Validators.required, Validators.email]);
    id:'';
    ngOnInit(): void {
      this.id = this.r.snapshot.params.id;
      this.empService.findById(this.id).subscribe(res=>{
      this.form.id = res.id,
      this.form.codeEmployee = res.codeEmployee,
      this.form.nameEmployee  = res.nameEmployee,
      // this.form.image = `${this.file.name}`,
      this.form.email = res.email, 
      this.form.phone = res.phone, 
      this.form.address = res.address,
      this.form.ethnic = res.ethnic,
      this.form.gender = res.gender,
      this.form.birthday = res.birthday,
      this.form.status = res.status,
      this.form.updateDate = res.updateDate,
      this.form.dep = res.dep,
      this.form.level = res.level
      })
     
    }


    // upload ảnh
    uploadFile(e:any){
      this.file = e.target.files[0];
    }

  employee:Employee;
  formUpdateEmp(id:any){
    // this.empService.findById(id).subscribe(res=>{
    //   // this.form.id = res.id,
    //   // this.form.codeEmployee = res.codeEmployee,
    //   // this.form.nameEmployee  = res.nameEmployee,
    //   // // this.form.image = `${this.file.name}`,
    //   // this.form.email = res.email, 
    //   // this.form.phone = res.phone, 
    //   // this.form.address = res.address,
    //   // this.form.ethnic = res.ethnic,
    //   // this.form.gender = res.gender,
    //   // this.form.birthday = res.birthday,
    //   // this.form.status = res.status,
    //   // this.form.updateDate = res.updateDate,
    //   // this.form.dep = res.dep,
    //   // this.form.level = res.level;
    // })
  }


emp:Employee;
  onSubmit(){
    // var formData = new FormData();
    // formData.append('img',this.file,this.file.name);
    // // this.info.value.image = `${this.file.name}`
    // // this.emp.image = `${this.file.name}`;
    // this.httpClient.post('http://localhost:9999/api/listEmployees/upload-file',formData,{observe : 'response'}).subscribe(res=>{
    // })
    
    // this.emp = new Employee(
    //   this.form.id,
    //   this.form.codeEmployee ,
    //   this.form.nameEmployee,
    //   this.form.image = `${this.file.name}`,
    //   this.form.email,
    //   this.form.phone,
    //   this.form.address,
    //   this.form.ethnic,
    //   this.form.gender = 1,
    //   this.form.birthday,
    //   this.form.status = 1,
    //   this.form.updateDate,
    //   this.form.dep,
    //   this.form.level,
    // );

    //     // this.empService.save(this.emp).subscribe(res=>{
    //     //   Swal.fire({
    //     //     position: 'center',
    //     //     icon: 'success',
    //     //     title: 'Thêm Mới Thành Công',
    //     //     showConfirmButton: false,
    //     //     timer: 1500
    //     //   });
    //     //   this.route.navigate(['admin/list-employee'])
    //     // })
    // console.log(this.emp);
    
  }


    // validate email
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'Email không được để trống';
      }
      return this.email.hasError('email') ? 'Email không đúng định dạng' : '';
    }

}
