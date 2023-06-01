import { TimeUpdatedEvent, StoreEvents, UpdateTimeEvent } from "./events";
import { StoreState } from "./state";

type ReducerFunctionReturnValue = [StoreState | null, CustomEvent | null];

type ReducerFunction = (
  state: StoreState,
  event: CustomEvent
) => ReducerFunctionReturnValue;

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

  static reduce(state: StoreState, event: Event): ReducerFunctionReturnValue {
    if (Reducer.map[event.type]) {
      return Reducer.map[event.type](state, event as CustomEvent);
    }

    return [null, null];
  }
}
