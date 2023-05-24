export enum StoreEvents {
  // Add further Event Names here
  updateTime = "[APP] Update Time",
  timeUpdated = "[APP] Time Updated",
}

// Extend Union Type with further Events
export type StoreEvent = UpdateTimeEvent | TimeUpdatedEvent;

export class UpdateTimeEvent extends CustomEvent<string> {
  constructor(time: string) {
    super(StoreEvents.updateTime, {
      detail: time,
    });
  }
}

export class TimeUpdatedEvent extends CustomEvent<void> {
  constructor() {
    super(StoreEvents.timeUpdated);
  }
}
