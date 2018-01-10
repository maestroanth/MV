import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccountSettingsService {

    constructor() { }

    private subForm = new Subject<any>();

    sendSubForm(subForm: Object) {
        //console.log('sendSage() ' + JSON.stringify(sage));
        this.subForm.next(subForm);
    }

    clearSubForm() {
        this.subForm.next();
    }

    getSubForm(): Observable<any> {
        //console.log('getSage() ' + JSON.stringify(this.sageSubject.asObservable));
        return this.subForm.asObservable();
    }
}
