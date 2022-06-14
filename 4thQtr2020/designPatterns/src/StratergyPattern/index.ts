import Duck from "./Duck/Duck";
import IFlyBehavior, { FlyNoWay } from "./FlyBehavior";
import FlyBehavior, { FlyWithWings } from "./FlyBehavior";
import { IQuackBehavior, MuteQuack, Squeak } from "./QuackBehavior";



class Mallard extends Duck{

  public display(): void{
    console.log("I am here to display the mallard duck!");
  }

  flyBehaviorWithWings:IFlyBehavior = new FlyWithWings();
  quackBehavior: IQuackBehavior = new Squeak();


}

class ModelDuck extends Duck {
  public display(): void {
    console.log('I am here to display the model duck!');
  }
  flyBehaviorWithNoWay: IFlyBehavior = new FlyNoWay();
  quackBehaviorMuteQuack: IQuackBehavior  = new MuteQuack();
}

class RubberDuckie extends Duck {
  public display(): void{}
  flyNoWay: IFlyBehavior = new FlyNoWay();
  quackSqueak: IQuackBehavior = new Squeak();

}
export class Stratergy{

  public run(): void{
    const mallard = new Mallard();
    mallard.display();
    mallard.flyBehaviorWithWings.fly();
    mallard.quackBehavior.quack();
  }
}

const s = new Stratergy();
s.run();