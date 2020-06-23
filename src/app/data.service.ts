import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private resultSource = new BehaviorSubject('Waiting for input!');
  currentResult = this.resultSource.asObservable();

  constructor() { }

  changeResult(resultData: string) {
    this.resultSource.next(resultData)
  }

}
