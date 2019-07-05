import { html } from "lit-html";

import { confirmBtn } from "../styles";

const submitFormButton = ({ disabled = false, onSubmit }) => {
  return disabled
    ? html`
        <button @click=${onSubmit} class=${confirmBtn} type="button" disabled>
          LOADING...
        </button>
      `
    : html`
        <button @click=${onSubmit} class=${confirmBtn} type="button">
          CONFIRM
        </button>
      `;
};

export default submitFormButton;
