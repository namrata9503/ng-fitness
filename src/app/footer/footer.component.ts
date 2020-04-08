import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public showList = {
    list1: false,
    list2: false,
    list3: false
  };
  public buttonName: any = 'Show';
  constructor() { }

  ngOnInit() {
  }

  onToggle() {

    //  this.show= !this.show;


    // CHANGE THE NAME OF THE BUTTON.

  }


}
