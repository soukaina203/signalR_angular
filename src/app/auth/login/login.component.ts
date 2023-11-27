import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  AuthService = inject(AuthService);
  router=inject(Router)

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.minLength(4)],
    });
  }
  handleSubmit = () => {
    const User = this.formGroup.value;
    this.AuthService.login(User).subscribe((res) => {
        console.log(res)
      if(res.token){
        localStorage.setItem('token', res.token);
        const userData = JSON.stringify(res.user);
        const userId= JSON.stringify(res.user.id);
        localStorage.setItem('userId', userId);
        localStorage.setItem('user', userData);
        this.router.navigate(['/chat']);


      }


    });
  };
}
