import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private router:Router) { }

    setAuthToken(token) {
        localStorage.setItem("authToken", token);
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl("login");
    }
}