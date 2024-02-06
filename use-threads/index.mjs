import os from 'node:os';
import internal from 'node:stream';
import { Worker } from 'node:worker_threads';

console.log('Testing my software');
const numberOfCPUs = os.cpus().length;
console.log(`Im have ${numberOfCPUs} cpus`);

const intervalId = setInterval(() => {
  console.log('Execute before anytime')
}, 1000);

function createThread(data) {
  const worker = new Worker('./use-threads/thread.mjs');
  const result = new Promise((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message);
    });
    worker.once('error', reject);
  });
  worker.postMessage(data);
  return result;
}

await Promise.all([
  createThread({
    from: 0,
    to: 1e20,
  }),
  createThread({
    from: 0,
    to: 1e20,
  }),
  createThread({
    from: 30,
    to: 1e20,
  }),
  createThread({
    from: 0,
    to: 1e9,
  }),
]);
