import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import BalanceScreen from '../screens/BalanceScreen';
import IncomeScreen from '../screens/IncomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';

const config ={
  headeMode:"screen",
  cardStyle:{backgroundColor:Colors.backgroundColorApp}
};

const BalanceStack = createStackNavigator(
  {
    Balance: BalanceScreen,
  },
  config
);

BalanceStack.navigationOptions = {
  tabBarLabel: 'Saldo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="account-balance"
    />
  ),
};

BalanceStack.path = '';

const IncomeStack = createStackNavigator(
  {
    Income: IncomeScreen,
  },
  config
);

IncomeStack.navigationOptions = {
  tabBarLabel: 'Ingresos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="attach-money" />
  ),
};

IncomeStack.path = '';

const ExpensesStack = createStackNavigator(
  {
    Expenses: ExpensesScreen,
  },
  config
);

ExpensesStack.navigationOptions = {
  tabBarLabel: 'Egresos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="money-off" />
  ),
};

ExpensesStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Configuración',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="settings" />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  BalanceStack,
  IncomeStack,
  ExpensesStack,
  SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;
