import { Component,AfterViewInit} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import {ContactUsComponent} from './contactUs/contactus.component';
import {Router, NavigationEnd} from '@angular/router';
declare var jQuery: any;
declare var ga: Function;
@Component({
  selector: 'my-app',
  templateUrl: './header/header.html',
  styles: ['a:hover{cursor:pointer;}']
})
export class AppComponent {
constructor(private modalService: DialogService,public router: Router){
  router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });

}

  onNavigate(){
    window.open("https://www.mbusa.com/mercedes/dealers/locator#!layout=/dealers/locator&businessType=DEALERS&radius=25&expandRadius=false&searchType=byZip&zip=70816","_blank");
  }
  showContactUsDialog() {
      const modalRef = this.modalService.addDialog(ContactUsComponent,{},{closeByClickingOutside:true});

    }
    ngAfterViewInit() {

jQuery("#myNavmenu ul a").click(function(){ jQuery('#myNavmenu').offcanvas('hide'); });

    }

}
