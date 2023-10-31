import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  @Input() product: any


  constructor(private api:ApiService){}


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    


  }



  cnt = 0


  increment(){

    if(this.cnt<this.product.quant)
    this.cnt+=1;

  }

  decrement()
  {
    if(this.cnt>0)
    this.cnt-=1;
  }


  


  addCart()
  {

      
      
      this.product.ident+=this.cnt;
      this.product.quant-=this.cnt;
      this.api.putProduct(this.product,this.product._id)
      .subscribe({
        next:(res)=>{
          alert(this.cnt+" Product successfully added to Chart");
        
        },
        error:()=>{
          alert("Error while updating the record!");
        }
      })






  }



  
      

  


  }



