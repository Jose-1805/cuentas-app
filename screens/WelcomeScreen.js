import React, { Component, PropTypes } from 'react';
import { styles, combineStyles } from '../constants/Styles';
import { View, Text } from 'react-native';
import { Btn } from '../components/elements/Elements';
import Colors from '../constants/Colors';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={combineStyles([styles.container, {justifyContent:"center"}])}>
            	<View style={combineStyles([styles.container, {flex:2, justifyContent:"center"}])}>
	            	<Text style={combineStyles([styles.title, {textAlign:"center"}])}>Bienvenido</Text>
	            	<Text style={combineStyles([styles.paragraph, {textAlign:"center"}])}>
	            		Con esta aplicación usted podrá llevar una contabilidad y trasabilidad de sus ingresos y egresos de una forma fácil e intuitiva.
	            		Controle y realice una planeación de sus gastos, planifique sus aciones financieras y tenga sus cuentas claras.
	            	</Text>
            	</View>

            	<View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
	            	<Btn.Primary
	            		title="Registre su pin de acceso"
						icon={
							<IconMCI
								name="cellphone-key"
								size={15}
								color={Colors.primaryTextBasic}
								style={{marginRight:10}}
							/>
						}
						style={{flex:4}}
						onPress={() => {
							this.props.navigation.navigate("RegisterPin");
						}}
	            	/>
            	</View>
            </View>
        );
    }
}

export default WelcomeScreen;
