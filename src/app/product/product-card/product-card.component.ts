import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Product, User } from 'src/app/models';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { ProductService } from '../product.service';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output() productDeletedEvent: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('paginator') paginator: MatPaginator;

  currentUser: User | null;
  apiImageURL = environment.apiProductImageURL;
  timeStamp: number;

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router) {

      this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
        this.currentUser = this.authenticationService.currentUserValue
      });

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // reset paginator if router params has changed
    this.router.events.subscribe((val) => {
      this.paginator.firstPage();
    });
  }
  
  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '800px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      // When product has updated
      product.image = result.image;
    });
  }


  deleteProduct(product: Product){
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    // Confirmation dialog
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.productService.deleteProduct(product.id)
        .subscribe({
            next: () => {
                this.productDeletedEvent.emit(product.id);
                this._snackBar.open("Successfully Deleted", "close", {duration: 3000, panelClass: ['success-snackbar']});
            },
            // error: (error) => {
            //     this.error = error;
            // }
        });
      }
    });
    
  }

  getImageFromAPI(product: Product) {
    return this.apiImageURL + '/' + product.image;
  }


}
