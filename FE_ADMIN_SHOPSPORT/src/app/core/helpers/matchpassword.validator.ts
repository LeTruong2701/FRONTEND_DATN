import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {



    let oldPassword = control.get('txt_matkhaucu');
    let newPassword = control.get('txt_matkhaumoi');
    let confirmPassword = control.get('txt_nhaplaimatkhaumoi');
    if (oldPassword && newPassword && oldPassword.value === newPassword.value) {
        return {
            passwordmatcherror1: true,
            message: 'Mật khẩu mới không được giống mật khẩu cũ'
        };
    }

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
        return {
            passwordmatcherror2: true,
            message: 'Mật khẩu xác nhận không khớp với mật khẩu mới'
        };
    }
    return null;
}