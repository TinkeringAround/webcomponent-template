import {
  TimeUpdatedEvent,
  StoreEvent,
  StoreEvents,
  UpdateTimeEvent,
} from "./events";
import { StoreState } from "./state";

type ReducerFunction = (
  state: StoreState,
  event: CustomEvent
) => [StoreState | null, StoreEvent | null];

type ReducerMap = {
  [key: string]: ReducerFunction;
};

export class Reducer {
  static map: ReducerMap = {
    // Add handlers for further Events mutating state here
    [StoreEvents.updateTime]: (
      state: StoreState,
      { detail }: UpdateTimeEvent
    ) => {
      return [
        {
          ...state,
          time: detail,
        },
        new TimeUpdatedEvent(),
      ];
    },
  };

  static reduce(
    state: StoreState,
    event: Event
  ): [StoreState | null, StoreEvent | null] {
    if (Reducer.map[event.type]) {
      return Reducer.map[event.type](state, event as CustomEvent);
    }

    return [null, null];
  }
}
