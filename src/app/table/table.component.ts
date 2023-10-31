

import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';




export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
 @Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ["productName",
  "category", "quant",
  "freshness",
  "price",
  "date", "action"];


  dataSource1: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input("dataSource") 
  set _dataSource(data: any){

    if(data!==undefined){
      this.dataSource1=new MatTableDataSource(data);
      
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;

    }
    else
    {
       this.dataSource1=[];
    }
   console.log(data,"Hello");

  };



  //dataSource: MatTableDataSource<UserData>;
  // dialog: any;



  constructor(private dialog: MatDialog, private api:ApiService) {

   
  
    
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    
    // Assign the data to the data source for the table to render
    //this.dataSource1 = new MatTableDataSource(users);
    //console.log(this.dataSource1);

  

  }

   
  /*

  constructor() {
    // Create 100 users
    
  }


  */
 
   ngOnInit(): void {

    console.log(this.dataSource1);
     //throw new Error('Method not implemented.');
   }

   
   
   
   editProduct(row : any){


    this.dialog.open(DialogComponent,{
    width: '60%',
    data:row

    }).afterClosed().subscribe(value=>{
      if(value=='update')
      {
        
        this.api.getProduct()
      .subscribe({
        next:(res)=>{
          console.log(res);
          
          this.dataSource1 = res;
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort
          
        },
        error:(err)=>{
        alert("Erro while fetching the Records!!")
      }
      })


      }
    })

    
  }

   

   editProductHandler(cardData: any): void{
            
     


   }

   



   deleteProduct(id: number){
       
    

    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted Successfully");
       
        

        this.api.getProduct()
      .subscribe({
        next:(res)=>{
          console.log(res);
          
          this.dataSource1 = res;
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort
          
        },
        error:(err)=>{
        alert("Erro while fetching the Records!!")
      }
      })

        


        
      },
      error:()=>{
        alert("Error while deleting the record!!")
      }
    })

  }

  ngAfterViewInit() {


    //console.log(this.dataSource1,"Hello World");
    //this.dataSource1 = new MatTableDataSource(this.dataSource1);
    //this.dataSource1.paginator = this.paginator;
    //this.dataSource1.sort = this.sort;
  }

  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  */

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

