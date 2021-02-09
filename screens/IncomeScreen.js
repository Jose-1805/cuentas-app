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
import FormIncome from '../components/FormIncome';

class IncomeScreen extends Component {
    static navigationOptions = {
        title: 'Ingresos',
    };

    constructor(props) {
        super(props);

        this.state = {
        	showModal:false,
        	selectedItem:{name:"", value:0}
        };

        this.deleteIncome = this.deleteIncome.bind(this);
        this.update = this.update.bind(this);
    }

    update(data){
    	this.props.openFullLoader("Actualizando ingreso");
        DB.updateIncome(data)
        .then(
            (result) => {
                this.props.updateAccountData();
                this.props.closeFullLoader();
                ToastAndroid.show('Ingreso actualizado con éxito', ToastAndroid.LONG);

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

    deleteIncome(){
    	if(this.state.selectedItem.id){
    		this.props.openFullLoader("Eliminando ingreso.");
    		DB.deleteIncome(this.state.selectedItem.id)
    			.then(
    				(response) => {
    					this.setState({
				        	showModal:false,
				        	selectedItem:{name:"", value:0}
				        })
				        this.props.closeFullLoader();
				        this.props.updateAccountData();
				        ToastAndroid.show('Ingreso eliminado con éxito', ToastAndroid.LONG);
    				}
    			);
    	}
    }

    render(){
    	if(!this.props.income.length){
    		return <View style={styles.container}>
	    		<View style={styles.card}>
	    			<Text style={styles.paragraph}>Sin datos</Text>
	    			<Text style={styles.label}>No se han encontrado ingresos registrados en la aplicación, para registrar su primer ingreso toque el botón que aparece después de este mensaje.</Text>
	    		</View>
	    		<Btn.Primary 
	    			title="Nuevo ingreso"
	    			onPress={() => {
	    				this.props.navigation.navigate("NewIncome")
	    			}}
	    		/>
    		</View>
    	}
        return (
			<View style={{flex:1}}>
				<FlatList
				  data={this.props.income}
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
									DB.incomeExecuted(item.id)
										.then(
											(response) => {
												this.props.updateAccountData();
												ToastAndroid.show('Acción realizada con éxito', ToastAndroid.LONG);
											}
										);
								}else{
									DB.incomeNotExecuted(item.id)
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
							<Text style={styles.paragraph}>Seleccione la opción que desea realizar con el ingreso denominado {this.state.selectedItem.name}, de valor {formattedNumber(this.state.selectedItem.value, "$")}.</Text>
							<View style={{marginBottom:10, marginTop:20}}>
								<Text style={combineStyles([styles.paragraph, {marginBottom:5}])}>Actualizar</Text>
								<Text style={combineStyles([styles.label, {marginBottom:10}])}>Actualice cualquier dato del ingreso registrado, los cálculos realizados con el valor del ingreso también serán actualizados.</Text>
								<FormIncome
									income={this.state.selectedItem}
									onSubmit={this.update}
								/>


								<View style={{marginTop:20, marginBottom:10}}>
									<Text style={combineStyles([styles.paragraph, {marginBottom:5}])}>Eliminar</Text>
									<Text style={combineStyles([styles.label, {marginBottom:10}])}>Elimine el ingreso de la aplicación, todos los calculos realizados dejarán de incluir el ingreso que se eliminará.</Text>
									<Btn.Delete 
										circle 
										type="outline"
										onPress={() => {
											Alert.alert(
												'Confirmación',
												'¿Está seguro de eliminar el ingreso seleccionado?',
												[
													{
														text: 'No, cancelar',
														style: 'cancel',
													},
													{ 
														text: 'Si, eliminar', 
														onPress: this.deleteIncome 
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
      income:state.app.income
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

export default connect(mapStateToProps, mapDispatchToProps)(IncomeScreen)
