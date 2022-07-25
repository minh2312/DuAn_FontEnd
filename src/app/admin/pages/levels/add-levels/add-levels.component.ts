import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LevelsService } from 'src/app/service/levels.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-levels',
  templateUrl: './add-levels.component.html',
  styleUrls: ['./add-levels.component.css']
})
export class AddLevelsComponent implements OnInit {

  constructor(private levelService:LevelsService,private fb:FormBuilder,private route:Router) { }
  pipe = new DatePipe('en-US');
  ngOnInit(): void {
  }

  // info = new FormGroup({
  //   name:new FormControl(""),
  //   basicSalary:new FormControl(''),
  //   allowanceSalary:new FormControl(''),
  // })

  get f(){
    return this.info.controls;
  }

  info:FormGroup = new FormGroup({
    name:new FormControl(''),
    basicSalary:new FormControl(''),
    status:new FormControl('true')
  })


  onSubmit(){
    this.levelService.save(this.info.value).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm Mới Thành Công',
        showConfirmButton: false,
        timer: 1500
      });
      this.route.navigate(['/admin/add-level']);
    })
  }

}
