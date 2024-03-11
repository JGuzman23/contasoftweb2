import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../contasoft/interfaces/user.interface';
import { response } from 'express';

@Component({
    selector: 'app-configuration',
    
    templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
    showPlanconf: boolean = false;
    showMenbershipconf: boolean = false;

  
 
    showDialogPlanconf() {
        this.showPlanconf = true;
    }
    showDialogMenbershipconf() {
        this.showMenbershipconf = true;
    }

    hideDialog() {
        this.showPlanconf = false;
        this.showMenbershipconf = false;
    }
}
