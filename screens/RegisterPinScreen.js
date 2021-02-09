import React, {Component} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Btn } from '../components/elements/Elements';
import Colors from '../constants/Colors';
import Pin from '../components/Pin';
import { styles, combineStyles} from '../constants/Styles';
import DB from '../constants/DB';

class RegisterPinScreen extends Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
	  		pin:"",
	  		verifiedPin:false
	  	}

	  	this.handlePinRegister = this.handlePinRegister.bind(this);
	}

	handlePinRegister(){
		DB.setPin(this.state.pin)
		.then((response) => {
			this.props.navigation.navigate("Main");
		}, (error) => {
			console.log("ERROR", error)
		})
	}

	render(){
		let pinComponent = "";
		if(this.state.verifiedPin){
			pinComponent = <Pin 
					btnSize={70} 
					max_length={6} 
					min_length={4} 
					valid={this.state.pin}
					onValidSuccess={this.handlePinRegister}
					textPinProps={{
						color:"#000"
					}}
				/>
		}else{
			pinComponent = <Pin 
					btnSize={70} 
					max_length={6} 
					min_length={4} 
					btnAction
					btnActionType="Primary"
					btnActionProps={{
						title:"Guardar PIN de acceso",
						icon:<IconMCI
								name="content-save-outline"
								size={15}
								color={Colors.primaryTextBasic}
								style={{marginRight:10}}
							/>,
					}}
					onPressActionButton={(pin) => {
						this.setState({pin, verifiedPin:true});
					}}
					resetOnPressActionButton
					textPinProps={{
						color:"#000"
					}}
				/>
		}

	    return (
	    	<View style={styles.container}>
		        <ScrollView style={styles.container}>
		        	<View style={combineStyles([{
					    alignItems: 'center',
					    marginHorizontal: 50
					  }, styles.paragraph])}>
				      	<Text style={combineStyles([{textAlign:"center"}, styles.paragraph])}>
				      		{this.state.verifiedPin?"Ingrese nuevamente su PIN":"Ingrese su nuevo PIN de acceso"}
			      		</Text>
					</View>
			    </ScrollView>
				{pinComponent}
		    </View>
	    );
	}
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPinScreen);