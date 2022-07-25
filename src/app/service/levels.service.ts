import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Levels } from '../model/levels';

const urlApi = 'http://localhost:9999/api/ListLevels'
@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient) { }


  // getAll Data
  findAll():Observable<Levels[]>{
    return this.http.get<Levels[]>(`${urlApi}`)
  }


  // get by id
  getById(id:number):Observable<Levels>{
    return this.http.get<Levels>(`${urlApi}/${id}`);
  }

  // phân trang
  paginationLevels(limit:any,page:any):Observable<Levels[]>{
    return this.http.get<Levels[]>(`${urlApi}/limit=${limit}/page=${page}`);
  }

  // tìm kiếm
  search(name:string):Observable<Levels[]>{
    return this.http.get<Levels[]>(`${urlApi}/nameSearch=${name}`);
  }

  // thêm mới
  save(data:Levels):Observable<Levels>{
    return this.http.post<Levels>(`${urlApi}`,data);
  }


  // cập nhập
  update(data:Levels):Observable<Levels>{
    return this.http.put<Levels>(`${urlApi}`,data);
  }


  // sắp xếp
  sort(name:string):Observable<Levels[]>{
    return this.http.get<Levels[]>(`${urlApi}/SortBy=${name}`)
  }

  sortASC(name:string):Observable<Levels[]>{
    return this.http.get<Levels[]>(`${urlApi}/SortByASC=${name}`)
  }



  // xóa
  remove(id:number):Observable<Levels>{
    return this.http.delete<Levels>(`${urlApi}/${id}`)
  }

  removeAll(id:number[]):Observable<Levels>{
    return this.http.delete<Levels>(`${urlApi}/idlevel=${id}`);
  }


    // removeToHistory
    removeToHistory(data:Levels):Observable<Levels>{
      return this.http.put<Levels>(`${urlApi}/deleteItemToHistory`,data);
  }


    // danh sách lịch sử
    history():Observable<Levels[]>{
      return this.http.get<Levels[]>(`${urlApi}/history`);
    }

}
