import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scripbox-assignment';
  toast:any = false;
  constructor(private common:CommonService){
    common.toastrEvent.subscribe(res => {
      this.toast = res;
    })
  }
}
