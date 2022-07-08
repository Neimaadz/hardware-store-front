import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Product, User } from 'src/app/models';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { ProductService } from '../product.service';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  currentUser: User | null;

  @Input() products: any;
  @Input() product!: Product;
  @Output() productDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService) {

      this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
        this.currentUser = this.authenticationService.currentUserValue
      });

  }

  ngOnInit(): void {
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '600px',
      data: this.product,
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
            },
            // error: (error) => {
            //     this.error = error;
            // }
        });
        // this.posts.splice(this.index, 1);
      }
    });
    
  }







}
