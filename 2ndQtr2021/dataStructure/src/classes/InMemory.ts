// interface Pokemon {
//   id: string;
//   attack: number;
//   defense: number;
// }

// interface BaseRecord{
//   id: string;
// }

// interface Database<T extends BaseRecord> {
//   set(newValue: T): void;
//   get: (id: string) => T | undefined
// }
// // creating a factory patterns 
// function createDataBase<T extends BaseRecord>(){
//   class InMemoryDatabase implements Database<T>{
//     static instance: InMemoryDatabase = new InMemoryDatabase(); 
//     private constructor(){}
//     public db: Record<string, T> = {}
//     set(newValue: T){
//       this.db[newValue.id] = newValue;
//     }
//     get(id: string){
//       return this.db[id]
//     }
//   }
//   // singleton
//   // return  new InMemoryDatabase();  
//   // 2nd way of making a singleton
//   return InMemoryDatabase; // only chance to create one object 
// } 

// const PokemonDB = createDataBase<Pokemon>();
// // const pokemonDB = new PokemonDB();
// const poke = {
//   id: "poker",
//   attack: 321,
//   defense: 23
// }

// // const inMe = new InMemoryDatabase<Pokemon>();
// PokemonDB.instance.set(poke)
// console.log(PokemonDB.instance.db, '\n', PokemonDB.instance.get(Object.keys(PokemonDB.instance.db)[0]))