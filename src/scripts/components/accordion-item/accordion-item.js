import Component from '../component';

export default class AccordionItem extends Component {
  constructor() {
    super();

    this.elements = {
      header: this.querySelector('button'),
      content: this.querySelector('.AccordionItem__Content'),
    };
  }

  componentDidMount() {
    this.elements.header.addEventListener('click', () => {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    });
  }

  open() {
    this.contentHeight = this.elements.content.scrollHeight;
    this.elements.content.style.setProperty('--content-height', `${this.contentHeight}px`);

    this.setAttribute('aria-expanded', true);

    this.emit('open');

    this.active = true;
  }

  close() {
    this.setAttribute('aria-expanded', false);

    this.active = false;
  }
}

customElements.define('c-accordion-item', AccordionItem);
