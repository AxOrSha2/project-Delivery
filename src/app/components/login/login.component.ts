import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
  ) {
    
    this.UserForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  singIn(): void {
    const user_form: User = {
      email: this.UserForm.get('email')?.value,
      password: this.UserForm.get('password')?.value
    }

    this._authService.singIn(user_form)
      .subscribe(
        data => {
          localStorage.setItem('token',data.token);
          this.router.navigate(['/admin']);
      }, 
        error => {
          console.log(error);
      })
  }

}
