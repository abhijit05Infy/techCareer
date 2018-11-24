import { Component} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import {ContactUsComponent} from '../contactUs/contactus.component';
import {YoutubePlayerComponent} from '../videoplayer/youtube-player.component';

@Component({
  templateUrl: './home.html'
})

export class HomeComponent {

  player:any;
  ytEvent:any;
  constructor(private modalService: DialogService){}
  onNavigate(){
    window.open("https://www.mbusa.com/mercedes/dealers/locator#!layout=/dealers/locator&businessType=DEALERS&radius=25&expandRadius=false&searchType=byZip&zip=70816","_blank");
  }


  playYoutubeVideo(videoid:string){
  console.log("playYoutubeVideo");
  this.modalService.addDialog(YoutubePlayerComponent,{videoId: videoid,
  height:470 , width:843 },{closeByClickingOutside:true});
  }

  onStateChange(event:any) {
    this.ytEvent = event.data;
  }
  savePlayer(player:any) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  showContactUsDialog() {
      const modalRef = this.modalService.addDialog(ContactUsComponent,{},{closeByClickingOutside:true});

    }


}
