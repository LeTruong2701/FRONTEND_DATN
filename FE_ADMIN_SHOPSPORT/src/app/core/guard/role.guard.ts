import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {       
        
     }

    canActivate(route: ActivatedRouteSnapshot) {
        const user = this.authenticationService.userValue;
        console.log(route.data['role']);
        console.log(user.roles);

        // if (route.data['role'] && route.data['role'].indexOf(user.roles) === -1) {
        //     this.router.navigate(['/nothaveaccess']);
        //     return false;
        // }
        if (route.data['role'] && !user.roles.some((role: string) => route.data['role'].includes(role))) {
            this.router.navigate(['/nothaveaccess']);
            return false;
        }
        return true;
    }
}