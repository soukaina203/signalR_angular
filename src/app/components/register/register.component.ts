import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  AuthService = inject(AuthService);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.minLength(4)],
    });
  }
  handleSubmit = () => {
    const User = this.formGroup.value;
    this.AuthService.signUp(User).subscribe((d) => {

    });
  };
}
