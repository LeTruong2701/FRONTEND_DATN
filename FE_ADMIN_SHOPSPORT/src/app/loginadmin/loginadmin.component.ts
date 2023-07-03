import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../core/common/base-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {


  public frmLogin!: FormGroup;
  public submitted = false;
  public loading = false;
  public returnUrl!: string;
  public error = '';



  constructor(private authenticationService: AuthenticationService,private router: Router, private route: ActivatedRoute,private toast:NgToastService) {
 
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }



  ngOnInit():void {
    this.frmLogin = new FormGroup({
      'txt_username': new FormControl('', [Validators.required]),
      'txt_password': new FormControl('', [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username() {
    return this.frmLogin.get('txt_username')!;
  }
  get password() {
    return this.frmLogin.get('txt_password')!;
  }

  public Login(vl: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.frmLogin.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(vl.txt_username, vl.txt_password)
      .pipe(first()).subscribe(
        (data) => {
          this.toast.success({detail:"Đăng nhập thành công",summary:"",duration:5000})
            
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          if (error && error.message === 'Invalid user role') {
            this.toast.error({detail:"Tài khoản không có quyền truy cập",summary:"Đăng nhập thất bại",duration:5000})
            this.error = error;
          this.loading = false;
          } else {
            this.toast.error({detail:"Tài khoản hoặc mật khẩu không chính xác",summary:"",duration:5000})
            this.error = error;
          this.loading = false;
          } 
        }
      );


  }


  

}
