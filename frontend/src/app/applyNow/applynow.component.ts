import { Component, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {ApplyNowService} from './applynow.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterContainerComponent,ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';

@Component({
    templateUrl: './applynow.html',
    providers:[ApplyNowService]
})

export class ApplyNowComponent extends DialogComponent<null, null> implements  OnInit {
  applyNowForm: FormGroup;
  status:any;
  formData:any;
  message: string;
  files : FileList;
  fileSizeError: boolean = true;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private toasterService: ToasterService, private fb:FormBuilder, dialogService: DialogService, private applyNowService: ApplyNowService) {
    super(dialogService);
  }
  public config1 : ToasterConfig = new ToasterConfig({
      positionClass: 'toast-center',
      mouseoverTimerStop: true
    });

  ngOnInit(){
    this.applyNowForm = this.fb.group({
    programType: ['', Validators.required],
    userName: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
    file:['']
    });
  }

  getFiles(event:any){
      this.files = event.target.files;
      if(this.files.length == 0){
      this.fileSizeError = true;
      this.message = 'File not choosen';
      }else if(this.files[0].size > (1*1024*1024)){
      this.fileSizeError= true;
      this.message = 'File size should not be more than 1 MB';
      }else{
         this.fileSizeError=false;
      }
  }
applyNowSend(){

   var formData = new FormData();
     formData.append('userName',this.applyNowForm.get('userName').value);
     formData.append('email',this.applyNowForm.get('email').value);
     formData.append('programType',this.applyNowForm.get('programType').value);
     formData.append('file',this.files[0]);

    this.applyNowService.addApplyNowDetails(formData).subscribe(
    response =>{
    this.toasterService.pop((response.status == 200) ? 'success':'error',response._body);
    this.ngOnInit();
    },
    error => {
    this.toasterService.pop((error.status == 200) ? 'success':'error',error._body);
    }
    );
  }


}
