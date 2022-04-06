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
  messageText: string = "";
  phoneUser: string = "";
  urlWhastapp: string = "https://wa.me";
  url: string = "";

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

  sendMessageWhatsapp() {
    //Vanilla message
    this.messageText = "*¡Hola, vengo de Trueki!*\n\nEsta es la lista de compras:\n";

    //Create a message foreach product
    this.shoppingCartList.forEach((element: { name: string; price: number;}) => {
      this.messageText += `\n - ${element.name} x 1 : COP ${element.price}`;
    });

    //Add the total
    this.messageText += `\n\n*El Valor de la compra es de: COP* ${this.totalShopping}`;
    this.phoneUser = "+573045811471";

    //Encode the message to URI
    let messageEncode = encodeURIComponent(this.messageText);

    //Final URL
    this.url = `${this.urlWhastapp}/${this.phoneUser}?text=${messageEncode}`;
  }

}
