import { Component, OnInit, DebugElement } from '@angular/core';
import { DataService } from "../data.service";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent implements OnInit {

  hdwoodDoc: AngularFirestoreDocument<Item>
  hdwood : Observable<Item>
  hdironDoc: AngularFirestoreDocument<Item>
  hdiron : Observable<Item>
  hdclDoc: AngularFirestoreDocument<Item>
  hdcl : Observable<Item>

  lwoodDoc: AngularFirestoreDocument<Item>
  lwood : Observable<Item>
  lironDoc: AngularFirestoreDocument<Item>
  liron : Observable<Item>
  lclDoc: AngularFirestoreDocument<Item>
  lcl : Observable<Item>

  constructor(public afs: AngularFirestore, private data: DataService) {
    this.hdwoodDoc = this.afs.doc<Item>('/stores/ORmuMy2Y0M30ZKwu0tUV/items/dQvcZCvY78R6l9pXveh6');
    this.hdwood = this.hdwoodDoc.valueChanges();
    this.hdironDoc = this.afs.doc<Item>('/stores/ORmuMy2Y0M30ZKwu0tUV/items/3S1Y2htMzwFZemWi2gfU');
    this.hdiron = this.hdironDoc.valueChanges();
    this.hdclDoc = this.afs.doc<Item>('/stores/ORmuMy2Y0M30ZKwu0tUV/items/FoMFsWM26KknBTCvGoMW');
    this.hdcl = this.hdclDoc.valueChanges();

    this.lwoodDoc = this.afs.doc<Item>('/stores/7pPaZEbDzKsPTgMX4Cyi/items/mYWeB7GsprQwB8ZtwhDA');
    this.lwood = this.lwoodDoc.valueChanges();
    this.lironDoc = this.afs.doc<Item>('/stores/7pPaZEbDzKsPTgMX4Cyi/items/xkCMsUXp1Fi81dZdNqd2');
    this.liron = this.lironDoc.valueChanges();
    this.lclDoc = this.afs.doc<Item>('/stores/7pPaZEbDzKsPTgMX4Cyi/items/JUW0jyTbFzgJGSLBFq9w');
    this.lcl = this.lclDoc.valueChanges();
   }

  sideSum: number = 0;
  resultData:string;
  store: string;
  shape: string;
  material: string;
  price: number = 0;
  radiusX: number;
  radiusY: number;
  ciPer : number;
  side1 : number;
  side2 : number;
  side3 : number;
  side4 : number;

  HomeDepot = { 
    woodPrice : 0,
    woodLength : 0,
    woodHeight : 0,
    woodWidth : 0,
    woodURL: "",
    ironPrice : 0,
    ironLength : 0,
    ironHeight : 0,
    ironWidth : 0,
    ironURL: "",
    chainlinkPrice : 0,
    chainlinkLength : 0,
    chainlinkHeight : 0,
    chainlinkWidth : 0,
    chainlinkURL: ""
 }; 

 Lowes = { 
  woodPrice : 0,
  woodLength : 0,
  woodHeight : 0,
  woodWidth : 0,
  woodURL: "",
  ironPrice : 0,
  ironLength : 0,
  ironHeight : 0,
  ironWidth : 0,
  ironURL: "",
  chainlinkPrice : 0,
  chainlinkLength : null,
  chainlinkHeight : 0,
  chainlinkWidth : 0,
  chainlinkURL: ""
}; 

  errorResult() {
    this.data.changeResult("Please Enter All Data!")
  }

  ngOnInit(): void {
    this.data.currentResult.subscribe(message => this.resultData = message)
    this.getData().then();
  }

  async getData(){
    await this.hdwood.subscribe(val => {
      this.HomeDepot.woodPrice = val.price;
      this.HomeDepot.woodLength = val.length;
      this.HomeDepot.woodWidth = val.width;
      this.HomeDepot.woodHeight = val.height;
      this.HomeDepot.woodURL = val.URL;
    })

    await this.hdiron.subscribe(val => {
      this.HomeDepot.ironPrice = val.price;
      this.HomeDepot.ironLength = val.length;
      this.HomeDepot.ironWidth = val.width;
      this.HomeDepot.ironHeight = val.height;
      this.HomeDepot.ironURL = val.URL;
    })

    await this.hdcl.subscribe(val => {
      this.HomeDepot.chainlinkPrice = val.price;
      this.HomeDepot.chainlinkLength = val.length;
      this.HomeDepot.chainlinkWidth = val.width;
      this.HomeDepot.chainlinkHeight = val.height;
      this.HomeDepot.chainlinkURL = val.URL;
    })

    await this.lwood.subscribe(val => {
      this.Lowes.woodPrice = val.price;
      this.Lowes.woodLength = val.length;
      this.Lowes.woodWidth = val.width;
      this.Lowes.woodHeight = val.height;
      this.Lowes.woodURL = val.URL;
    })

    await this.liron.subscribe(val => {
      this.Lowes.ironPrice = val.price;
      this.Lowes.ironLength = val.length;
      this.Lowes.ironWidth = val.width;
      this.Lowes.ironHeight = val.height;
      this.Lowes.ironURL = val.URL;
    })

    await this.lcl.subscribe(val => {
      this.Lowes.chainlinkPrice = val.price;
      this.Lowes.chainlinkLength = val.length;
      this.Lowes.chainlinkWidth = val.width;
      this.Lowes.chainlinkHeight = val.height;
      this.Lowes.chainlinkURL = val.URL;
    })
  }

  ovalIn(value : string, param : string) : void{
    if (param == 'X') {
      this.radiusX = Number(value);
    } else if (param == 'Y') {
      this.radiusY = Number(value);
    }
    else{
      this.ciPer = Number(value);
    }
  }

  sideIn(value : string, param : string) : void{
    if (param == '1') {
      this.side1 = Number(value);
    } else if (param == '2') {
      this.side2 = Number(value);
    }
    else if (param == '3'){
      this.side3 = Number(value);
    }
    else if (param == '4'){
      this.side4 = Number(value);
    }
    else{}
  }

  sumSides(type : string) : void {
    this.sideSum = 0;
    if(type == "R"){
      if (this.side1 == null || this.side2 == null || this.side3 == null || this.side4 == null) {
        this.errorResult();
        return;
      } else {
        this.sideSum = (this.side1+this.side2+this.side3+this.side4);
      }    
  }
  else if (type == "O"){
    if(this.radiusX == null || this.radiusY == null || this.ciPer == null)
    {
      this.errorResult();
      return;
    }
    else
    {
    this.sideSum = Math.ceil((2*Math.PI*(Math.sqrt((Math.pow(this.radiusX,2)+Math.pow(this.radiusY,2))/2)))*(this.ciPer/100));
    }
  }
  else if(type == "3"){
    if (this.side1 == null || this.side2 == null || this.side3 == null) {
      this.errorResult();
      return;
    } else {
      this.sideSum = (this.side1+this.side2+this.side3);
    }
  }
  else if(type == "C"){
    if (this.side1 == null) {
      this.errorResult();
      return;
    } else {
      this.sideSum = this.side1;
    } 
  }
  else{
    this.errorResult();
    return;
  }
  }

  calc(): void {
    if (this.shape == "R") {
      this.sumSides("R");
    }
    else if (this.shape == "C") {
      this.sumSides("C");
    }
    else if (this.shape == "O"){
      this.sumSides("O");
    }
    else if (this.shape == "3"){
      this.sumSides("3");
    }
    else {
    this.errorResult();
    return;
    }
      if(this.material == 'W')
      {
        if(this.store == 'HD'){
          this.price = this.sideSum*(this.HomeDepot.woodPrice/this.HomeDepot.woodWidth);
        }
        else if(this.store == 'L'){
          this.price = this.sideSum*(this.Lowes.woodPrice/this.Lowes.woodWidth);
        }
        else{
          this.errorResult();
          return;
        }
      }
      else if(this.material == 'I'){
        if(this.store == 'HD'){
          this.price = this.sideSum*(this.HomeDepot.ironPrice/this.HomeDepot.ironWidth);
        }
        else if(this.store == 'L'){
          this.price = this.sideSum*(this.Lowes.ironPrice/this.Lowes.ironWidth);
        }
        else{
          this.errorResult();
          return;
        }
      }
      else if(this.material == 'CL'){
        if(this.store == 'HD'){
          this.price = this.sideSum*(this.HomeDepot.chainlinkPrice/this.HomeDepot.chainlinkWidth);
        }
        else if(this.store == 'L'){
          this.price = this.sideSum*(this.Lowes.chainlinkPrice/this.Lowes.chainlinkWidth);
        }
        else{
          this.errorResult();
          return;
        }
      }
      else{
        this.errorResult();
        return;
      }

    this.data.changeResult(`The perimeter is ${this.sideSum} inches and the cost is about $${this.price.toFixed(2)} CAD`);
    return;
  }

}

interface Item{
  name? : string;
  price?: number;
  length?: number;
  height?: number;
  width?: number;
  URL?: string;
}
