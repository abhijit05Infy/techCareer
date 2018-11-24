import {
  Component, EventEmitter, Input, Output, ChangeDetectionStrategy,
  AfterContentInit, ElementRef, ViewChild
} from '@angular/core';
import { YoutubePlayerService } from './youtube-player.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface YoutubeModel {
  videoId: string;
  height: number;
  width: number;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<style>
  .modal-dialog {
width: 845px;
}

.modal-body {
padding: 0 !important;
background-color: #000;
}
@media (max-width: 767px) { 
    iframe {
        width: 100%;
        height: auto;
    }

    .modal-dialog {
        width: auto !important;
    }
}


</style>
  <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" (click)="close()" ><span aria-hidden="true">&times;</span></button>
                </div>
                   <div class="modal-body">
                   <div #ytPlayerContainer></div>
                   </div>
                 </div>
              </div> `
})
export class YoutubePlayerComponent extends DialogComponent<YoutubeModel, null> implements AfterContentInit {
  @Input() videoId: string;
  @Input() height: number;
  @Input() width: number;
  /**
   * @description sets the protocol by the navigator object
   * if there is no window, it sets a default http protocol
   * unless the protocol is set from outside
   */
  @Input() protocol: string = this.getProtocol();
  @Input() playerVars: YT.PlayerVars = {};

  // player created and initialized - sends instance of the player
  @Output() ready = new EventEmitter<YT.Player>();
  // state change: send the YT event with its state
  @Output() change = new EventEmitter<YT.PlayerEvent>();

  /*@internal*/
  @ViewChild('ytPlayerContainer') public ytPlayerContainer: ElementRef;

  constructor(
    public playerService: YoutubePlayerService,
    private elementRef: ElementRef,dialogService: DialogService
  ) {

  super(dialogService);
  }

  ngAfterContentInit () {
    const htmlId = this.playerService.generateUniqueId();
    const playerSize = { height: this.height, width: this.width };
    this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
    this.playerService.loadPlayerApi({
      protocol: this.protocol
    });
    this.playerService.setupPlayer(htmlId, {
      change: this.change,
      ready: this.ready,
    }, playerSize, this.videoId, this.playerVars);

  }

  getProtocol() {
    const hasWindow = window && window.location;
    const protocol = hasWindow
      ? window.location.protocol.replace(':', '')
      : 'http';
    return protocol;
  }
}
