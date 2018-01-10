import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

  private messageSource = new BehaviorSubject<string>("Not Logged In");
  currentStatus = this.messageSource.asObservable();


  constructor() { }

  changeStatus(statusValue: string) {
      this.messageSource.next(statusValue);
      
  }

}
