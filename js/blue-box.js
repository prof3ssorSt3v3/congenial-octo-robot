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
  }
  //list the attributes
  static get observedAttributes() {
    return ['name'];
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
}

window.customElements.define('blue-box', BlueBox);
