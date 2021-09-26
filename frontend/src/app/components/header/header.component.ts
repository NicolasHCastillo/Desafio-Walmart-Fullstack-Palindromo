import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { checkIsNumber } from 'src/app/utils/helpers';
import { APP_NAME } from '../../constants/general.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appName = APP_NAME;
  
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){

    const { search }: { search: string } = form.value;

    this.searchEvent.emit(search);
    
  }

  enabledSearch(form: NgForm){

    const { search }: { search: string } = form.value;

    return search && (checkIsNumber(search) || search.length > 3);

  }
}
