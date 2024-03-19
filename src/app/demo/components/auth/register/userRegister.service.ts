import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../contasoft/interfaces/user.interface';
import { PaypalReturn } from './Interfaces/paypal.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  sendUserEvent: EventEmitter<any> = new EventEmitter<any>();
  sendPlanEvent: EventEmitter<any> = new EventEmitter<any>();
  sendPayEvent: EventEmitter<any> = new EventEmitter<any>();

  sendUser(user: User) {
    this.sendUserEvent.emit(user);
  }
  sendPlan(planId: number) {
    this.sendPlanEvent.emit(planId);
  }
  sendPayInformations(pay: PaypalReturn) {
    this.sendPayEvent.emit(pay);
  }
}
