/* eslint-disable curly */
class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) return Tooltip.instance;
    Tooltip.instance = this;
  }

  getTemplate(tooltip) {
    return `
      <div class="tooltip">${tooltip}</div>
    `;
  }

  render(tooltip) {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate(tooltip);
    this.element = element.firstElementChild;

    document.body.append(this.element);
  }

  getHandler(typeEvent) {
    const handlers = {
      'pointerover': event => {
        const tooltip = event.target.dataset.tooltip;
        if (tooltip) {
          this.render(tooltip);
          document.addEventListener('pointermove', this.getHandler('pointermove'));
          document.addEventListener('pointerout', this.getHandler('pointerout'));
        }
      },
      'pointermove': event => {
        console.error(1);
        this.element.style.left = `${event.clientX + 5}px`;
        this.element.style.top = `${event.clientY + 5}px`;
      },
      'pointerout': () => {
        console.error(`pointerout`);
        this.remove();
        document.removeEventListener('pointermove', this.getHandler('pointermove'));
        document.removeEventListener('pointerout', this.getHandler('pointerout'));
      },
    };

    return handlers[typeEvent];
  }

  initialize() {
    document.addEventListener('pointerover', this.getHandler('pointerover'));
  }

  remove() {
    if (this.element) this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    document.removeEventListener('pointerover', this.getHandler('pointerover'));
  }
}

export default Tooltip;
