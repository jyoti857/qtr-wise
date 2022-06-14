import IFlyBehavior from "../FlyBehavior";
import {IQuackBehavior as QuackBehavior} from "../QuackBehavior";


export default abstract class Duck{
  
  flyBehavior: IFlyBehavior;
  quackBehavior: QuackBehavior;

  public abstract display(): void;

  public setFlyBehavior(fb: IFlyBehavior): void{
    this.flyBehavior = fb;
  }
  public setQuackBehavior(qb: QuackBehavior): void{
    this.quackBehavior = qb;
  }
  public performFly(): void{
    this.flyBehavior.fly();
  }
  public performQuack(): void{
    this.quackBehavior.quack();
  }

  public swim():void{
    console.log("all ducks floats! even decoys!");
  }
  
} 