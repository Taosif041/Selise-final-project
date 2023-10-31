import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {



  productForm!: FormGroup;

  actionBtn: string = "Save"


  constructor(private formBuilder : FormBuilder,
     private api : ApiService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
      private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
     this.productForm = this.formBuilder.group({
     productName: ['',Validators.required],
     category: ['',Validators.required],
     freshness: ['',Validators.required],
     price: ['',Validators.required],
     date: ['',Validators.required],
     quant: ['',Validators.required],
     ident: [0],

     });

    
    if(this.editData)
    {
      this.actionBtn = "Upadate";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['quant'].setValue(this.editData.quant);
      this.productForm.controls['ident'].setValue(this.editData.ident);

    }

  }

  addProduct()
  {
     if(!this.editData){

      if(this.productForm.valid)
      {
        //this.productForm.value.ident=0;
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Porduct added successfully!");
            this.productForm.reset();
            this.dialogRef.close("save");
          },
          error:()=>{
            alert("Error while adding the product!");
          }
        })
         
      }
     }else{
      this.updateProduct()
     }

  }
  updateProduct(){
        this.api.putProduct(this.productForm.value,this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("product updated Successfully");
            this.productForm.reset();
            this.dialogRef.close("update");
          },
          error:()=>{
            alert("Error while updating the record!");
          }
        })
  }

}
