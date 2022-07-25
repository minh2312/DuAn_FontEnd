import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Levels } from 'src/app/model/levels';
import { LevelsService } from 'src/app/service/levels.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-level',
  templateUrl: './list-level.component.html',
  styleUrls: ['./list-level.component.css']
})
export class ListLevelComponent implements OnInit {
  data: Levels[] = [];
  nameSearch: any = '';
  itemPage: number = 5;
  totalLength: any;
  page: number = 1;
  lichSu:Levels[] = [];
  constructor(private levelService: LevelsService,private route:Router) { }

  ngOnInit(): void {
    this.getDataFormService();
  }


  // lấy dữ liệu
  getDataFormService() {
    this.levelService.findAll().subscribe(res => {
      this.data = res;
    })
  }


  // tìm kiếm
  Search() {
    if (this.nameSearch == '') {
      this.ngOnInit();
    } else {
      this.levelService.search(this.nameSearch).subscribe(res => {
        this.data = res;
      })
    }
  }


  // số item muốn hiển thị trên 1 trang 
  showItem(number: any) {
    this.itemPage = number.target.value;
  }


  // sắp xếp theo ....
  reverse:boolean = false;
  sort(name: string) {
    this.reverse = !this.reverse;
    if(this.reverse == true){
      this.levelService.sort(name).subscribe(res=>{
        this.data = res;
      })
    }else{
      this.levelService.sortASC(name).subscribe(res=>{
        this.data = res;
      })
    }
  }


  remove(id:number){
   this.levelService.remove(id).subscribe(res=>{
    if(res){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa Thành Công',
        showConfirmButton: false,
        timer: 1500
      });
      this.ngOnInit();
    }
   })
  }




  infoUpdate:FormGroup = new FormGroup({
    name:new FormControl(''),
    basicSalary:new FormControl(''),
    status:new FormControl('true'),
    id:new FormControl(),
  })

  onSubmitUpdate(){
    this.levelService.update(this.infoUpdate.value).subscribe(res=>{
      if(res){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập Nhập Thành Công',
          showConfirmButton: false,
          timer: 1000
        });
        this.ngOnInit()
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Cập Nhập Không Thành Công',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
    // console.log(this.infoUpdate.value);
    
  }

  formUpdate(id:number){
    this.levelService.getById(id).subscribe(res=>{
      this.infoUpdate = new FormGroup({
        name:new FormControl(`${res.name}`),
        basicSalary:new FormControl(`${res.basicSalary}`),
        status:new FormControl(`${res.status}`),
        id:new FormControl(`${res.id}`)
      })
    })
  }






  clickHistory(){
    this.levelService.history().subscribe(res => {
      this.lichSu = res;
    });
  }



  deleteLevel(){
    const x = this.level.length;
    if(x > 0){
      Swal.fire({
        title: 'Bạn Có Chắc Chắn Xóa Hết Dữ Liệu',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.level.forEach(res => {
            this.infoUpdate = new FormGroup({
              name:new FormControl(`${res.name}`),
              basicSalary:new FormControl(`${res.basicSalary}`),
              status:new FormControl(`${res.status}`),
              id:new FormControl(`${res.id}`)
            });
            this.levelService.removeToHistory(this.infoUpdate.value).subscribe(result=>{
              if(result){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Xóa Thành Công',
                  showConfirmButton: false,
                  timer: 900
                });
                this.getDataFormService();
              }
            })
          });
        }
      })
    }
  }



  // check box all item

  checkBox:boolean = false;level:Levels[] = [];
  deleteAll(e: any) {
   this.checkBox = e.target.checked;
   if(this.checkBox){
    this.data.forEach(e => {
      e.status = false;
      this.level.push(e);
    });
   }else{
    this.level = [];
   }
  }


  checkDelete(e:any){

  }
}
