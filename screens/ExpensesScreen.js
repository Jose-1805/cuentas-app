import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actUpdateAccountData } from '../redux/app/actions';
import { actOpenFL, actCloseFL } from '../redux/full_loader/actions';

import { ScrollView, StyleSheet, FlatList, Text, View, ToastAndroid, Modal, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Btn } from '../components/elements/Elements';
import {styles, combineStyles} from '../constants/Styles';
import { formattedNumber } from '../constants/functions';
import DB from '../constants/DB';
import Colors from '../constants/Colors';
import FormExpenses from '../components/FormExpenses';

class ExpensesScreen extends Component {
    static navigationOptions = {
        title: 'Egresos',
    };

    constructor(props) {
        super(props);

        this.state = {
          showModal:false,
          selectedItem:{name:"", value:0}
        };

        this.deleteExpenses = this.deleteExpenses.bind(this);
        this.update = this.update.bind(this);
    }

    update(data){
      this.props.openFullLoader("Actualizando egreso");
        DB.updateExpenses(data)
        .then(
            (result) => {
                this.props.updateAccountData();
                this.props.closeFullLoader();
                ToastAndroid.show('Egreso actualizado con éxito', ToastAndroid.LONG);

                this.setState(() => {
                    return {
                        showModal:false,
                        selectedItem:{name:"", value:0}
                    }
                })
            },
            (error) => {
                console.log(error)
            }
        );
    }

    deleteExpenses(){
      if(this.state.selectedItem.id){
        this.props.openFullLoader("Eliminando egreso.");
        DB.deleteExpenses(this.state.selectedItem.id)
          .then(
            (response) => {
              this.setState({
                  showModal:false,
                  selectedItem:{name:"", value:0}
                })
                this.props.closeFullLoader();
                this.props.updateAccountData();
                ToastAndroid.show('egreso eliminado con éxito', ToastAndroid.LONG);
            }
          );
      }
    }

    render(){
      if(!this.props.expenses.length){
        return <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.paragraph}>Sin datos</Text>
            <Text style={styles.label}>No se han encontrado egresos registrados en la aplicación, para registrar su primer egreso toque el botón que aparece después de este mensaje.</Text>
          </View>
          <Btn.Primary 
            title="Nuevo egreso"
            onPress={() => {
              this.props.navigation.navigate("NewExpenses")
            }}
          />
        </View>
      }
        return (
      <View style={{flex:1}}>
        <FlatList
          data={this.props.expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => <ListItem
            title={item.name}
            subtitle={formattedNumber(item.value, "$")}
            bottomDivider
            onLongPress={() => {
              this.setState({
                showModal:true,
                selectedItem:item
              })
            }}
            switch={{
              value:item.state == 1?true:false,
              thumbColor:item.state == 1?Colors.primaryBackground:Colors.defaultBackground,
              onValueChange:() => {
                if(item.state == 0){
                  DB.expensesExecuted(item.id)
                    .then(
                      (response) => {
                        this.props.updateAccountData();
                        ToastAndroid.show('Acción realizada con éxito', ToastAndroid.LONG);
                      }
                    );
                }else{
                  DB.expensesNotExecuted(item.id)
                    .then(
                      (response) => {
                        this.props.updateAccountData();
                        ToastAndroid.show('Acción realizada con éxito', ToastAndroid.LONG);
                      }
                    );
                }
              }
            }}
            />
          }
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({showModal:false})
          }}>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Seleccione la opción que desea realizar con el egreso denominado {this.state.selectedItem.name}, de valor {formattedNumber(this.state.selectedItem.value, "$")}.</Text>
              <View style={{marginBottom:10, marginTop:20}}>
                <Text style={combineStyles([styles.paragraph, {marginBottom:5}])}>Actualizar</Text>
                <Text style={combineStyles([styles.label, {marginBottom:10}])}>Actualice cualquier dato del egreso registrado, los cálculos realizados con el valor del egreso también serán actualizados.</Text>
                <FormExpenses
                  expenses={this.state.selectedItem}
                  onSubmit={this.update}
                />


                <View style={{marginTop:20, marginBottom:10}}>
                  <Text style={combineStyles([styles.paragraph, {marginBottom:5}])}>Eliminar</Text>
                  <Text style={combineStyles([styles.label, {marginBottom:10}])}>Elimine el egreso de la aplicación, todos los calculos realizados dejarán de incluir el egreso que se eliminará.</Text>
                  <Btn.Delete 
                    circle 
                    type="outline"
                    onPress={() => {
                      Alert.alert(
                        'Confirmación',
                        '¿Está seguro de eliminar el egreso seleccionado?',
                        [
                          {
                            text: 'No, cancelar',
                            style: 'cancel',
                          },
                          { 
                            text: 'Si, eliminar', 
                            onPress: this.deleteExpenses 
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
            </Modal>
          </View>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      expenses:state.app.expenses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateAccountData:() => {
        dispatch(actUpdateAccountData());
      },
      openFullLoader:(message) => {
        dispatch(actOpenFL(message));
      },
      closeFullLoader:() => {
        dispatch(actCloseFL);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesScreen)
