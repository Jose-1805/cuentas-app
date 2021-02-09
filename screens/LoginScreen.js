import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actLogin } from '../redux/app/actions';
import { Btn } from '../components/elements/Elements';
import Colors from '../constants/Colors';
import { styles, combineStyles} from '../constants/Styles';
import Pin from '../components/Pin';
import DB from '../constants/DB';

class LoginScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  		pin:false
	  };
	}

	componentWillMount() {
	    DB.getUser()
	    .then(
	    	(response) => {
	    		if(response.rows.length){
	    			this.setState({
	    				pin:response.rows._array[0].pin
	    			})
	    		}else{
	    			this.props.navigation.navigate("newUser");
	    		}
	    	})
	}

	render(){
		let pinComponent = <Text style={combineStyles([{textAlign:"center"}, styles.paragraph])}>
				      		Consultando datos ...
			      		</Text>
  		if(this.state.pin){
  			pinComponent = <Pin 
					btnSize={70} 
					max_lenth={6} 
					min_length={4} 
					valid={this.state.pin}
					onValidSuccess={() => {
						DB.authenticate()
						.then(() => {
							this.props.navigation.navigate("Main");
						})
					}}
					textPinProps={{
						color:"#000"
					}}

				/>
  		}

	    return (
	    	<View style={styles.container}>
		        <ScrollView style={styles.container}>
		        	<View style={{
					    alignItems: 'center',
					    marginHorizontal: 50
					  }}>
				      	<Text style={combineStyles([{textAlign:"center"}, styles.paragraph])}>
				      		Ingrese su pin de seguridad para acceder
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
	return {
		loginSend:() => {
			return dispatch(actLogin());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);