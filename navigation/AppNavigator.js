import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterPinScreen from '../screens/RegisterPinScreen';
import LoginScreen from '../screens/LoginScreen';
import Start from '../screens/Start';

import NewIncomeScreen from '../screens/NewIncomeScreen';
import NewExpensesScreen from '../screens/NewExpensesScreen';

import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    User: createStackNavigator({
        Main:{screen:MainTabNavigator, navigationOptions:{header:null}},
        NewIncome:{screen:NewIncomeScreen},
        NewExpenses:{screen:NewExpensesScreen}
    }, {
      headeMode:"screen",
      cardStyle:{backgroundColor:Colors.backgroundColorApp}
    }),
    
    newUser: createStackNavigator({
    	Welcome:{screen:WelcomeScreen},
    	RegisterPin:{screen:RegisterPinScreen},
    },{headerMode:"none", mode:"modal"}),
    
    Auth: createStackNavigator({
      Login:{screen:LoginScreen}
    },{headerMode:"none", mode:"modal"}),
    
    Start,
  }, 
  {
  	initialRouteName: 'Start'
  })
);
