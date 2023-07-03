import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from './../../../core/common/base-component';
import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent implements OnInit,AfterViewInit {

  public user: any;
  public role:any;
  constructor(injector:Injector,private authenticationService: AuthenticationService) {
    super(injector);
   }

  ngOnInit() {
    this.user = this.authenticationService.userValue;
   
    this.role=this.getRole(this.user.roles)
    console.log(this.role);


    this.loadScripts('assets/plugins/common/common.min.js', 'assets/js/custom.min.js', 'assets/js/settings.js'
    , 'assets/js/gleek.js', 'assets/js/styleSwitcher.js', 'assets/plugins/chart.js/Chart.bundle.min.js'
    , 'assets/plugins/circle-progress/circle-progress.min.js', 'assets/plugins/d3v3/index.js', 'assets/plugins/topojson/topojson.min.js'
    , 'assets/plugins/datamaps/datamaps.world.min.js', 'assets/plugins/raphael/raphael.min.js', 'assets/plugins/morris/morris.min.js'
    , 'assets/plugins/moment/moment.min.js', 'assets/plugins/pg-calendar/js/pignose.calendar.min.js'
    , 'assets/plugins/chartist/js/chartist.min.js', 'assets/plugins/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js'
    ,'assets/js/dashboard/dashboard-1.js');
  }

  public getRole(roles: string[]): string {
    let role = '';
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'Admin') {
        role = 'Admin';
        break;
      } else {
        role = roles[i];
      }
    }
    return role;
  }

  ngAfterViewInit() {
   
  }
  Logout() {
    this.authenticationService.logout();
  }

}
