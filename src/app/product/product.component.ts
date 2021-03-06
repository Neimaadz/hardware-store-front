import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../models';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  type: any;
  allProducts: Product[];
  products: Product[];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
    
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.type = params.get('type')!
        this.products = this.allProducts.filter(product => product.type === this.type);
      })
    })
    
  }


  deleteProduct(id: number) {
    this.products = this.products.filter( product => product.id !== id);
    this.allProducts = this.allProducts.filter( product => product.id !== id);
  }

}
