import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {
  TabRouter,
  createNavigationContainer,
  createNavigator,
  addNavigationHelpers,
} from 'react-navigation';

import {commonStyles} from 'theme';

import {Tabbar} from 'components/Tabbar/Tabbar';
import {DashboardScreen} from 'pages/DashboardScreen';
import {ContactsScreen} from 'pages/Contacts/ContactsScreen';
import {JournalScreen} from 'pages/JournalScreen';
import {SettingsScreen} from 'pages/Settings/SettingsScreen';

const CustomTabView = ({router, navigation}) => {
  const {routes, index} = navigation.state;
  const ActiveScreen = router.getComponentForRouteName(routes[index].routeName);
  return (
    <View style={commonStyles.flex}>
      <View style={[commonStyles.flex, commonStyles.bgWhite]}>
        <ActiveScreen
          navigation={addNavigationHelpers({
            dispatch: navigation.dispatch,
            state: routes[index],
          })}
          screenProps={{}}
        />
      </View>
      <Tabbar navigation={navigation} />
    </View>
  );
};
CustomTabView.propTypes = {
  router: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const noHeader = {
  navigationOptions: {header: null},
};

const CustomTabRouter = TabRouter({
  Dashboard: {
    screen: DashboardScreen,
    ...noHeader,
  },
  Contacts: {
    screen: ContactsScreen,
    ...noHeader,
  },
  Journal: {
    screen: JournalScreen,
    ...noHeader,
  },
  Settings: {
    screen: SettingsScreen,
    ...noHeader,
  },
});

export const TabsNavigator = createNavigationContainer(
  createNavigator(CustomTabRouter)(CustomTabView),
);
