import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private api:ApiService) {}

  dataSource: any[];
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
