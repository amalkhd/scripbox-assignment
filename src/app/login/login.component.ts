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
  loading: boolean = false;
  account:any = false;
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
    if (!this.customerId) return;
    this.loading = true;
    this.api.getData(`api/customers/${this.customerId}`, {}).subscribe((res: any) => {
      this.auth.setAuthToken(res.data._id);
      this.loading = false;
      this.router.navigateByUrl('dashboard');
    }, err=>{
      this.loading = false;
    })
  }

  createCustomer() {
    if (this.form.invalid) return;
    this.loading = true;
    this.api.postData("api/customers", this.form.value).subscribe((res:any) => {
      this.loading = false;
      this.account = res;
    }, err => {
      this.loading = false;
    })
  }
}
