import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from './../../../core/common/base-component';
import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,private authenticationService: AuthenticationService) {
    super(injector);
  }
  public user: any;
  public role:any;
  public id_nguoidung:any;
  public nguoidung:any;
  public anhdaidien:any;

  ngOnInit() {
    this.user = this.authenticationService.userValue;
    this.id_nguoidung=this.user.idNguoiDung
    console.log(this.user)

    this._api.get('/api/admin/get-by-id-nguoidung/' + this.id_nguoidung).subscribe(res => {
      this.nguoidung = res;
      this.anhdaidien=this.nguoidung.anhDaiDien;
    })




    this.role=this.getRole(this.user.roles)
    this.loadScripts('assets/plugins/common/common.min.js', 'assets/js/custom.min.js', 'assets/js/settings.js'
    , 'assets/js/gleek.js', 'assets/js/styleSwitcher.js', 'assets/plugins/chart.js/Chart.bundle.min.js'
    , 'assets/plugins/circle-progress/circle-progress.min.js', 'assets/plugins/d3v3/index.js', 'assets/plugins/topojson/topojson.min.js'
    , './assets/plugins/datamaps/datamaps.world.min.js', 'assets/plugins/raphael/raphael.min.js', 'assets/plugins/morris/morris.min.js'
    , 'assets/plugins/moment/moment.min.js', 'assets/plugins/pg-calendar/js/pignose.calendar.min.js'
    , 'assets/plugins/chartist/js/chartist.min.js', 'assets/plugins/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js'
    ,'assets/js/dashboard/dashboard-1.js');
  }
  logout() {
    this.authenticationService.logout();
  }

  isDropdownVisible = false;

  abc(){
    this.isDropdownVisible = !this.isDropdownVisible;
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

  ngAfterViewInit():void {
//     $('#dropdownToggle').click(() => {
//       $('.drop-down').toggleClass('show');
//       const isExpanded = $('.drop-down').hasClass('show');
// $('#dropdownToggle').attr('aria-expanded', isExpanded.toString()); // hoặc '#dropdownToggle'.attr('aria-expanded', '' + isExpanded);

//     });
  }

  

}
