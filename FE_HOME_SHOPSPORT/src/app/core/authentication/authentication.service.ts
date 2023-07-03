import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";

import { environment } from "src/environments/environment";
import { User } from "../entities/user";


@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    private userSubject: BehaviorSubject<any>;
    public user: Observable<User>;

    constructor(private router: Router,private http: HttpClient) 
    {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value && this.userSubject.value.userName ? this.userSubject.value: null;
       
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.BASE_API}/Authentication/Login`, { username, password })
            .pipe(map(user => {
                if (user.roles[0] !== 'Customer'||user.trangThai==0) {
                    throw new Error('Invalid user role');
                  }
                sessionStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    // logout() {
    //     sessionStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.router.navigate(['/']);
    // }
    logout() {
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']).then(() => {
            window.location.reload();
        });
    }
    

    remove() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
    }
}
