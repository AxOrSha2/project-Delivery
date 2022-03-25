import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  shoppingCartList: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    //
    this.shoppingCartList = JSON.parse(localStorage.getItem("shoppingCartItems") || '[]');
  }

}
