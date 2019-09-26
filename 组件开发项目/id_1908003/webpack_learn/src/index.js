import test from './test';

test(123123123);
console.log(1);

const a = [123, 234234];

for (let val of a) {
  test(val);
}

class Comp {}

function myCreate() {
  console.log(arguments);
}

const test1 = <Comp></Comp>