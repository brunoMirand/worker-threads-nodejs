import { threadId, parentPort } from "node:worker_threads";
import { performance } from 'node:perf_hooks';

parentPort.once('message', ({ from, to }) => {
  const start = performance.now();
  console.log(`start thread id: ${threadId}`);
  setTimeout(() => {
    for (let i = from; i < to; i++);
  }, 2000);
  const end = performance.now();
  console.log(`finish thread id: ${threadId}`);
  console.log(`Time of execution: ${end - start} milliseconds`);
  parentPort.postMessage('Thread done!');
});
