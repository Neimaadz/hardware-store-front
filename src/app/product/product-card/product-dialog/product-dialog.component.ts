import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  updateProduct(product: Product): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });
    
    dialogRef.afterClosed().subscribe(dialogResult => {

      if(dialogResult){
        this.productService.updateProduct(product.id, product)
        .subscribe({
          next: res => {
            this._snackBar.open("Successfully Updated", "close");}
        })
      }
    });
  }
}
