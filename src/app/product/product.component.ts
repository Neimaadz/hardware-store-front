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
    this.productService.getProducts().subscribe(product => {
      this.allProducts = product;
    
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.type = params.get('type')!
        this.products = this.allProducts.filter(product => product.categorie === this.type);
      })
    })
    
  }

}
