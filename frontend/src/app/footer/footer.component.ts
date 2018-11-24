import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {FooterService} from './footer.service'
import {ToasterContainerComponent,ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';

@Component({
  selector: 'footer-template',
  templateUrl: './footer.html',
  styleUrls:['./footer.css'],
  providers: [FooterService, ToasterService]
})
export class FooterComponent  implements OnInit  {
  subscribeForm: FormGroup;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(private fb:FormBuilder, private footerService: FooterService,  private toasterService: ToasterService){}
  ngOnInit(){
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)]]
    });
  }
  subscribe(){
    window.open("https://www.mbusa.com/mercedes/contact_us/mercedes_email_subscription/manage/interests?email="+this.subscribeForm.get('email').value,"_blank");
  }

  downloadPDF(){
    this.footerService.getMBUSACcpPostionPDF().subscribe(
      response =>{
        var mediaType = 'application/pdf';
        var blob = new Blob([response._body], {type: mediaType});
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      },
      error => {
        this.showMessage(error.status,error._body);
      }
    );
  }

  showMessage(status:number ,message:string){
    this.toasterService.pop((status == 200) ? 'success':'error',message);
  }


}
