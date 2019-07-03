import { html } from "lit-html";

import { confirmBtn } from '../styles'

const submitFormButton = ({disabled = false, onSubmit}) => {

  return disabled
    ? html`
      <button
        class=${confirmBtn}
        disabled
        @click=${onSubmit}
        type="button"
      >
        CONFIRM
      </button>
    `
    : html`
      <button
        class=${confirmBtn}
        @click=${onSubmit}
        type="button"
      >
        CONFIRM
      </button>
    `
}

export default submitFormButton
