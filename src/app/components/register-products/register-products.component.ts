import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  productForm: FormGroup;
  form_title = 'Crear producto';
  id: String | null;
  only_numbers = /^([0-9])*$/;
  image: string = "";

  constructor(private fb: FormBuilder, private _productoService: ProductService, private router: Router, private idProductPath: ActivatedRoute) { 

    this.productForm = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      supplier:['',Validators.required],
      price:['',[Validators.required, Validators.pattern(this.only_numbers)]],
      unitsAvailable:['',[Validators.required, Validators.pattern(this.only_numbers)]]
    });

    this.id = this.idProductPath.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
  }

  getFile(event: any) {
    const file = event.target.files[0];
    this.convertToBase64(file)
  }

  convertToBase64(file: any) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((result) => {
      this.image = result
    });
  }

  readFile(file: any, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };

  }

  productInfo() {
    const product_form: Product = {
      name: this.productForm.get('name')?.value,
      img: this.image,
      description: this.productForm.get('description')?.value,
      supplier: this.productForm.get('supplier')?.value,
      price: this.productForm.get('price')?.value,
      unitsAvailable: this.productForm.get('unitsAvailable')?.value
    }

    if (this.id === null) {
      //When the product is created
      this._productoService.createProduct(product_form).subscribe(data=>{
        this.router.navigate(['/']);
        Swal.fire({
          icon: 'success',
          title: 'Dato guardado',
          text: 'El producto se ha creado correctamente'
        })
      },error=>{
        console.log(error)
      })

    } else {
      //When the product is updated
      this._productoService.updateProduct(this.id,product_form).subscribe(data=>{
        // this.router.navigate(['/']);
      },error=>{
        console.log(error)
      })
    }

  }

  getProductInfo() {
    if (this.id !== null) {
      this.form_title = 'Actualizar datos'
      this._productoService.findProduct(this.id).subscribe(data => {
        this.image = data.img
        this.productForm.setValue({
          name: data.name,
          description: data.description,
          supplier: data.supplier,
          price: data.price,
          unitsAvailable: data.unitsAvailable
        })
      }, error => {
        console.log(error);
      });
    }
  }

}
