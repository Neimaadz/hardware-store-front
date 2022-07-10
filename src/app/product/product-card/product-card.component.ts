import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Product, User } from 'src/app/models';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { ProductService } from '../product.service';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  currentUser: User | null;
  apiImageURL = environment.apiImageURL;
  timeStamp: number;

  @Input() products: any;
  @Input() product!: Product;
  @Output() productDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar) {

      this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
        this.currentUser = this.authenticationService.currentUserValue
      });

  }

  ngOnInit(): void {
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '800px',
      data: this.product,
    });

    dialogRef.afterClosed().subscribe(result => {
      // When product has updated
      this.product.image = result.image;
    });
  }


  deleteProduct(){
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    // Confirmation dialog
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.productService.deleteProduct(this.product.id)
        .subscribe({
            next: () => {
                this.productDeletedEvent.emit(this.product.id);
                this._snackBar.open("Successfully Deleted", "close", {duration: 3000, panelClass: ['success-snackbar']});
            },
            // error: (error) => {
            //     this.error = error;
            // }
        });
      }
    });
    
  }

  getImageFromAPI() {
    return this.apiImageURL + '/' + this.product.image;
  }


}
