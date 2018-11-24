import { Component,OnInit} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

import {ContactUsService} from './contactus.service';
import {PhoneMask} from '../customDirectives/usphonemask.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterContainerComponent,ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';


@Component({

    providers: [ContactUsService,ToasterService],
    templateUrl: './contactus.html'
})

export class ContactUsComponent extends DialogComponent<null, null> implements OnInit  {
  contactUsForm: FormGroup;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(private toasterService: ToasterService,private fb:FormBuilder ,dialogService: DialogService,private contactusService: ContactUsService) {
    super(dialogService);
    
  }
  public config1 : ToasterConfig = new ToasterConfig({
      positionClass: 'toast-center',
      mouseoverTimerStop: true

    });


  public states = [
  {id: "AL", value: "Alabama", label:"Alabama"},
  {id: "AK", value: "Alaska", label:"Alaska"},
  {id: "AZ", value: "Arizona" , label:"Arizona"},
  {id: "AR", value: "Arkansas" , label:"Arkansas"},
  {id: "CA", value: "California" , label:"California"},
  {id: "CO", value: "Colorado", label:"Colorado"},
  {id: "CT", value: "Connecticut", label:"Connecticut"},
  {id: "DE", value: "Delaware", label:"Delaware"},
  {id: "DC", value: "District Of Columbia", label:"District Of Columbia"},
  {id: "FL", value: "Florida", label:"Florida"},
  {id: "GA", value: "Georgia", label:"Georgia"},
  {id: "HI", value: "Hawaii", label:"Hawaii"},
  {id: "ID", value: "Idaho", label:"Idaho"},
  {id: "IL", value: "Illinois", label:"Illinois"},
  {id: "IN", value: "Indiana", label:"Indiana"},
  {id: "IA", value: "Iowa", label:"Iowa"},
  {id: "KS", value: "Kansas", label:"Kansas"},
  {id: "KY", value: "Kentucky", label:"Kentucky"},
  {id: "LA", value: "Louisiana", label:"Louisiana"},
  {id: "ME", value: "Maine", label:"Maine"},
  {id: "MD", value: "Maryland", label:"Maryland"},
  {id: "MA", value: "Massachusetts", label:"Massachusetts"},
  {id: "MI", value: "Michigan", label:"Michigan"},
  {id: "MN", value: "Minnesota", label:"Minnesota"},
  {id: "MS", value: "Mississippi", label:"Mississippi"},
  {id: "MO", value: "Missouri", label:"Missouri"},
  {id: "MT", value: "Montana", label:"Montana"},
  {id: "NE", value: "Nebraska", label:"Nebraska"},
  {id: "NV", value: "Nevada", label:"Nevada"},
  {id: "NH", value: "New Hampshire", label:"New Hampshire"},
  {id: "NJ", value: "New Jersey", label:"New Jersey"},
  {id: "NM", value: "New Mexico", label:"New Mexico"},
  {id: "NY", value: "New York", label:"New York"},
  {id: "NC", value: "North Carolina", label:"North Carolina"},
  {id: "ND", value: "North Dakota", label:"North Dakota"},
  {id: "OH", value: "Ohio", label:"Ohio"},
  {id: "OK", value: "Oklahoma", label:"Oklahoma"},
  {id: "OR", value: "Oregon", label:"Oregon"},
  {id: "PA", value: "Pennsylvania", label:"Pennsylvania"},
  {id: "RI", value: "Rhode Island", label:"Rhode Island"},
  {id: "SC", value: "South Carolina", label:"South Carolina"},
  {id: "SD", value: "South Dakota", label:"South Dakota"},
  {id: "TN", value: "Tennessee", label:"Tennessee"},
  {id: "TX", value: "Texas", label:"Texas"},
  {id: "UT", value: "Utah", label:"Utah"},
  {id: "VT", value: "Vermont", label:"Vermont"},
  {id: "VA", value: "Virginia", label:"Virginia"},
  {id: "WA", value: "Washington", label:"Washington"},
  {id: "WV", value: "West Virginia", label:"West Virginia"},
  {id: "WI", value: "Wisconsin", label:"Wisconsin"},
  {id: "WY", value: "Wyoming", label:"Wyoming"}
     ];
  ngOnInit(){
    this.contactUsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
    phoneNumber: ['', Validators.required],
    state:['', Validators.required],
    inquiry: ['', [Validators.required,Validators.minLength(50),Validators.maxLength(500)]]
  });
  }



  emailValidator(control:FormControl) {
          if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
              return null;
          } else {
              return { 'invalid Email Address': false };
          }
  }



  sendContactUS() {
    console.log(JSON.stringify(this.contactUsForm.value));
    this.contactusService.addContactUsDetails(this.contactUsForm.value).subscribe(
      response =>{
      this.showMessage(response.status,response._body);
      this.ngOnInit();
      },
      error => {
      this.showMessage(error.status,error._body);
      }
    );
  }

showMessage(status:number ,message:string){
  this.toasterService.pop((status == 200) ? 'success':'error',message);
}

private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public  opened():void {
    console.log('opened');
  }

  public  closed():void {

  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.contactUsForm.controls['state'].setValue(value.value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}
