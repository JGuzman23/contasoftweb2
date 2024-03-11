import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../../contasoft/interfaces/user.interface';
import { UserService } from 'src/app/demo/service/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DialogModule,DropdownModule,ButtonModule,InputTextModule,InputMaskModule,FormsModule,CommonModule],
  templateUrl: './user.component.html'
})
export class UserComponent {
  showUserconf: boolean = false;

  public user: User;
  public users: User[] = [];

  /**
   *
   */
  constructor(private userService: UserService) {}

  async ngOnInit() {
      this.userService.getMyUser(1).subscribe(
          (response) => {
              this.user = response.data;
              console.log(response.data);
          },
          (error) => {}
      );

      
  }
  showDialoguserconf() {
    this.showUserconf = true;
}
}
