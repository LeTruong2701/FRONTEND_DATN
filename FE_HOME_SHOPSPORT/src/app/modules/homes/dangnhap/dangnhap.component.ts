import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {


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
      'txt_username': new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
      'txt_password': new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+|\\-=`{}\\[\\]:";\'<>?,./])(?!.*\\s).{8,}$')]),
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
          console.log(data.roles[0]);
          
            
            this.router.navigate([this.returnUrl]).then(() => {
              location.reload();
              
            }); 
            this.toast.success({detail:"Đăng nhập thành công",summary:"",duration:5000})
            localStorage.removeItem('cart')
             
        },
        (error) => {
          if (error && error.message === 'Invalid user role') {
            this.toast.error({detail:"Tài khoản không hợp lệ",summary:"Đăng nhập thất bại",duration:5000})
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
