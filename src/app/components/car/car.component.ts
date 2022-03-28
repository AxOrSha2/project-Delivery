import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  totalProducts: number = 0;
  shoppingCartList: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getTotalShoppingCart()
  }

  getTotalShoppingCart() {
    this.shoppingCartList = JSON.parse(localStorage.getItem("shoppingCartItems") || '[]');
    console.log(this.shoppingCartList.length);
    this.totalProducts = this.shoppingCartList.length;
  }

}
