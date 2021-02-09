import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';

import { styles, combineStyles } from '../constants/Styles';
import DB from '../constants/DB';
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { formattedNumber } from '../constants/functions';
import { StackActions } from 'react-navigation';

const actions = [
  {
    text: "Nuevo ingreso",
    icon: <MaterialIcons
            name="attach-money"
            size={26}
            color={Colors.primaryTextBasic}
          />,
    name: "NewIncome",
    color:Colors.primaryBackground,
    position: 1
  },
  {
    text: "Nuevo egreso",
    icon: <MaterialIcons
            name="money-off"
            size={26}
            color={Colors.primaryTextBasic}
          />,
    name: "NewExpenses",
    color:Colors.primaryBackground,
    position: 2
  }
];

class BalanceScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        incomeTotal:0,
        expensesTotal:0
    }
  }

  render(){
    const { incomeTotal, expensesTotal } = this.state;
    return (
      <View style={{flex:1}}>
          <ScrollView style={combineStyles([styles.container])}>
              <View style={{flex:1, paddingBottom:50}}>
                  <Text style={combineStyles([styles.title1, {textAlign:"center", marginTop:50}])}>Su saldo</Text>
                  <Text style={combineStyles([styles.title2, {textAlign:"center"}])}>{formattedNumber(this.props.balance, "$")}</Text>

                  <View style={combineStyles([styles.card, {marginTop:40}])}>
                    <Text style={styles.paragraph}>Ingresos pendientes</Text>
                    <Text style={styles.label}>Total de ingresos que faltan por efectuarse. Para efectuar cada uno de estos ingresos vaya a la pestaña de ingresos y toque el botón de activar</Text>
                    <Text style={combineStyles([styles.title1, {textAlign:"center", marginTop:15, color:Colors.successText}])}>{ formattedNumber(this.props.totalIncomeNotExecuted, "$") }</Text>
                  </View>

                  <View style={combineStyles([styles.card, {marginTop:40}])}>
                    <Text style={styles.paragraph}>Egresos pendientes</Text>
                    <Text style={styles.label}>Total de egresos que faltan por efectuarse. Para efectuar cada uno de estos egresos vaya a la pestaña de egresos y toque el botón de activar</Text>
                    <Text style={combineStyles([styles.title1, {textAlign:"center", marginTop:15, color:Colors.dangerText}])}>{ formattedNumber(this.props.totalExpensesNotExecuted, "$") }</Text>
                  </View>
              </View>
          </ScrollView>

          <FloatingAction
              actions={actions}
              onPressItem={name => {
                //this.props.navigation.navigate(name)
                const pushAction = StackActions.push({
                    routeName: name
                });

                this.props.navigation.dispatch(pushAction);
              }}
              color={Colors.primaryBackground}
            />
      </View>
    );
  }
}

BalanceScreen.navigationOptions = {
    header: null,
};


const mapStateToProps = (state) => {
  return {
      balance:state.app.balance,
      totalExpensesNotExecuted:state.app.totalExpensesNotExecuted,
      totalIncomeNotExecuted:state.app.totalIncomeNotExecuted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceScreen);