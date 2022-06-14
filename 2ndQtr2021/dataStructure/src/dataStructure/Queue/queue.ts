

interface Queue<T>{
  /** *
   * add the data to the end of the queue add throws exception if it fails to insert the data 
   * @param data
   */ 
   add(data: T): boolean ; 
  /** 
   * add the data to the end of the end of the queue and returns false if it fails to insert the data 
   * @param data
   * */  
  offer(data: T): boolean;

  // / remove the first element from the queue and throws exception if the queue is empty 
  remove(): T;
  
  // remove the first element of the queue and returns null if the queue is empty 
  poll(): T;

  // return the first element of the queue and returns null if the queue is empty
  peek(): T;

  // return true if the queue is empty 
  isEmpty(): boolean;

  // print the queue as an array
  print(): void;


}