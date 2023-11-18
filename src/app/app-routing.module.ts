import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUiComponent } from './components/chat-ui/chat-ui.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChooseComponent } from './components/choose/choose.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent }, // Route for the home page
  { path: 'choose', component: ChooseComponent }, // Route for the home page
  { path: 'register', component: RegisterComponent }, // Route for the home page
  { path: 'chat', component: ChatUiComponent }, // Route for the home page
  { path: 'login', component: LoginComponent } // Route for the about page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
