export interface IObserver{
  update: () => void
} 



export class Observer1 implements IObserver{

  update(){
    console.log("updated the observer1");
  }
}