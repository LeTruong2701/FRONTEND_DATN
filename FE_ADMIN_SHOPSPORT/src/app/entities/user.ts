import { Role } from "./role";

export class User {
    idNguoiDung!: number;
    taiKhoan!: string;
    matKhau!: string;
    hoTen!: string;
    diaChi!: string;
    dienThoai!: string;
    email!: string;
    roles!: any;
    token?: string;
}