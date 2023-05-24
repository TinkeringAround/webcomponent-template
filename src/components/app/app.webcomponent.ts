import { Store } from "../../store";
import { StoreEvents, UpdateTimeEvent } from "../../store/events";
import { EventObserver } from "../../lib/event-observer";
import { WebComponent } from "../webcomponent";

export class App extends WebComponent {
  static tag = "wc-app";

  time: HTMLSpanElement;
  time$: EventObserver<StoreEvents, string>;

  constructor() {
    super();

    this.time = document.createElement("h1");
    this.attachShadow({ mode: "closed" }).append(this.time);

    this.time$ = Store.listenTo<string>(StoreEvents.timeUpdated).subscribe(() =>
      this.updateTime()
    );
  }

  connectedCallback() {
    this.updateTime();

    setInterval(() => {
      Store.dispatch(new UpdateTimeEvent(new Date().toLocaleString()));
    }, 1000);
  }

  disconnectedCallback() {
    this.time$.destroy();
  }

  updateTime() {
    this.time.textContent = Store.select(({ time }) => time);
  }
}
