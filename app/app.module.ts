//modules
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common'; 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { DataTableModule } from 'angular-4-data-table/src/index';
//import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoadingMessageService } from './loading-message.service';

//components
import { AppComponent } from './app.component';
import { UniverseGeneratorComponent } from './universe-generator/universe-generator.component';

//models
import { Tooltip } from './tooltip';
import { Universe } from './universe';
import { UniverseCard } from './universe-card';
import * as $ from 'jquery';
import * as bootstrap from "bootstrap";

//services
import { APIAccountsService } from './api-accounts.service';
import { WelcomeFormComponent } from './welcome-form/welcome-form.component';
import { APIClientAuthService } from './api-client-auth-service';
import { CardService } from './card.service';
import { SageUserService } from './sage-user.service';2
import { UniverseFetcherService } from './universe-generator/universe-fetcher.service';
import { StatusService } from "./status.service";

//routes
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewAccountFormComponent } from './new-account-form/new-account-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SageHomeComponent } from './sage-home/sage-home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountChangeFormComponent } from './account-settings/account-change-form/account-change-form.component';
import { DeleteAccountFormComponent } from './delete-account-form/delete-account-form.component';
import { SageCreationComponent } from './sage-creation/sage-creation.component';
import { ViewSageProfileComponent } from './view-sage-profile/view-sage-profile.component';
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { Stage1FormComponent } from './universe-generator/stage-1-form/stage-1-form.component';
import { Stage2FormComponent } from './universe-generator/stage-1-form/stage-2-form/stage-2-form.component';
import { Stage3FormComponent } from './universe-generator/stage-1-form/stage-2-form/stage-3-form/stage-3-form.component';
import { Stage4FormComponent } from './universe-generator/stage-1-form/stage-2-form/stage-3-form/stage-4-form/stage-4-form.component';
import { RenderUniverseComponent } from './universe-generator/stage-1-form/stage-2-form/stage-3-form/stage-4-form/render-universe/render-universe.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { BottomBannerComponent } from './bottom-banner/bottom-banner.component';
import { AboutSomvComponent } from './about-somv/about-somv.component';
import { UpdateLogComponent } from './update-log/update-log.component';
import { PvpDuelComponent } from './pvp-duel/pvp-duel.component';
import { BuyEnergyComponent } from './buy-energy/buy-energy.component';


const appRoutes: Routes = [
/*Note: Routes have to go 'in order', if you put '**' above all others it'll resolve to '**' first and show not found component.**/
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },//notice there is a leading slash in the redirect
    { path: 'welcome', component: WelcomeFormComponent },//no leading slashes in the path
    { path: 'new-account', component: NewAccountFormComponent },//no leading slashes in the path
    { path: 'login', component: LoginFormComponent },//no leading slashes in the path
    { path: 'sagehome/:id', component: SageHomeComponent },
    { path: 'sagehome/:id/settings', component: AccountSettingsComponent },
    { path: 'sagehome/:id/delete', component: DeleteAccountFormComponent },
    { path: 'sagehome/:id/sage-creation', component: SageCreationComponent },
    { path: 'sagehome/:id/sage-profile', component: ViewSageProfileComponent },
    { path: 'sagehome/:id/universe-generator', component: UniverseGeneratorComponent },
    { path: 'sagehome/:id/card-collection', component: CardCollectionComponent },
    { path: 'sagehome/:id/about', component: AboutSomvComponent },
    { path: 'sagehome/:id/log', component: UpdateLogComponent },
    { path: 'sagehome/:id/duel', component: PvpDuelComponent },
    { path: 'sagehome/:id/purchase', component: BuyEnergyComponent },
    { path: '**', component: PageNotFoundComponent },//wildcard path where all other URLS map to this component
    

];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeFormComponent,
    PageNotFoundComponent,
    NewAccountFormComponent,
    LoginFormComponent,
    SageHomeComponent,
    AccountSettingsComponent,
    AccountChangeFormComponent,
    DeleteAccountFormComponent,
    SageCreationComponent,
    ViewSageProfileComponent,
    CardCollectionComponent,
    UniverseGeneratorComponent,
    Stage1FormComponent,
    Stage2FormComponent,
    Stage3FormComponent,
    Stage4FormComponent,
    RenderUniverseComponent,
    TopBannerComponent,
    BottomBannerComponent,
    AboutSomvComponent,
    UpdateLogComponent,
    PvpDuelComponent,
    BuyEnergyComponent,

  ],
  imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      Ng4LoadingSpinnerModule.forRoot(),
      LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.pulse,
          backdropBackgroundColour: 'rgba(0,0,0,0.9)',
          backdropBorderRadius: '4px',
          primaryColour: '#ffffff',
          secondaryColour: '#ffffff',
          tertiaryColour: '#ffffff'
      }),
      AlertModule.forRoot(),
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    ),
      AngularFontAwesomeModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),

  ],
  providers: [APIAccountsService, APIClientAuthService, SageUserService, Tooltip, CardService, Universe, UniverseCard, StatusService, LoadingMessageService,
      { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
