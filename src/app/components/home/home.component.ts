import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  loadingData: boolean = true;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      if (data) {
        this.loadingData = false
        this.productList = data;
      }
    }, error => { 
      console.log(error)
    })
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: '¿Seguro de eliminar el producto?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(id).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado'
          })
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error'
          })
        })
      }
    })
  }

}
