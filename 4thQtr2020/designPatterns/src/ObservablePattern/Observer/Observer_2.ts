import { IObserver } from "./Observer_1";


export class Observer2 implements IObserver{
  update(){
    console.log("updated the observer2");
  }
}