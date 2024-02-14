import './red-box.js';
import './blue-box.js';

let rb = document.querySelector('red-box');
rb.addEventListener('click', rb.resize);
//call the internal resize() method

//alternatively change the attribute or the property
//to trigger the internal attributeChangedCallback()
// rb.addEventListener('click', (ev) => {
//   let newNum = Math.floor(Math.random() * 300) + 100;
//   console.log(newNum);
//   // ev.target.setAttribute('size', newNum);
//   ev.target.size = newNum;
// });

let bb = document.querySelector('blue-box');
bb.addEventListener('click', (ev) => {
  let newName = ['Vincent', 'Angie', 'Luciano', 'Eduardo'][Math.floor(Math.random() * 4)];
  //one of these
  ev.target.setAttribute('name', newName);
  // ev.target.name = newName;
});
