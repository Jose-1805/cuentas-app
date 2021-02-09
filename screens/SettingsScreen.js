import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { actOpenFL, actCloseFL } from '../redux/full_loader/actions';
import { actUpdateAccountData, actLogout } from '../redux/app/actions'

import { Text, View, Alert, ToastAndroid } from 'react-native';
import { Btn } from '../components/elements/Elements';

import { styles, combineStyles } from '../constants/Styles';
import DB from '../constants/DB';

class SettingsScreen extends Component {
	static navigationOptions = {
		title:"Configuración"
	}

    constructor(props) {
        super(props);

        this.deleteData = this.deleteData.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    deleteData(){
    	this.props.openFullLoader("Eliminando datos.");
    	DB.deleteAllIncome()
    		.then(
    			(response) => {
    				DB.deleteAllExpenses()
			    		.then(
			    			(response_) => {
			    				this.props.closeFullLoader();
			    				this.props.updateData();
			    				ToastAndroid.show('Datos eliminados correctamente.', ToastAndroid.LONG);
			    			}
						)
    			}
			)
    }

    signOut(){
    	this.props.logout()
    		.then(
    			() => {
    				this.props.navigation.navigate("Auth");
    			}
			);
    }

    render() {
        return (
            <View style={styles.container}>
            	<View style={combineStyles([styles.card,{marginBottom:25}])}>
            		<Text style={styles.paragraph}>Eliminar datos</Text>
            		<Text style={combineStyles([styles.label, {marginBottom:15}])}>Elimine todos los datos de ingresos y egresos almacenados en la aplicación.</Text>
            		<Btn.Delete 
            			type="outline" 
            			onPress={() => {
            				Alert.alert(
								  'Confirmación',
								  '¿Está seguro de eliminar todos los ingresos y egresos almacenados?',
								  [
								    {
										text: 'No, cancelar',
										style: 'cancel',
								    },
								    { 
								    	text: 'Si, eliminar', 
								    	onPress: this.deleteData 
								    },
								  ],
								  { cancelable: false }
								);
            			}}
        			/>
            	</View>
            	<View style={combineStyles([styles.card,{marginBottom:25}])}>
            		<Text style={styles.paragraph}>Cerrar sesión</Text>
            		<Text style={combineStyles([styles.label, {marginBottom:15}])}>Cierre la sesión actual en la aplicación. Cuando abra nuevamente la aplicación se solicitará el PIN de acceso.</Text>
            		<Btn.Primary 
            			type="outline" 
            			title="Cerrar sesión"
            			onPress={() => {
            				Alert.alert(
								  'Confirmación',
								  '¿Está seguro de cerrar la sesión?',
								  [
								    {
										text: 'No, cancelar',
										style: 'cancel',
								    },
								    { 
								    	text: 'Si, cerrar', 
								    	onPress: this.signOut 
								    },
								  ],
								  { cancelable: false }
								);
            			}}
        			/>
            	</View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateData:() => {
			dispatch(actUpdateAccountData());
		},
		openFullLoader:(message) => {
			dispatch(actOpenFL(message));
		},
		closeFullLoader:(message) => {
			dispatch(actCloseFL());
		},
		logout:() => {
			return dispatch(actLogout());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
