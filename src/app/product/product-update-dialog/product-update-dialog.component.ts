import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update-dialog',
  templateUrl: './product-update-dialog.component.html',
  styleUrls: ['./product-update-dialog.component.scss']
})
export class ProductUpdateDialogComponent {
  form: FormGroup;
  image!: File;
  isImageSelected: boolean = false;
  apiImageURL = environment.apiProductImageURL;

  constructor(public dialogRef: MatDialogRef<ProductUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog, 
    private formBuilder: FormBuilder) {

      this.form = this.formBuilder.group({
        name: '',
        fabricant: '',
        type: data.type,
        longueur: '',
        diametre:'',
        taille: '',
        composition:'',
        norme: ''
      })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  updateProduct(id: any): void {
    const product = this.form.value;
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });
    
    // Confirmation dialog
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.productService.updateProduct(id, product, this.image)
          .subscribe({
            next: res => {
              this._snackBar.open("Successfully Updated", "close", {duration: 3000, panelClass: ['success-snackbar']});
              this.dialogRef.close(res);
            }
          })
      }
    });
  }
  
  uploadFile(file: File){
    this.image = file;
    this.isImageSelected = true;
  }

  getImageFromAPI() {
    return this.apiImageURL + '/' + this.data.image;
  }
  
}
