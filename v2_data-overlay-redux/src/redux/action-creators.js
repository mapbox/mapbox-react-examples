import { store } from './store'
import * as Constants from '../constants'

export function setActiveOption(option) {
  store.dispatch({
    type: Constants.SET_ACTIVE_OPTION,
    option
  });
}
