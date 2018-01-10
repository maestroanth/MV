import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingMessageService } from './loading-message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Sage of the Multiverse: Universe Generator!';
    loadingMessage = "Loading the Multiverse...";
    constructor(private loadingMessageService: LoadingMessageService) {
        this.loadingMessageService.currentMessage.subscribe(loadingMessage => this.loadingMessage = loadingMessage);

    }

    template: string = `<img src="../assets/images/loading/SOMVLoading.gif" />`
    
}
