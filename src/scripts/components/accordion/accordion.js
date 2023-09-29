import Component from '../component';

export default class Accordion extends Component {
  constructor() {
    super();

    this.elements = {
      items: this.querySelectorAll('c-accordion-item'),
    };
  }

  componentDidMount() {
    this.on('c-accordion-item.open', (event) => {
      this.elements.items.forEach((item) => {
        if (item !== event.target) {
          item.close();
        }
      });
    });
  }
}

customElements.define('c-accordion', Accordion);
