import { StoreEvents } from "./events";
import { StoreState, INIT_APP_STATE } from "./state";
import { EventObserver } from "../lib/event-observer";
import { Reducer } from "./reducer";

export class Store {
  static readonly key = "store-state";
  static state: StoreState = INIT_APP_STATE;

  static init() {
    Object.values(StoreEvents).forEach((storeEvent) => {
      window.addEventListener(storeEvent, Store.commit);
    });
    Store.loadStateFromLocalStorage();
  }

  private static commit(event: Event) {
    const [mutatedState, returnEvent] = Reducer.reduce(Store.state, event);

    if (mutatedState) {
      Store.state = { ...mutatedState };
      Store.saveStateInLocalStorage();
      Store.log("STATE UPDATED", Store.state);
    }

    if (returnEvent) {
      Store.dispatch(returnEvent);
    }
  }

  static dispatch(event: CustomEvent) {
    window.dispatchEvent(event);
  }

  static select<T>(selector: (state: StoreState) => T): T {
    return selector(Store.state);
  }

  static listenTo<T>(eventName: StoreEvents) {
    return new EventObserver<StoreEvents, T>(eventName);
  }

  private static saveStateInLocalStorage() {
    window.localStorage.setItem(Store.key, JSON.stringify(Store.state));
  }

  private static loadStateFromLocalStorage() {
    const stringifiedState = window.localStorage.getItem(Store.key);

    if (stringifiedState) {
      Store.state = JSON.parse(stringifiedState);
      Store.log("LOADED", Store.state);
    }
  }

  private static log(message: string, object?: Object) {
    if (object) {
      console.log(`[STORE] ${message}`, object);
      return;
    }

    console.log(`[STORE] ${message}`);
  }
}

// Store Initialization
Store.init();
