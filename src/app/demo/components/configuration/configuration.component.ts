import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
 
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
