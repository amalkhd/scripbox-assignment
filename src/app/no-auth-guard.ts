import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const auth = window.localStorage.getItem("authToken");
    if (auth) {
      this.router.navigateByUrl("dashboard");
    }
    return true;
  }
}