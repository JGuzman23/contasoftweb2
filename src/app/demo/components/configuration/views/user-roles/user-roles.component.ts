import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../contasoft/interfaces/user.interface';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [DialogModule,DropdownModule,ButtonModule],
  templateUrl: './user-roles.component.html',
})
export class UserRolesComponent {

  showAdminUsersconf: boolean = false;

  public users: User[] = [];

  /**
   *
   */
  constructor(private userService: UserService) {}

  async ngOnInit() {
    
      this.userService.getUserByCompany(1,3).subscribe(
          (response) => {
              this.users = response.data;
              
          },
          (error) => {}
      );
  }

  showDialogAdminUsersconf() {
    this.showAdminUsersconf = true;
}
}
