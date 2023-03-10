import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const val = this.form.value;
    this.authService.login(val.email, val.password).subscribe(response => {
      const token = localStorage.getItem(this.authService.TOKEN_NAME);
      if (val.email && val.password && (token != 'null')) {
        this.router.navigate(['main']);
      } else {
        alert('Dang nhap that bai')
      }
    });


  }
}