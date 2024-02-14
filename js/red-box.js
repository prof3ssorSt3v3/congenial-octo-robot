const template = document.createElement('template');
template.innerHTML = `
<style>
:host div {
  background-color: crimson;
  color: #fff;
  font-size: 20px;
  overflow: hidden;
}
h2{
  padding: 0.5rem 1rem;
}
p {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 100;
}
</style>
<div>
  <h2>Red Box</h2>
  <p>Go ahead and try to click this red box.</p>
</div>
`;

class RedBox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    //reference the div from the template
    this.element = shadowRoot.querySelector('div');
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
  }
  //list the allowed attributes
  static get observedAttributes() {
    return ['size'];
  }
  //create a property get and set for each attribute
  get size() {
    return this.getAttribute('size');
  }
  set size(value) {
    console.log('set new size', value);
    this.setAttribute('size', value);
  }
  connectedCallback() {
    //method is run when the web component is added to the web page
  }
  disconnectedCallback() {
    //method is run when the web component is removed from the web page
  }
  attributeChangedCallback(attributeName, oldVal, newVal) {
    //method is run when attribute is changed
    if (attributeName === 'size') {
      this.element.style.width = `${newVal}px`;
      this.element.style.height = `${newVal}px`;
    }
  }

  resize(ev) {
    console.log(ev.target); //reference the <red-box> element on the webpage
    let newNum = Math.floor(Math.random() * 300) + 100;
    console.log(newNum);
    this.size = newNum;
  }
}

window.customElements.define('red-box', RedBox);
