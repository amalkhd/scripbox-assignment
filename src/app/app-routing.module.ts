import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChallengeComponent } from './dashboard/challenge/challenge.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth-guard';


const routes: Routes = [
  {
    path: "",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path: "login",
    canActivate: [NoAuthGuard],
    component: LoginComponent
  },
  {
    path: "dashboard",
    canActivate:[AuthGuard],
    component: DashboardComponent,
    children: [{
      path: "",
      redirectTo: "challenge",
      pathMatch: "full"
    },
    {
      path: "challenge",
      component: ChallengeComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
