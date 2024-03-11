import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [DialogModule,DropdownModule,ButtonModule,InputTextModule,InputMaskModule,FormsModule,CommonModule],
  templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent {

  showChangePasswordconf: boolean = false;

  showDialogChangePasswordconf() {
    this.showChangePasswordconf = true;
}
}
