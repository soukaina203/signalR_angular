import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  AuthService = inject(AuthService);
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.minLength(4)],
    });
  }
  handleSubmit = () => {
    const User = this.formGroup.value;
    this.AuthService.login(User).subscribe((d) => {
      console.log(d)
      localStorage.setItem('token', d.token);
      const userData = JSON.stringify(d.user); // Convert to JSON string
      const userId= JSON.stringify(d.user.id); // Convert to JSON string
      localStorage.setItem('userId', userId);
      localStorage.setItem('user', userData);

    });
  };
}
