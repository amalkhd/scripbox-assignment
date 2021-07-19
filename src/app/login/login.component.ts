import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  customerId: string;
  isLogin: boolean = true;
  form: FormGroup;
  constructor(private _fb: FormBuilder, private api: ApiService, private auth: AuthService, private router: Router) {
    this.form = _fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      fullName: [
        "",
      ]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.getData(`api/customers/${this.customerId}`, {}).subscribe((res: any) => {
      this.auth.setAuthToken(res.data.customerId);
      this.router.navigateByUrl('dashboard');
    })
  }

  createCustomer() {
    if (this.form.invalid) return;
    this.api.postData("api/customers", this.form.value).subscribe(res => {
      this.isLogin = true;
    })
  }
}
