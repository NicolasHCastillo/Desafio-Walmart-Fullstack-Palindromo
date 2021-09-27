import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){

    const { search }: { search: string } = form.value;

    if(search != '' && !checkIsNumber(search) &&  search.length <= 3 ){
      this.toastr.info('La búsqueda tiene que ser de más de 3 caracteres');
      return;
    }

    this.searchEvent.emit(search);
    
  }

}
