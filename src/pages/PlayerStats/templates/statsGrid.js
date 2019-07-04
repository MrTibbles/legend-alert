import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
// import { css } from 'linaria'

class StatItem extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    styles.textContent = `
      .container {
        background-color: var(--color-primary);
        display: flex;
        flex-direction: column;
      }

      p {
        color: white;
      }
    `

    const statContainer = document.createElement('div')
    statContainer.setAttribute("class", "container");

    this.categoryDisplay = document.createElement('p')
    this.nameDisplay = document.createElement('h3')
    this.valueDisplay = document.createElement('h2')

    shadow.appendChild(styles);
    shadow.appendChild(statContainer);

    statContainer.appendChild(this.valueDisplay)
    statContainer.appendChild(this.nameDisplay)
    statContainer.appendChild(this.categoryDisplay)
  }

  static get observedAttributes() {
    return ['category', 'value', 'name'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.info(attr, oldValue, newValue)

    if (oldValue !== newValue) {
      return this[`${attr}Display`].innerText = newValue
    }
  }

  connectedCallback() {
    console.info('connected')
  }
  // disconnectedCallback() {}
}

customElements.define("stat-item", StatItem);

/**
 * Main stats grid for a single Apex Legend
 *
 * @param  {Array} stats Available stats from TRN response
 * @return {Object}      lit-html renderResult
 */
const statsGrid = ({ stats }) => {

  return html`
    <main class="container">
      <div class="grid">
        ${repeat(stats, ({ metadata }) => metadata.key, stat => html`
          <stat-item
            category=${stat.metadata.categoryName}
            value=${stat.displayValue}
            name=${stat.metadata.name}>
          </stat-item>
        `)}
      </div>
    </main>
  `
}

export default statsGrid
