const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter text: ', (str) => {
  const v = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (let c of str.toLowerCase()) if (v[c] !== undefined) v[c]++;
  console.log(`a e i o u → ${v.a} ${v.e} ${v.i} ${v.o} ${v.u}`);
  rl.close();
});

// package.json
/*{
  "name": "vowel-count",
  "version": "1.0.0",
  "main": "8a.js",
  "scripts": {
    "start": "node 8a.js"
  }
}*/

