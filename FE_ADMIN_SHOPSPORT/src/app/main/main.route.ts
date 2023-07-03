import { NhapSanPhamModule } from './nhapsanpham/nhapsanpham.module';
import { NhapsanphamComponent } from './nhapsanpham/nhapsanpham.component';
import { KhoComponent } from './kho/kho.component';
import { HoadonxuatComponent } from './hoadonxuat/hoadonxuat.component';
import { NewsComponent } from './news/news.component';
import { DonhangComponent } from './donhang/donhang.component';
import { GiasanphamComponent } from './giasanpham/giasanpham.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { NotHaveAccessComponent } from './../shared/components/not-have-access/not-have-access.component';
import { UserManagementModule } from './user-management/user-management.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { BanhangComponent } from './banhang/banhang.component';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { NhasanxuatComponent } from './nhasanxuat/nhasanxuat.component';
import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../core/guard/role.guard';
import { Role } from '../entities/role';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { HoadonnhapComponent } from './hoadonnhap/hoadonnhap.component';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { ThuonghieuComponent } from './thuonghieu/thuonghieu.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ProfileComponent } from './profile/profile.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { AuthGuard } from '../core/guard/auth.guard';
// import { RoleGuard } from '../core/guards/role.guard';
// import { Role } from '../entities/role';
// import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
// import { UnauthorizedComponent } from '../shared/components/unauthorized/unauthorized.component';
export const MainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'nothaveaccess', component: NotHaveAccessComponent },
     
      {
        path: 'nhasanxuat',
        component: NhasanxuatComponent,loadChildren: () => import('./nhasanxuat/nhasanxuat.module').then(m => m.NhaSanXuatModule)
      },
      // { path: 'nhasanxuat', loadChildren: () => import('./nhasanxuat/nhasanxuat.module').then(m => m.NhaSanXuatModule)},

      {
        path: 'sanpham',
        component: SanphamComponent,loadChildren: () => import('./sanpham/sanpham.module').then(m => m.SanPhamModule)
      },
      {
        path: 'danhmuc',
        component: DanhmucComponent,loadChildren: () => import('./danhmuc/danhmuc.module').then(m => m.DanhMucModule)
      },

      {
        path: 'nhacungcap',
        component: NhacungcapComponent,loadChildren: () => import('./nhacungcap/nhacungcap.module').then(m => m.NhaCungCapModule)
      },
      {
        path: 'banhang',
        component: BanhangComponent,loadChildren: () => import('./banhang/banhang.module').then(m => m.BanHangModule)
      },

      {
        path: 'donhang',
        component: DonhangComponent,loadChildren: () => import('./donhang/donhang.module').then(m => m.DonHangModule)
      },
      {
        path: 'kho',
        component: KhoComponent,loadChildren: () => import('./kho/kho.module').then(m => m.KhoModule)
      },
      {
        path: 'hoadonxuat',
        component: HoadonxuatComponent,loadChildren: () => import('./hoadonxuat/hoadonxuat.module').then(m => m.HoaDonXuatModule)
      },
      {
        path: 'hoadonnhap',
        component: HoadonnhapComponent,loadChildren: () => import('./hoadonnhap/hoadonnhap.module').then(m => m.HoaDonNhapModule)
      },
      {
        path: 'giasanpham',
        component: GiasanphamComponent,loadChildren: () => import('./giasanpham/giasanpham.module').then(m => m.GiaSanPhamModule)
      },
      {
        path: 'khuyenmai',
        component: KhuyenmaiComponent,loadChildren: () => import('./khuyenmai/khuyenmai.module').then(m => m.KhuyenMaiModule)
      },
      {
        path: 'news',
        component: NewsComponent,loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'nhanvien',
        component: NhanvienComponent,loadChildren: () => import('./nhanvien/nhanvien.module').then(m => m.NhanVienModule)
      },
      {
        path: 'thuonghieu',
        component: ThuonghieuComponent,loadChildren: () => import('./thuonghieu/thuonghieu.module').then(m => m.ThuongHieuModule)
      },

      { path: 'nhapsanpham/:id', 
      component: NhapsanphamComponent,loadChildren:() => import('./nhapsanpham/nhapsanpham.module').then(m => m.NhapSanPhamModule) 
      },
      { path: 'profile', 
      component: ProfileComponent,loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      { path: 'dashboard', 
      component: DashboardComponent,loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
      },
      { path: 'khachhang', 
      component: KhachhangComponent,loadChildren:() => import('./khachhang/khachhang.module').then(m => m.KhachHangModule)
      
      },

      {
        path: 'user-management',
        component: UserManagementComponent,loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [RoleGuard],
        data: { role: [Role.Admin] },
      },
     
      {
        path: 'role-management',
        component: RoleManagementComponent,loadChildren: () => import('./role-management/role-management.module').then(m => m.RoleManagementModule),
        canActivate: [RoleGuard],
        data: { role: [Role.Admin] },
      },
    
    ]
  }
];
