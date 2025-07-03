import { Stack } from './stack.js';
import { Queue } from './queue.js';

const s = new Stack();
s.push(10);
s.push(20);
console.log("Stack:", s.display());
console.log("Popped:", s.pop());
console.log("Stack after pop:", s.display());

const q = new Queue();
q.enqueue(100);
q.enqueue(200);
console.log("Queue:", q.display());
console.log("Dequeued:", q.dequeue());
console.log("Queue after dequeue:", q.display());

/* package.json
{
  "type": "module"
}
*/
