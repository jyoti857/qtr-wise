import { loader, RecordHandler } from './loader';

export {loader} from './loader'
interface Pokemon{
  id: string;
  attack: number;
  defense: number;
}
// interface EventType{
//   ev: string
// }

type Listener<EventType> = (ev: EventType) => void  

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
}{
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): () => void => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    },
    publish: (ev: EventType) => {
      listeners.forEach(l => l(ev))
    }
  }
}

interface BeforeSetEvent<T> {
  value: T, 
  newValue: T
}
interface AfterSetEvent<T> {
  value: T
}

interface BaseRecord{
  id: string;
}
interface Database<T extends BaseRecord> {
  set: (newValue: T) => void;
  get: (id: string) => T | undefined;
  
  onBeforeAdd: (listener: Listener<BeforeSetEvent<T>>) => {};
  onAfterAdd: (listener: Listener<AfterSetEvent<T>>) => {};

  // vistor pattern
  visit: (visitor: (item: T) => void ) => void 
  
  // strategy pattern
  selectBest(scoreStrategy: (item: T) => number): T | undefined 
}

// factory pattern, here in encapsulate the class inside a function to prevent the 
// class property by the externals 
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T>{
    private db: Record<string, T>= {};
    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();
    set(newValue: T){
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id]
      })
      
      this.db[newValue.id] = newValue;
      
      this.afterAddListeners.publish({
        value: newValue
      })
    }
    get(id: string){
      return this.db[id];
    }
    onBeforeAdd = (listener: Listener<BeforeSetEvent<T>>) => {
        return this.beforeAddListeners.subscribe(listener)
      } 
    onAfterAdd = (listener: Listener<AfterSetEvent<T>>) => {
      return this.afterAddListeners.subscribe(listener)
    }

    // visitor pattern
    visit(visitor: (item: T) => void){
      // Object.values(this.db).forEach(item => visitor(item))
      Object.values(this.db).forEach(visitor) // same as upper line 
    }

    // Strategy pattern
    selectBest( scoreStrategy: (item: T) => number ): T | undefined {
      const found: {
        max: number;
        item: T | undefined
      } = {
        max: 0,
        item: undefined
      };
      Object.values(this.db).reduce((f, item: T) => {
        const score = scoreStrategy(item)
        if(score > f.max){
          f.max = score;
          f.item = item;
        }
        return f;
      }, found)
      return found.item
    }
  }
  return new InMemoryDatabase();
}
const p1: Pokemon = {
  id: "pokie",
  attack: 112,
  defense: 13
}
const p2: Pokemon = {
  id: "pokie_2",
  attack: 22,
  defense: 23
}
const p3: Pokemon = {
  id: "pokie_3",
  attack: 32,
  defense: 33
} 
const PkmonDb  = createDatabase<Pokemon>();


class PokemonDataAdapter implements RecordHandler<Pokemon>{
  addRecord(record: Pokemon){
    PkmonDb.set(record)    
  }
}
loader('./data.json', new PokemonAdapter())



// const unsubscribe = PkmonDb.onAfterAdd(({value}) => {console.log("value --->", value)})
PkmonDb.onAfterAdd(({value}) => {console.log("value --->", value)})
PkmonDb.set(p2)
// const unsubscribe1 = PkmonDb.onAfterAdd(({value}) => {console.log("value --->", value)})
// unsubscribe()
PkmonDb.set(p1)
PkmonDb.set(p3)

PkmonDb.visit((item) => console.log("visitor -->", item.id))
const bestAttacker = PkmonDb.selectBest((item) => item.attack)
console.log("best attacker ---> ", bestAttacker)