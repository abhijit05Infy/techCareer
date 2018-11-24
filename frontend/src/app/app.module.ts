import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import {HttpModule}             from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule,ReactiveFormsModule}          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule}              from '@ng-bootstrap/ng-bootstrap';
import {Ng2PageScrollModule}    from 'ng2-page-scroll';
import { AppComponent }         from './app.component';
import { HomeComponent }        from './home/home.component';
import { PartnershipsComponent} from './partnerships/partnerships.component';
import {VeteransComponent}      from './veterans/veterans.component';
import {TechTrainingProgComponent}  from './techTrainingProg/techTrainingProg.component';
import {ContactUsComponent}         from './contactUs/contactus.component';
import {ApplyNowComponent}          from './applyNow/applynow.component';
import {PhoneMask}                  from './customDirectives/usphonemask.directive';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from 'angular2-toaster';
import { YoutubePlayerModule } from './videoplayer/ng2-youtube-player';
import {FooterComponent}  from './footer/footer.component';
import {SelectModule} from 'angular2-select';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'partnerships', component: PartnershipsComponent },
  { path: 'veterans', component: VeteransComponent },
  { path: 'techTrainingProg', component: TechTrainingProgComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule.forRoot({container:document.body}),
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    NgbModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    Ng2AutoCompleteModule,
    BrowserAnimationsModule,
    ToasterModule,
    YoutubePlayerModule,
    SelectModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PartnershipsComponent,
    VeteransComponent,
    TechTrainingProgComponent,
    ContactUsComponent,
    ApplyNowComponent,
    FooterComponent,
    PhoneMask
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ContactUsComponent,
    ApplyNowComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
