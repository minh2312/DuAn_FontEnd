import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../model/department';
import { ListDepartmentComponent } from '../admin/pages/department/list-department/list-department.component';
const urlApi = "http://localhost:9999/api/ListDepartment"
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

// lấy Ra tất cả các items
  findAll():Observable<Department[]>{
    return this.http.get<Department[]>(urlApi);
  }

  // danh sách lịch sử
  history():Observable<Department[]>{
    return this.http.get<Department[]>(`${urlApi}/history`);
  }

  // tìm kiếm
  searchByName(name:any):Observable<Department[]>{
    return this.http.get<Department[]>(`${urlApi}/SearchByName=${name}`);
  }


  // sắp xếp desc
  orderByDESC(orderBy:any):Observable<Department[]>{
    return this.http.get<Department[]>(`${urlApi}/SortBy=${orderBy}`);
    // return this.http.get<Department[]>('http://localhost:9999/api/ListDepartment/SortBy='+orderBy);
  }


  // sắp xếp thê từ dưới lên
  orderByASC(orderBy:any):Observable<Department[]>{
    return this.http.get<Department[]>(`${urlApi}/SortByASC=${orderBy}`);
  }

  
  // chức năng thêm mới
  save(data:Department):Observable<Department>{
    return this.http.post<Department>('http://localhost:9999/api/ListDepartment',data);
  }


  // Cập nhập
  update(data:Department):Observable<Department>{
    return this.http.put<Department>(urlApi,data);
  }


  // chức năng xóa
  remove(id:any):Observable<Department>{
    return this.http.delete<Department>(`${urlApi}/${id}`);
  }


  // chức năng xóa all items
  removeAll(id:number[]):Observable<Department>{
    return this.http.delete<Department>(`${urlApi}/idDeps=${id}`);
  }

  // removeToHistory

  removeToHistory(data:Department):Observable<Department>{
      return this.http.put<Department>(`${urlApi}/deleteItemToHistory`,data);
  }


  // 
  updateStatus(data:Department):Observable<Department>{
    return this.http.put<Department>(urlApi,data);
  }

  // tìm kiếm theo id
  findById(id:any):Observable<Department>{
    return this.http.get<Department>(`${urlApi}/${id}`);
  }



}
