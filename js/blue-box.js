const template = document.createElement('template');
template.innerHTML = `
<style>
:host div{
  background-color: cornflowerblue;
  color: #fff;
  font-size: 20px;
}
h2{
  font-size: 2rem;
  padding: 0.5rem 1rem;
}
p {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 100;
}
</style>
<div>
  <h2>Blue Box</h2>
  <p>Go ahead and click this blue box.</p>
  <p><button>Click Me Instead?</button></p>
</div>
`;

class BlueBox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    //reference the div from the template
    this.element = shadowRoot.querySelector('div');
    this.element.querySelector('h2').textContent = `Blue ${this.name} Box`;
    this.button = this.element.querySelector('button');
  }
  //list the attributes
  static get observedAttributes() {
    return ['name', 'func'];
  }
  //create a property get and set for each attribute
  get name() {
    return this.getAttribute('name');
  }
  set name(value) {
    this.setAttribute('name', value);
  }
  connectedCallback() {
    //method is run when the web component is added to the web page
    this.button.addEventListener('click', (ev) => {
      this.#_internalFunc(ev, this);
    });
    //if we use this._internalFunc, then `this` inside the function will be the button
  }
  disconnectedCallback() {
    //method is run when the web component is removed from the web page
  }
  attributeChangedCallback(attributeName, oldVal, newVal) {
    //method is run when
    if (attributeName === 'name') {
      this.element.querySelector('h2').textContent = `Blue ${this.name} Box`;
    }
  }
  #_internalFunc(ev) {
    ev.stopImmediatePropagation();
    //this stops the click bubbling from the button up to the <blue-box>
    //function meant to be called from inside the component, not from main.js
    // console.log(ev, this);
    let newName = ['Vincent', 'Angie', 'Luciano', 'Eduardo'][Math.floor(Math.random() * 4)];
    console.log(newName, 'from inside #_internalFunc');
    this.setAttribute('name', newName);
  }
}

window.customElements.define('blue-box', BlueBox);
