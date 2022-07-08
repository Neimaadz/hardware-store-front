import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
      
      this.form = this.formBuilder.group({
        name: '',
        fabricant: '',
        categorie: '',
        longueur: '',
        diametre:'',
        taille: '',
        composition:'',
        norme: ''
      })
    }

  ngOnInit(): void {
  }
  
  onSubmit(){

  }

}
