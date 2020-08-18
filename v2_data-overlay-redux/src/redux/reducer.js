import * as Constants from '../constants'
import data from '../data.json'

const options = [{
  name: 'Population',
  description: 'Estimated total population',
  property: 'pop_est',
  stops: [
    [0, '#f8d5cc'],
    [1000000, '#f4bfb6'],
    [5000000, '#f1a8a5'],
    [10000000, '#ee8f9a'],
    [50000000, '#ec739b'],
    [100000000, '#dd5ca8'],
    [250000000, '#c44cc0'],
    [500000000, '#9f43d7'],
    [1000000000, '#6e40e6']
  ]
}, {
  name: 'GDP',
  description: 'Estimate total GDP in millions of dollars',
  property: 'gdp_md_est',
  stops: [
    [0, '#f8d5cc'],
    [1000, '#f4bfb6'],
    [5000, '#f1a8a5'],
    [10000, '#ee8f9a'],
    [50000, '#ec739b'],
    [100000, '#dd5ca8'],
    [250000, '#c44cc0'],
    [5000000, '#9f43d7'],
    [10000000, '#6e40e6']
  ]
}]

const initialState: State = {
  data,
  options,
  active: options[0]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });
    default:
      return state;
  }
}

export { reducer, initialState };
