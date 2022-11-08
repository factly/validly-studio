import layout from '../config/layout';
import { SET_COLLAPSE } from '../constants/sidebar';

const initialState = {
  ...layout,
  sider: {
    collapsed: true,
  },
};

export default function settingsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_COLLAPSE:
      return {
        ...state,
        ...{
          sider: {
            collapsed: !state.sider.collapsed,
          },
        },
      };
    default:
      return state;
  }
}
