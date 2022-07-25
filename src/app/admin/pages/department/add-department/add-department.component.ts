import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
data:Department[] = [];
  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private route: Router) { }
  pipe = new DatePipe('en-US');
  info: FormGroup = new FormGroup({
    departmentCode: new FormControl('', [
                                          Validators.required,
                                          Validators.minLength(3),
                                          Validators.maxLength(10),
                                          this.noSpaceAllowed,
                                        ],
                                    ),
    nameDepartment: new FormControl('',
                                     [
                                        Validators.required,
                                        Validators.minLength(3),
                                        Validators.maxLength(150),
                                      ],
                                    ),
    status: new FormControl('true'),
  })
  get f() {
    return this.info.controls;
  }



  ngOnInit(): void {
    
  }


  onSubmit() {
    this.departmentService.save(this.info.value).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm Mới Thành Công',
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/admin/list-department']);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thêm Mới Không Thành Công...',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        this.route.navigate(['/admin/list-department']);
      }
    })
    console.log(this.info.value);
  }
  getDataFormService() {
    this.departmentService.findAll().subscribe((res) => {
      this.data = res;
    })
  }

  // validate không khoản trống
  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true }
    }
    return null;
  }


}
