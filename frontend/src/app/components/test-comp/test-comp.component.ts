import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  data: string = '';

  constructor(
    private testService: TestService
  ) { }

  ngOnInit(): void {
  }

  handleDefault(){
    this.data = 'Hello world';
  }
  
  async handleExternal(){
    const response: any = await this.testService.getInformation().toPromise().catch((e) => console.error(e));
    const { data: vgs } = response;
    this.data = JSON.stringify(vgs, null, 3);
  }

}
