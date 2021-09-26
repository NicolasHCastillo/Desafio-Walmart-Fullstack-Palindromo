import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title: string;
  @Input() total: number; 
  @Output() handleReset = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  resetSearch(){
    this.handleReset.emit(null);
  }

}
