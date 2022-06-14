const first  = () => {
  console.log("compiled!")
}


export {first}


class Node<T>{
  // data: T;
  next: Node<T>;

  constructor(public data: T){
    this.data = data;
    this.next = null!;
  }
}

export class LinkedList<T> implements Queue<T>{
  head: Node<T>;
  tail: Node<T>;
  length: number;
  /**
   * create a new node and assign it to the head if the data is not null
   * */ 
  constructor(data: T = null!){
    if(data){
      const headNode = new Node(data);
      this.head = headNode;
      this.tail = headNode;
      this.length = 1;
    }else{
      this.head = null!;
      this.tail = null!;
      this.length = 0;
    }
  }
  offer(data: T): boolean {
    throw new Error("Method not implemented.");
  }
  remove(): T {
    throw new Error("Method not implemented.");
  }
  poll(): T {
    throw new Error("Method not implemented.");
  }
  peek(): T {
    throw new Error("Method not implemented.");
  }
  print(): void {
    throw new Error("Method not implemented.");
  }

  // return true if the length of the linkedlist is 0
  isEmpty(){
    return this.length === 0;
  }

  // adding node to the end of the linkedlist 
  private linkLast(e: T){
    let newNode = new Node(e);
    if(this.isEmpty()){
      this.head = this.tail = newNode;
    }else{
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // insert specified element to the end of the linkedlist
  add(e: T): boolean{
    this.linkLast(e);
    return true;
  }
  // add the node to the begining of the linkedlast 
  addFirst(e: T){
    if(this.isEmpty()){
      this.head = this.tail = new Node(e);
    }else{
      let tempNode = this.head;
      this.head = new Node(e);
      this.head.next = tempNode;
    }
    this.length++;
  }
  // add the node in the last of the linkedlist
  addLast(e: T){
    this.linkLast(e);
  }

  /**
   * add a node at the provided index with data
   * @param data
   * @param index
   * */ 
  addAt(data: T, index: number){
    if(index < 0 || index > this.length){
      throw new Error("Illegal adrguement!!");
    }
    if(index === 0 ) this.addFirst(data);
    else if(index === this.length) this.addLast(data);
    else{
      let currentNode = this.head;
      for( let i = 0; i< index - 1; i++){
        currentNode = currentNode.next!
      }
      const newNode = new Node(data);
      const tempNode = currentNode.next;
      currentNode.next = newNode;
      newNode.next = newNode;
      newNode.next = tempNode;
      this.length++;
    }
  }
}