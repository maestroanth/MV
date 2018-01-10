import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingMessageService {

    private messageSource = new BehaviorSubject<string>("Loading the Multiverse...");
    currentMessage = this.messageSource.asObservable();

    private cueSource = new BehaviorSubject<string>("Opening Modal Message...");
    currentCue = this.cueSource.asObservable();

    constructor() { }

    changeLoadingMessage (loadingMessage: string) {
        this.messageSource.next(loadingMessage);
    }

    cueModal(currentCue: string) {
        this.cueSource.next(currentCue);
    }
}
