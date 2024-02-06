console.log('Testing my software');

setInterval(() => {
  console.log('Execute before anytime')
}, 1000);

setTimeout(() => {
  console.log('now i will block nodejs');
  for (let i = 0; i < 1e20; i++);
}, 2000);
