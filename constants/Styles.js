import { StyleSheet } from 'react-native';
import Colors from './Colors';
import _ from 'lodash';

const textSize = 15;

const combineStyles = (stylesGroup) => {
	let combine = {};
	_.map(stylesGroup, (el, i) => {
		combine = Object.assign({}, combine, el);
	})

	return combine;
}

const styles = StyleSheet.create({
	title5:{
		fontSize:textSize * 5,
		fontWeight:"900"
	},
	title4:{
		fontSize:textSize * 4,
		fontWeight:"800"
	},
	title3:{
		fontSize:textSize * 3,
		fontWeight:"700"
	},
	title2:{
		fontSize:textSize * 2,
		fontWeight:"600"
	},
	title1:{
		fontSize:textSize * 1.4,
		fontWeight:"500"
	},
	paragraph:{
		fontSize:textSize
	},
	labelCircle:{
		fontSize:textSize*0.8,
		color:Colors.label,
		marginLeft:10
	},
	label:{
		fontSize:textSize*0.8,
		color:Colors.label,
	},
	
	container:{
		flex:1,
		padding:30,
	},
	containerFluid:{
		flex:1
	},
	card:{
		borderRadius:10,
		backgroundColor:"#fff",
		borderColor:"#eeeeee",
		borderWidth:1,
		padding:10,
		shadowColor:"#000"
	},

	textSize,
	input:{
		height: 40, 
		borderColor: Colors.label, 
		borderWidth: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 3
	},
	inputCircle:{
		height: 40, 
		borderColor: Colors.label, 
		borderWidth: 1,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 50
	},
	inputContainer:{
		paddingTop:8,
		paddingBottom:8,
	},
	itemList: {
	    padding: 10,
	    borderBottomColor:Colors.borderList,
	    borderBottomWidth:1,
	}
})

export {
	styles,
	combineStyles
}