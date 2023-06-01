export interface StoreState {
  // Adjust state here
  time: string;
}

export const INIT_APP_STATE: StoreState = {
  // Adjust Init State here
  time: new Date().toLocaleString(),
};
