import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor() { }

    setAuthToken(token) {
        localStorage.setItem("authToken", token);
    }

    logout() {
        localStorage.clear();
        window.location.href = "login";
    }
}