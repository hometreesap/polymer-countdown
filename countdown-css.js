import {html, LitElement} from '@polymer/lit-element';

/**
 * `countdown-css`
 * This component creates an animated countdown but with almost all of the work done in pure HTML/CSS
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CountdownCss extends LitElement {
  static get properties() {
    return {
      dateEnd: Object,
      totalSeconds: Number,
      delayValue: Number,
      countdownEnds: Date
    };
  }

  constructor() {
    super();

    this._calcCountdownEnds();
    this.delayValue = this._returnDelay();
  }

  _firstRendered() {
    this._eventOnAnimationEnds();

    this._calcCountdownEnds();
    this.delayValue = this._returnDelay();

    this.shadowRoot.querySelector('.countdown__seconds-digit-two').addEventListener('animationstart', () => {
      this._calcCountdownEnds();
      this.delayValue = this._returnDelay();
    }, false);
  }

  _calcCountdownEnds() {
    let { dateEnd } = this;
    if (typeof dateEnd === 'string' && dateEnd !== '') {
      dateEnd = new Date(dateEnd);
    }
    if (typeof dateEnd === 'object' && dateEnd !== null) {
      this.countdownEnds = new Date(dateEnd);
    } else if (typeof this.totalSeconds === 'number' && this.totalSeconds >= 0) {
      this.countdownEnds = new Date();
      this.countdownEnds.setSeconds(this.countdownEnds.getSeconds() + this.totalSeconds);
    } else {
      this.countdownEnds = new Date();
    }
  }

  _returnDelay() {
    // Returns the amount of seconds that needs to be delayed having in mind that the
    // whole animation takes 359,999 seconds
    const dateToday = new Date();
    const substractSeconds = Math.floor((this.countdownEnds - dateToday) / 1000);
    return 359999 - substractSeconds;
  }

  _returnDatetimeValue(countdownEnds) {
    return countdownEnds.toISOString();
  }

  _eventOnAnimationEnds() {
    // Dispatches an event called 'countdown-finished' when the countdown downs to 0
    const secondsDigit = this.shadowRoot.querySelector('.countdown__seconds-digit-two');
    secondsDigit.addEventListener('animationend', () => {
      this.dispatchEvent(new CustomEvent('countdown-finished', {
        bubbles: true
      }));
    });
  }

  _render({
    delayValue,
    countdownEnds
  }) {
    return html`
      <style>
      @keyframes tick6 {
        0%           { margin-top: 0; }
        16.6667%     { margin-top: -1rem; }
        33.3333%      { margin-top: -2rem; }
        50%          { margin-top: -3rem; }
        66.6667%      { margin-top: -4rem; }
        83.3333%      { margin-top: -5rem; }
        100%         { margin-top: -6rem; }
      }

      @keyframes tick10 {
        0%      { margin-top: 0; }
        10%     { margin-top: -1rem; }
        20%     { margin-top: -2rem; }
        30%     { margin-top: -3rem; }
        40%     { margin-top: -4rem; }
        50%     { margin-top: -5rem; }
        60%     { margin-top: -6rem; }
        70%     { margin-top: -7rem; }
        80%     { margin-top: -8rem; }
        90%     { margin-top: -9rem; }
        100%    { margin-top: -10rem; }
      }

      .countdown__container {
        display: block;
      }

      .countdown__digit {
        display: inline-block;
        height: 1rem;
        overflow: hidden;
        margin-right: -.3rem;
      }

      .countdown__digit span {
        display: block;
        height: 1rem;
        width: 100%;
      }

      .countdown__hours-digit-one {
        animation: tick10 360000s step-end;
        animation-iteration-count: .91;
        animation-fill-mode: forwards;
      }

      .countdown__hours-digit-two {
        animation: tick10 36000s step-end;
        animation-iteration-count: 9.91;
        animation-fill-mode: forwards;
      }

      .countdown__minutes-digit-one {
        animation: tick6 3600s step-end;
        animation-iteration-count: 99.84;
        animation-fill-mode: forwards;
      }

      .countdown__minutes-digit-two {
        animation: tick10 600s step-end;
        animation-iteration-count: 599.9;
        animation-fill-mode: forwards;
      }

      .countdown__seconds-digit-one {
        animation: tick6 60s step-end;
        animation-iteration-count: 5999.84;
        animation-fill-mode: forwards;
      }

      .countdown__seconds-digit-two {
        animation: tick10 10s;
        animation-iteration-count: 35999.9;
        animation-fill-mode: forwards;
      }
      </style>
      <time class="countdown__container" datetime$="${this._returnDatetimeValue(countdownEnds)}">
        <div class="countdown__digit">
          <span class="countdown-delay-plus countdown__hours-digit-one" style="animation-delay: -${delayValue + 1}s">9</span>
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>9</span>
        </div>
        <div class="countdown__digit">
          <span class="countdown-delay-plus countdown__hours-digit-two" style="animation-delay: -${delayValue + 1}s">9</span>
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>9</span>
        </div>
        <div class="countdown__digit">
            <span>:</span>
        </div>
        <div class="countdown__digit">
          <span class="countdown-delay-plus countdown__minutes-digit-one" style="animation-delay: -${delayValue + 1}s">5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>5</span>
        </div>
        <div class="countdown__digit">
          <span class="countdown-delay-plus countdown__minutes-digit-two" style="animation-delay: -${delayValue + 1}s">9</span>
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>9</span>
        </div>
        <div class="countdown__digit">
            <span>:</span>
        </div>
        <div class="countdown__digit">
          <span class="countdown-delay-plus countdown__seconds-digit-one" style="animation-delay: -${delayValue + 1}s">5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>5</span>
        </div>
        <div class="countdown__digit">
          <span class="countdown-delay countdown__seconds-digit-two" style="animation-delay: -${delayValue}s">9</span>
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
          <span>9</span>
        </div>
      </time>
    `;
  }
}

window.customElements.define('countdown-css', CountdownCss);
