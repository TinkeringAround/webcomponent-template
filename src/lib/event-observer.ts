export class EventObserver<R extends string, T = any> {
  private eventName: R;
  private callback: (data: T) => void = () => {};

  constructor(eventName: R) {
    this.eventName = eventName;
  }

  subscribe(callback: (data: T) => void): EventObserver<R, T> {
    this.callback = callback;
    window.addEventListener(this.eventName, this.publish.bind(this));
    return this;
  }

  publish(event: Event) {
    this.callback((event as CustomEvent<T>).detail as T);
  }

  destroy() {
    window.removeEventListener(this.eventName, this.publish);
  }
}
