import { Component, OnInit} from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  resultData:string;

  constructor(private data: DataService) { }
  

  ngOnInit(): void {
    this.data.currentResult.subscribe(message => this.resultData = message)
  }

}
