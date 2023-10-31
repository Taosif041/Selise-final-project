import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {


  dataSource: any[];
  constructor(private api:ApiService) {}

  ngOnInit(): void {

    this.getAllProducts();
  }


  getAllProducts()
  {
      this.api.getProduct()
      .subscribe({
        next:(res)=>{
          console.log(res);
          
          this.dataSource = res;
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort
          
        },
        error:(err)=>{
        alert("Erro while fetching the Records!!")
      }
      })
  }



  

}
