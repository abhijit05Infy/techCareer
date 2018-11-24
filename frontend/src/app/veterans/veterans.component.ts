import { Component } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import {ApplyNowComponent} from '../applyNow/applynow.component';
@Component({
  templateUrl: './veterans.html'
})
export class VeteransComponent {

constructor(private modalService: DialogService){}

  onNavigate(){
    window.open("https://www.mbusa.com/mercedes/dealers/locator#!layout=/dealers/locator&businessType=DEALERS&radius=25&expandRadius=false&searchType=byZip&zip=70816","_blank");
  }
  showApplyNowDialog() {
      const modalRef = this.modalService.addDialog(ApplyNowComponent);
    }



 }
