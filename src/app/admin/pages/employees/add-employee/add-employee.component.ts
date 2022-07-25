import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { Levels } from 'src/app/model/levels';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { LevelsService } from 'src/app/service/levels.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  urlDep = 'http://localhost:9999/api/ListDepartment';
  file: any;
  listDepartment: Department[] = [];
  listLevel: Levels[] = [];
  form: any = {};

  constructor(private employeeService: EmployeeService,
    private httpClient: HttpClient,
    private departmentService: DepartmentService,
    private levelService: LevelsService,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // lấy ra danh sách phòng ban
    this.departmentService.findAll().subscribe(res => {
      this.listDepartment = res;
    })
    // lấy ra danh sách cấp bậc
    this.levelService.findAll().subscribe(res => {
      this.listLevel = res;
    })

  }

  // upload ảnh
  uploadFile(e: any) {
    this.file = e.target.files[0];
  }



  info: FormGroup = new FormGroup({
    codeEmployee: new FormControl(''),
    nameEmployee: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    ethnic: new FormControl(),
    gender: new FormControl("0"),
    birthday: new FormControl(),
    status: new FormControl("0"),
    dep: new FormGroup({
      id: new FormControl(),
    }),
    level: new FormGroup({
      id: new FormControl(),
    }),
    image: new FormControl(''),
  });


  onSubmit() {
    var formData = new FormData();
    formData.append('img', this.file, this.file.name);
    this.info.value.image = `${this.file.name}`
    // this.emp.image = `${this.file.name}`;
    this.httpClient.post('http://localhost:9999/api/listEmployees/upload-file', formData, { observe: 'response' }).subscribe(res => {
    })
    this.employeeService.save(this.info.value).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm Mới Thành Công',
        showConfirmButton: false,
        timer: 1500
      });
      this.route.navigate(['admin/list-employee'])
    })
  }



  
}
