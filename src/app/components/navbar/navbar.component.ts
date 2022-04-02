import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    Swal.fire({
      title: '¿Seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.logout();
        this.router.navigate(['/']);
      }
    })
    
  }

}
