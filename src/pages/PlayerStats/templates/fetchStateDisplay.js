import { html } from "lit-html";
import { css } from "linaria";

const styles = {
  container: css`
    display: flex;
    padding: 2rem 0;
    justify-content: center;
  `
};

const fetchStateDisplay = (state, msg) => html`
  <div class=${styles.container}>
    <h1>${state === "loading" ? "Loading..." : msg}</h1>
  </div>
`;

export default fetchStateDisplay;
