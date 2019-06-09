import { html } from "lit-html";
import { css } from "linaria";

const container = css`
  min-height: 100vh;
  padding: 6.25rem 0 3.125rem;
`;

const logo = css`
  display: block;
  width: 14.25rem;
  height: 13rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const markup = html`
  <section class=${container}>
    <div class=${logo}>
      <svg xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="M195.3 169.5h-15.6l-21.4-94.8c-1.6-7.2-7.9-12.2-15.3-12.2H85c-7.4 0-13.7 5-15.3 12.2l-21.4 94.8H32.7c-2.2 0-4 1.8-4 4v30.2c0 2.2 1.8 4 4 4h162.7c2.2 0 4-1.8 4-4v-30.2c-.1-2.2-1.9-4-4.1-4zm-117.8-93c.8-3.5 3.9-6 7.5-6h58c3.6 0 6.7 2.5 7.5 6l21 93h-42.8v-44.1c0-8.1-6.6-14.7-14.7-14.7s-14.7 6.6-14.7 14.7v44.1H56.5l21-93zm29.8 92.6v-43.8a6.7 6.7 0 0 1 13.4 0v43.8h-13.4zm84 30.6H36.7v-22.2H191.3v22.2zM114 40.9c2.2 0 4-1.8 4-4v-32c0-2.2-1.8-4-4-4s-4 1.8-4 4v32c0 2.2 1.8 4 4 4zM56.1 62.5c.8.8 1.8 1.2 2.8 1.2 1 0 2-.4 2.8-1.2 1.6-1.6 1.6-4.1 0-5.7L39.2 34.2c-1.6-1.6-4.1-1.6-5.7 0-1.6 1.6-1.6 4.1 0 5.7l22.6 22.6zM40.2 114.7c0-2.2-1.8-4-4-4h-32c-2.2 0-4 1.8-4 4s1.8 4 4 4h32c2.2 0 4-1.8 4-4zM169 63.7c1 0 2-.4 2.8-1.2l22.6-22.6c1.6-1.6 1.6-4.1 0-5.7-1.6-1.6-4.1-1.6-5.7 0l-22.6 22.6c-1.6 1.6-1.6 4.1 0 5.7.9.8 1.9 1.2 2.9 1.2zM223.8 110.7h-32c-2.2 0-4 1.8-4 4s1.8 4 4 4h32c2.2 0 4-1.8 4-4s-1.8-4-4-4z"/></g></svg>
    </div>
    <form>
      <div class="form-group">
        <p class="sub-title">Platform</p>
        <div style="flex">
          <div>
            <label for="psn"><psn-svg /><label>
            <input type="radio" name="platform" value="psn" />
          </div>
          <div>
            <label for="psn"><xbox-svg /><label>
            <input type="radio" name="platform" value="xbox" />
          </div>
          <div>
            <label for="psn"><pc-svg /><label>
            <input type="radio" name="platform" value="pc" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="player-tag">Player tag</label>
        <input type="text" name="player-tag" placeholder="absolute-legend" />
      </div>
    </form>
  </section>
`;

export default markup;
