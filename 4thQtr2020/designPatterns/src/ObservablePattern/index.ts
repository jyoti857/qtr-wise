import { IObservable, Observable } from "./Observable";
import { Observer1 } from "./Observer/Observer_1";
import { Observer2 } from "./Observer/Observer_2";
import { Observer3 } from "./Observer/Observer_3";



class Obser{

  observer1 = new Observer1();
  observer2 = new Observer2();
  observer3 = new Observer3();

  observable:IObservable;
  public run(){
    this.observable = new Observable();
    this.observable.add(this.observer1);
    this.observable.add(this.observer2);
    this.observable.add(this.observer3);
    this.observable.notify();
    this.observable.remove(this.observer2);
    this.observable.notify();
  }
}

const o = new Obser();
o.run();