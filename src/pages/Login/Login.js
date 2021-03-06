import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {LoginFormContainer} from './form/LoginFormContainer';
import {Back} from 'components';
import {commonStyles, forceInset, preAuthScreensStyles} from 'theme';

export class Login extends PureComponent {
  static propTypes = {
    setToken: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
  };

  onSuccessFormResult = res => {
    const {setToken, navigate} = this.props;
    setToken(res.access_token);
    navigate('Tabs')();
  };

  render() {
    const {back} = this.props;
    // const {navigate} = this.props;

    return (
      <KeyboardAwareScrollView contentContainerStyle={commonStyles.flex}>
        <SafeAreaView
          forceInset={forceInset}
          style={preAuthScreensStyles.container}>
          <Back onPress={back} />
          <View style={commonStyles.flex} />

          <View style={preAuthScreensStyles.centeredBlock}>
            <Image source={require('./assets/login.png')} />

            <Text style={preAuthScreensStyles.primaryText}>
              Sign in with your account
            </Text>

            <LoginFormContainer onSuccess={this.onSuccessFormResult} />
          </View>

          <View style={commonStyles.flex} />

          {/* <BottomNav
            title="Don't have an account ?"
            linkTitle="Sign up"
            onPress={navigate('Signup')}
          /> */}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
