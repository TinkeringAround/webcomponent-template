export interface StoreState {
  // Adjust state here
  time: string;
}

export const INIT_APP_STATE: StoreState = {
  time: new Date().toLocaleString(),
};
