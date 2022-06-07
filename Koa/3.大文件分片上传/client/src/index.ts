console.log(document);

const input1 = document.querySelector('#num1')! as HTMLInputElement;
const input2 = document.querySelector('#num2')! as HTMLInputElement;
const but = document.querySelector('button')!;

console.log(input1);

function add(num1:number, num2:number) {
  return num1 + num2;
}

but.addEventListener('click', function(e) {
  const val = add(Number(input1.value), Number(input2.value));
  console.log(val);
});

export {}

