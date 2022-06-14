import { IObserver } from "../Observer/Observer_1";

export interface IObservable{
  add: (i: IObserver)=> void;
  remove: (i: IObserver) => void;
  notify(): void;
}

export class Observable implements IObservable{

  observers:Array<IObserver>  = new Array();
  
  add  = (iObserver: IObserver) =>{
    this.observers.push(iObserver);
  };
  index:number;
  remove(iObserver: IObserver){
    if(this.observers.length > 0){
      this.index = this.observers.indexOf(iObserver);
      if(this.index > -1){
        this.observers.splice(this.index, 1);
      }
    }
  };
  notify(){
    for(let o of this.observers){
      console.log("notification sent to the observers: ", o);
     }
  };

} 