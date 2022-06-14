"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = exports.first = void 0;
var first = function () {
    console.log("compiled!");
};
exports.first = first;
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        this.data = data;
        this.next = null;
    }
    return Node;
}());
var LinkedList = /** @class */ (function () {
    /**
     * create a new node and assign it to the head if the data is not null
     * */
    function LinkedList(data) {
        if (data === void 0) { data = null; }
        if (data) {
            var headNode = new Node(data);
            this.head = headNode;
            this.tail = headNode;
            this.length = 1;
        }
        else {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
    }
    LinkedList.prototype.offer = function (data) {
        throw new Error("Method not implemented.");
    };
    LinkedList.prototype.remove = function () {
        throw new Error("Method not implemented.");
    };
    LinkedList.prototype.poll = function () {
        throw new Error("Method not implemented.");
    };
    LinkedList.prototype.peek = function () {
        throw new Error("Method not implemented.");
    };
    LinkedList.prototype.print = function () {
        throw new Error("Method not implemented.");
    };
    // return true if the length of the linkedlist is 0
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    };
    // adding node to the end of the linkedlist 
    LinkedList.prototype.linkLast = function (e) {
        var newNode = new Node(e);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    };
    // insert specified element to the end of the linkedlist
    LinkedList.prototype.add = function (e) {
        this.linkLast(e);
        return true;
    };
    // add the node to the begining of the linkedlast 
    LinkedList.prototype.addFirst = function (e) {
        if (this.isEmpty()) {
            this.head = this.tail = new Node(e);
        }
        else {
            var tempNode = this.head;
            this.head = new Node(e);
            this.head.next = tempNode;
        }
        this.length++;
    };
    // add the node in the last of the linkedlist
    LinkedList.prototype.addLast = function (e) {
        this.linkLast(e);
    };
    /**
     * add a node at the provided index with data
     * @param data
     * @param index
     * */
    LinkedList.prototype.addAt = function (data, index) {
        if (index < 0 || index > this.length) {
            throw new Error("Illegal adrguement!!");
        }
        if (index === 0)
            this.addFirst(data);
        else if (index === this.length)
            this.addLast(data);
        else {
            var currentNode = this.head;
            for (var i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }
            var newNode = new Node(data);
            var tempNode = currentNode.next;
            currentNode.next = newNode;
            newNode.next = newNode;
            newNode.next = tempNode;
            this.length++;
        }
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
