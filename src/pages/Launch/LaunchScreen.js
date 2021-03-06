import {connect} from 'react-redux';

import {navigate} from 'redux/router';
import {Launch} from './Launch';

export const LaunchScreen = connect(null, dispatch => {
  return {
    navigate: routeName => () => dispatch(navigate(routeName)),
  };
})(Launch);
