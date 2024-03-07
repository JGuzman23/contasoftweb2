import { Component } from '@angular/core';

@Component({
    selector: 'app-configuration',

    templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
    showUserconf: boolean = false;
    showChangePasswordconf: boolean = false;
    showAdminUsersconf: boolean = false;
    showPlanconf: boolean = false;
    showMenbershipconf: boolean = false;

    showDialoguserconf() {
        this.showUserconf = true;
    }
    showDialogChangePasswordconf() {
        this.showChangePasswordconf = true;
    }
    showDialogAdminUsersconf() {
        this.showAdminUsersconf = true;
    }
    showDialogPlanconf() {
        this.showPlanconf = true;
    }
    showDialogMenbershipconf() {
        this.showMenbershipconf = true;
    }

    hideDialog(){
      this.showUserconf = false;
      this.showChangePasswordconf = false;
      this.showAdminUsersconf = false;
      this.showPlanconf = false;
      this.showMenbershipconf = false;
    }
}
