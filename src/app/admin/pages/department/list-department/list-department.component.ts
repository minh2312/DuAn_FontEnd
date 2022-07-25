import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  data: Department[] = [];
  lichSu: Department[] = [];
  totalLength: any;
  page: number = 1;
  nameSearch: any;
  orderBy: String = '';
  itemPage: number = 5;
  itemPageHistory: number = 5;
  pageHistory:number = 1;
  constructor(private departmentService: DepartmentService, private route: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.getDataFormService();
  }


  // form đẻ lấy dữ liệu cho form update
  infoUpdate: FormGroup = new FormGroup({
    departmentCode: new FormControl(""),
    nameDepartment: new FormControl(""),
    status: new FormControl("true"),
    id: new FormControl(),
  })

  // lấy dữ liệu trên json về
  getDataFormService() {
    this.departmentService.findAll().subscribe((res) => {
      this.data = res;
    })
  }

  //toLowerCase : chuyển đổi tất cả các dang chữ về chữ thường
  Search() {
    if (this.nameSearch == "") {
      this.ngOnInit();
    } else {
      this.departmentService.searchByName(this.nameSearch.trim()).subscribe(res => {
        this.data = res;
      })
      // console.log(this.nameSearch);
    }
  }
  name: string = '';
  reverse: boolean = false;


  // sắp Xếp
  sort(name: string) {
    this.reverse = !this.reverse;
    if (this.reverse == true) {
      this.departmentService.orderByDESC(name).subscribe(res => {
        this.data = res;
      })
    } else {
      this.ngOnInit();
    }
  }


  // Xóa dữ liệu vào lịch sử xóa
  remove(e: any) {
    Swal.fire({
      title: 'Bạn Có Chắc Chắn Muốn Xóa Không',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        e.status = false;
        this.departmentService.updateStatus(e).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa Thành Công',
            showConfirmButton: false,
            timer: 1500
          });
          this.getDataFormService();
        })
      }
    })
  }


  // xóa hẳn dữ liệu khỏi database
  removeInDataBase(id: any) {
    Swal.fire({
      title: 'Bạn Có Chắc Chắn Muốn Xóa Không',
      text: "Bạn Sẽ Không Thể Khôi Phục Được Lại Nữa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.remove(id).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa Thành Công',
            showConfirmButton: false,
            timer: 1500
          });
          this.clickHistory();
        })
      }
    })
  }

  // load all lịch sử đã xóa
  clickHistory() {
    this.departmentService.history().subscribe(res => {
      this.lichSu = res;
    });
  }


  // khôi phục item đã xóa
  khoiPhuc(i: any) {
    Swal.fire({
      title: 'Bạn Có Chắc Chắn Muốn Khôi Phục Dữ Liệu Không',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        i.status = true;
        this.departmentService.updateStatus(i).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Khôi Phục Thành Công',
            showConfirmButton: false,
            timer: 500
          });
          this.clickHistory();
          this.getDataFormService();
        })
      }
    })
  }




  // lấy giá trị của form update
  formUpdate(id: any) {
    this.departmentService.findById(id).subscribe(res => {
      this.infoUpdate = new FormGroup({
        departmentCode: new FormControl(`${res.departmentCode}`),
        nameDepartment: new FormControl(`${res.nameDepartment}`),
        status: new FormControl(`${res.status}`),
        id: new FormControl(`${res.id}`),
      })
    })
  }


  // xử lý submit update
  onSubmitUpdate() {
    this.departmentService.update(this.infoUpdate.value).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhập Thành Công',
        showConfirmButton: false,
        timer: 1500
      });
      this.ngOnInit();
      
      // this.route.navigate(['/admin/list-department'])
    })
  }


  // số item muốn hiển thị trên 1 page
  showItem(number: any) {
    this.itemPage = number.target.value;
  }

  // function này để lấy ra những sản phẩm người dùng click vào muốn xóa
  id: any; idArr: number[] = []; check: boolean = false;
  checkDelete(e: any) {
    this.id = e.target.value;// lấy giá trị id của item từ cái iput click vào
    this.check = e.target.checked;// lấy ra trị true hoặc false từ cái chúng ta chọn để xóa, và gán nó cho giá trị check
    
    // check xem nếu cái this.check == true thì add cái id của input vào 1 cái mảng còn else thì xóa bỏ cái id vừa thêm vào mảng đó
    if (this.check) {
      this.idArr.push(this.id);
    } else {
      for (let i = 0; i < this.idArr.length; i++) {
        if (this.check == false && this.idArr[i] == this.id) {
          this.idArr.splice(i, 1);
        }
      }
    }
  }




  // phương thức khi người dùng click vào muốn xóa tất cả các items
  checkBoxAll: boolean = false; phongBan: Department[] = [];getById:any;
  deleteAll(e: any) {
    this.checkBoxAll = e.target.checked;
    if (this.checkBoxAll) {
      this.data.forEach(e => {
        e.status = false;
        this.phongBan.push(e);
      });
    } else {
      this.phongBan = [];
    }
    this.getById = e.target.id;
   
  }






  // phương thức dùng để xóa các items
  deleteDep() {
    const x = this.idArr.length
    const y = this.phongBan.length
    // check xem nếu checkBool Mà Bằng true thì mới bắt đầu hiển thị thông báo bạn có muốn xóa không
    if (y > 0 && this.data.length >0) {
      // aler hiển thị thông báo
      Swal.fire({
        title: 'Bạn Có Chắc Chắn Xóa Hết Dữ Liệu',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        // check xem nếu họ confirn Ok thì nhảy vào if;
        if (result.isConfirmed) {
          // duyệt mảng phòng ban ra và gán cho cái form update;
          this.phongBan.forEach(res=>{
            this.infoUpdate = new FormGroup({
              departmentCode: new FormControl(`${res.departmentCode}`),
              nameDepartment: new FormControl(`${res.nameDepartment}`),
              status: new FormControl(`${res.status}`),
              id: new FormControl(`${res.id}`),
            });
            // call đến api để thực thi remove vào history
            this.departmentService.removeToHistory(this.infoUpdate.value).subscribe(result=>{
              // check xem nếu result trả về là true thì thực hiện
              if(result){
                // hiện thị thông báo
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Xóa Thành Công',
                  showConfirmButton: false,
                  timer: 900
                });
                this.checkBoxAll = false;
                this.getDataFormService();
              }
            })
          }) 
        }
      })
    }else if(x > 0){
      Swal.fire({
        title: 'Bạn Có Chắc Chắn Muốn Xóa Những Dữ Liệu Này Không',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result)=>{
        if(result.isConfirmed){
          this.idArr.forEach(e => {
            this.departmentService.findById(e).subscribe(res=>{
              this.infoUpdate = new FormGroup({
                departmentCode: new FormControl(`${res.departmentCode}`),
                nameDepartment: new FormControl(`${res.nameDepartment}`),
                status: new FormControl('false'),
                id: new FormControl(`${res.id}`),
              });
              this.departmentService.removeToHistory(this.infoUpdate.value).subscribe(result=>{
                if(result){
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Xóa Thành Công',
                    showConfirmButton: false,
                    timer: 900
                  })
                  this.getDataFormService();
                }
              })
            })
          });
        }
      });
    }
  }




  
}
