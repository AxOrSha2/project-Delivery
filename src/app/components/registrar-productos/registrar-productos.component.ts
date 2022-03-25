import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registrar-productos',
  templateUrl: './registrar-productos.component.html',
  styleUrls: ['./registrar-productos.component.css']
})
export class RegistrarProductosComponent implements OnInit {

  productForm: FormGroup;
  form_title = 'Crear producto';
  id: String | null;
  only_numbers = /^([0-9])*$/;
  image: string = "";

  constructor(private fb: FormBuilder, private _productoService: ProductoService, private router: Router, private idProductPath: ActivatedRoute) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      proveedor: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(this.only_numbers)]],
      unidadesDisponibles: ['', [Validators.required, Validators.pattern(this.only_numbers)]]
    });
    this.id = this.idProductPath.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProductInfo()
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
    const product_form: Producto = {
      nombre: this.productForm.get('nombre')?.value,
      img: this.image,
      descripcion: this.productForm.get('descripcion')?.value,
      proveedor: this.productForm.get('proveedor')?.value,
      precio: this.productForm.get('precio')?.value,
      unidadesDisponibles: this.productForm.get('unidadesDisponibles')?.value
    }

    if (this.id === null) {
      //When the product is created
      this._productoService.agregarProducto(product_form).subscribe(data=>{
        this.router.navigate(['/']);
      },error=>{
        console.log(error)
      })

    } else {
      //When the product is updated
      this._productoService.actualizarProducto(this.id,product_form).subscribe(data=>{
        this.router.navigate(['/']);
      },error=>{
        console.log(error)
      })
    }

  }

  getProductInfo() {
    if (this.id !== null) {
      this.form_title = 'Actualizar datos'
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.image = data.img
        this.productForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          proveedor: data.proveedor,
          precio: data.precio,
          unidadesDisponibles: data.unidadesDisponibles
        })
      }, error => {
        console.log(error);
      });
    }
  }

}
