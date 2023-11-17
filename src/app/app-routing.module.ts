import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUiComponent } from './components/chat-ui/chat-ui.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'chat', component: ChatUiComponent }, // Route for the home page

  { path: 'login', component: LoginComponent } // Route for the about page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
