import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models';
import { ProductService } from '../product.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() products: any;
  @Input() product!: Product;
  @Input() index: any;
  @Output() productDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      data: this.product,
    });
  }


  deleteProduct(){
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
}
