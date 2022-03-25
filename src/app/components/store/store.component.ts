import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  listaProductos: Producto[] = [];
  shoppingCartList: any = [];
  imgPath: string  = "";

  constructor(private _productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos() {
    this._productoService.obtenerProductos().subscribe(data =>{
      this.listaProductos = data;
    },error=>{
      console.log(error);
    })
  }

  addToShoppingCart(idProducto: string, nombre: string, precio: number, unidadesDisponibles: number) {
    var eachProduct = {
      idProducto: idProducto,
      nombre: nombre,
      precio: precio,
      unidadesDisponibles: unidadesDisponibles
    }

    this.shoppingCartList.push(eachProduct)
    localStorage.setItem('shoppingCartItems',JSON.stringify(this.shoppingCartList));

  }

}
