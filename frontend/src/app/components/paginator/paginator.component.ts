import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Paginate } from '../../models/paginate.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: Paginate;
  @Output() handlePage = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.paginator);
  }

  get isFirst(){
    return this.paginator.currentPage == 1;
  }

  get isLast(){
    return this.paginator.currentPage == this.paginator.totalPages;
  }

  changePage(page: number){
    this.handlePage.emit(page);
  }
}
