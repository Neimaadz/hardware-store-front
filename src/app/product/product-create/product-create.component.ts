import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductType } from 'src/app/models';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  selectedValue: string;

  productTypes: ProductType[];

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) {

      this.productService.getProductTypes().subscribe(productTypes => {
        this.productTypes = productTypes;
      });
      
      this.form = this.formBuilder.group({
        name: '',
        fabricant: '',
        type: '',
        longueur: '',
        diametre:'',
        taille: '',
        composition:'',
        norme: ''
      });
    }

  ngOnInit(): void {
  }
  
  onSubmit(){
    const product = this.form.value;

    this.productService.createProduct(product).subscribe({
      next: () => {}
    });
  }

}