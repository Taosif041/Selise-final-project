import { Component, OnInit } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';


import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { bindCallback } from 'rxjs';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  dataSource:MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api:ApiService) {}
  ngOnInit(): void {
    
    this.getAllProducts();

  }

  openDialog() {

    
    this.dialog.open(DialogComponent, {
       width: "100%"
    }).afterClosed().subscribe((value)=>{

     if(value === "save")
     {
        this.getAllProducts();
     }

      //this.ngOnInit();

    });


    
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



 
