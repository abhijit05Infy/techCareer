import { Component,AfterViewInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import { DialogService } from 'ng2-bootstrap-modal';
import {ApplyNowComponent} from '../applyNow/applynow.component';
import {TechTrainingProgService} from './techTrainingProg.service';
import {ToasterContainerComponent,ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';
declare var jQuery: any;
@Component({
  templateUrl:'./techTrainingProg.html',
  providers: [TechTrainingProgService,ToasterService]
})
export class TechTrainingProgComponent {
  constructor(private modalService : DialogService, private http:Http, private techTrainingProgService: TechTrainingProgService, private toasterService: ToasterService){}

  applyNow(){
    const modalRef = this.modalService.addDialog(ApplyNowComponent);
  }

  downloadBrochure(){
    this.techTrainingProgService.getBrochurePDF().subscribe(
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

  ngAfterViewInit() {

  jQuery(".click-video").click(function(){
                  jQuery(this).fadeOut();
                  jQuery(".feature iframe").delay( 400 ).fadeIn();
  });

    }

}
