import {connect} from 'react-redux';

import {navigate} from 'redux/router';
import {ActionSheet} from './ActionSheet';

export const ActionSheetContainer = connect(
  null,
  dispatch => {
    return {
      navigate: routeName => {
        dispatch(navigate(routeName));
      },
    };
  },
  null,
  {withRef: true},
)(ActionSheet);
