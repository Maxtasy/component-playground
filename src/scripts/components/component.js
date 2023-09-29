import { on, parseValue } from './utils';

export default class Component extends HTMLElement {
  constructor() {
    super();

    /**
     *
     *
     * @type {Object}
     * @public
     */
    this.parsedDataset = Object.entries(this.dataset).reduce((obj, [key, value]) => {
      return {
        ...obj,
        [key]: parseValue(value),
      };
    }, {});

    this.mounted = false;
  }

  connectedCallback() {
    if (!this.mounted) {
      this.emit('mount');

      this.componentDidMount();

      this.mounted = true;
    }
  }

  componentDidMount() {}

  on(name, func, options) {
    on(name, func, options, this);
  }

  emit(name, data) {
    let namespacedEventName = `${this.tagName.toLowerCase()}.${name}`;

    if (typeof this.parsedDataset.action === 'string') {
      namespacedEventName += `.${this.parsedDataset.action}`;
    }

    this.dispatchEvent(
      new CustomEvent(namespacedEventName, {
        detail: data,
        bubbles: true,
      })
    );
  }

  context(path) {
    return this.closest('product-context').get(path);
  }
}
