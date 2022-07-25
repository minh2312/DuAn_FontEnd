import { HttpClient,HttpEvent,HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

const urlApi = "http://localhost:9999/api/listEmployees/";
const urlApiUploadImage = "http://localhost:9999/api/listEmployees/postImage";
const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = '/api/listEmployees';
  private baseUrl1 = '/api/saveUserServer';
  host :string = "http://localhost:8080";
  listData : Employee[] = [];
  private dataForm : FormGroup;
  constructor(private http:HttpClient) { }


  getAll():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${urlApi}`);
  }


  upload(data:any):Observable<any>{
    return this.http.post<any>(urlApiUploadImage,data);
  }


  save(data:Employee):Observable<Employee>{
    return this.http.post<Employee>(urlApi,data);
  }

  private urlApiUploadImage = "http://localhost:9999/api/listEmployees/upload-file";
  uploadFile(file:File):Observable<HttpEvent<any>>{
    const formData : FormData = new FormData();
    formData.append('file',file);
    const req = new HttpRequest('POST',`${urlApiUploadImage}`,formData,{
      reportProgress: true,
      responseType:'json'
    });
    return this.http.request(req);
  }


  getFile():Observable<any>{
    return this.http.get('');
  }
  

  findById(id:any):Observable<Employee>{
    return this.http.get<Employee>(`${urlApi}${id}`);
  }

  update(data:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${urlApi}`,data);
  }

}
