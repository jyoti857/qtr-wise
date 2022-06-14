export default interface IFlyBehavior{

    fly: () => void;

}


export class FlyWithWings implements IFlyBehavior{

  public fly(): void{
    console.log("I am flying with wings.")
  }
}

export class FlyNoWay implements IFlyBehavior{
  public fly(): void{
    console.log("I can not fly!");
  }
}


export class RocketPowered implements IFlyBehavior{
  public fly(): void{
    console.log("I am flying with the help of a engine!");
  }
}
