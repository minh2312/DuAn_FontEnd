import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { Levels } from 'src/app/model/levels';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { LevelsService } from 'src/app/service/levels.service';
// import { SystemConstants } from '/core/common/system.constants';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private empService:EmployeeService,
    private departmentService:DepartmentService,
    private levelService:LevelsService) { }
  data:Employee[] = [];
  listDepartment:Department[] = [];
  listLevel:Levels[] = [];
  urlImageServer:any = 'http://localhost:9999/api/listEmployees/image=';
  urlDep = 'http://localhost:9999/api/ListDepartment';
  form: any = {};
  file:any;
  depControl = new FormControl();
  levelControl = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {
    // lấy ra danh sách phòng ban
    this.departmentService.findAll().subscribe(res=>{
      this.listDepartment = res;
    })
    // lấy ra danh sách cấp bậc
    this.levelService.findAll().subscribe(res=>{
      this.listLevel = res;
    })
    this.getDataFormService();
    
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

  // lấy dữ liệu từ database
  getDataFormService(){
    this.empService.getAll().subscribe((res)=>{
     this.data = res;
    }) 
  }

  getData(){
    this.empService.getAll().subscribe(
      res => {this.empService.listData = res;}
    );
  }

// cập nhập
  onSubmit(){
      
  }

  uploadFile(e:any){
   
    this.file = e.target.files[0];
  }
// getFormById
employee:Employee;
  formUpdateEmp(id:any){
    this.empService.findById(id).subscribe(res=>{
      this.info = new FormGroup({
        codeEmployee: new FormControl(`${res.codeEmployee}`),
        nameEmployee: new FormControl(`${res.nameEmployee}`),
        email: new FormControl(`${res.email}`),
        phone: new FormControl(`${res.phone}`),
        address: new FormControl(`${res.address}`),
        ethnic: new FormControl(`${res.ethnic}`),
        gender: new FormControl(`${res.gender}`),
        birthday: new FormControl(`${res.birthday}`),
        status: new FormControl(`${res.status}`),
        dep: new FormGroup({
          id: new FormControl(`${res.dep.id}`),
        }),
        level: new FormGroup({
          id: new FormControl(`${res.level.id}`),
        }),
        image: new FormControl(`${res.image}`),
        id:new FormControl(`${res.id}`),
      })
    })
  }


// validate email
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email không được để trống';
    }
    return this.email.hasError('email') ? 'Email không đúng định dạng' : '';
  }
}
