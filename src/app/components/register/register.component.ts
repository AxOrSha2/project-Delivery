import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
  ) {

    this.UserForm = this.fb.group({
      name: ['', Validators.required],
      cellphone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  singUp() {
    const user_form: User = {
      name: this.UserForm.get('name')?.value,
      cellphone: this.UserForm.get('cellphone')?.value,
      email: this.UserForm.get('email')?.value,
      password: this.UserForm.get('password')?.value
    }

    this._authService.singUp(user_form).subscribe(
        data => {
          console.log(data)
          localStorage.setItem('token', data.token)
          this.router.navigate(['/admin']);
      }, 
        error => {
          console.log(error);
      })
  }

}
