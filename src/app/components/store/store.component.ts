import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  productList: Product[] = [];
  shoppingCartList: any = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._productService.getProducts().subscribe(data =>{
      this.productList = data;
    },error=>{
      console.log(error);
    })
  }

  addToShoppingCart(idProduct: string, name: string, price: number, unitsAvailable: number) {
    var eachProduct = {
      idProduct: idProduct,
      name: name,
      price: price,
      unitsAvailable: unitsAvailable
    }

    this.shoppingCartList.push(eachProduct)
    localStorage.setItem('shoppingCartItems',JSON.stringify(this.shoppingCartList));

  }

}
