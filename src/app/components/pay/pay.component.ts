import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  shoppingCartList: any = [];
  totalShopping: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.shoppingCartList = JSON.parse(localStorage.getItem("shoppingCartItems") || '[]');
    this.calculateTotal()
  }

  calculateTotal() {
    this.shoppingCartList.forEach((element: { price: number; }) => {
      this.totalShopping += element.price;
    });
  }

  cleanShoppingCart() {
    Swal.fire({
      title: '¿Seguro de eliminar el carrito?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Carrito eliminado, será redirigido al inicio'
        })
        localStorage.removeItem("shoppingCartItems");
        this.router.navigate(['/']);
      }
    })
  }

}
