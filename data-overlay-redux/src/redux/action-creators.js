import { store } from './store';
import { setActiveOptionAction } from './reducer';

export function setActiveOption(option) {
  store.dispatch(setActiveOptionAction(option));
}
