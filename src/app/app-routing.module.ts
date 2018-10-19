import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/guards/auth.guard'
const routes: Routes = [
  {
    path:"adminlogin",component:LoginComponent
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path:'',redirectTo:'/adminlogin',canActivate:[AuthGuard],pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
