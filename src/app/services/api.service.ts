import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postProduct(data : any)
  {
    return this.http.post<any>("https://ecommerceta.herokuapp.com/create-product/",data);
  }

  getProduct(){
    return this.http.get<any>("https://ecommerceta.herokuapp.com/get-product/");
  }

  putProduct(data:any,id : number)
  {
    return this.http.put<any>("https://ecommerceta.herokuapp.com/edit-product/"+id,data);
  }

  deleteProduct(id : number)
  {
    return this.http.delete<any>("https://ecommerceta.herokuapp.com/delete-product/"+id);
  }


}
