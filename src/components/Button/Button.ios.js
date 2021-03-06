import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from './Button.styles';

export class Button extends PureComponent {
  static defaultProps = {
    disabled: false,
    loading: false,
  };

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    loadingTitle: PropTypes.string,
  };

  getTitle() {
    const {title, children, loadingTitle, loading} = this.props;
    if (loading && loadingTitle) {
      return loadingTitle;
    }
    return title || children || '';
  }

  render() {
    const {onPress, disabled, loading} = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.4}>
        <Text style={styles.buttonText}>{this.getTitle()}</Text>
        {loading && (
          <ActivityIndicator color="#ffffff" style={styles.activityIndicator} />
        )}
      </TouchableOpacity>
    );
  }
}
