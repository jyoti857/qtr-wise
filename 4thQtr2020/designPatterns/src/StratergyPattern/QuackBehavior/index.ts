export interface IQuackBehavior{

    quack: () => void;
}

export class Quack implements IQuackBehavior {
  
  public quack(): void {
    console.log("simple quack!");
  }
}

export class MuteQuack implements IQuackBehavior{
  public quack(){
    console.log("I can not sound while quacking!");
  }
}

export class Squeak implements IQuackBehavior{
  public quack(){
    console.log("Squeak!");
  }
}