import React, { Component, PropTypes } from 'react';
import { Btn } from '../components/elements/Elements'
import { View, Text, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

class Pin extends Component {
	isMount = false;
    constructor(props) {
        super(props);

        this.btnSize = "btnSize" in this.props?this.props.btnSize:30;

        this.styles = StyleSheet.create({
        	contenedor:{
        		flex:3,
        		flexDirection:"column",
        		//backgroundColor:"#fff",
        		padding:10
        	},
        	wrapperBtn:{
        		flex:1, 
        		justifyContent: "center", 
        		alignItems:"center"
        	},
			btn: {
				paddingLeft:15,
				paddingRight:18,
				width:this.btnSize, 
				height:this.btnSize,
				borderRadius:10
			},
			btnTitle: {
				fontSize:this.btnSize*0.5,
			},
			row:{
				flex:1, 
				flexDirection:"row"
			},
			text:{
				color:"#fff",
				textAlign:"center",
				fontSize:this.btnSize*0.6
			}
		});

		this.state = {
			textPin:"",
			textPinRender:"",
			btnDisabled:true
		}

		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.getButtonAction = this.getButtonAction.bind(this);
		this.handleValidSuccess = this.handleValidSuccess.bind(this);
		this.onPressActionButton = this.onPressActionButton.bind(this);
    }

    componentWillMount() {
        this.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    handleValidSuccess(){
    	if("onValidSuccess" in this.props){
    		this.props.onValidSuccess();
    	}
    }

    onPressActionButton(){
    	if("onPressActionButton" in this.props){
    		this.props.onPressActionButton(this.state.textPin);
    		if(this.isMount && "resetOnPressActionButton" in this.props && this.props.resetOnPressActionButton){
	    		this.setState({
	    			textPin:"",
					textPinRender:"",
					btnDisabled:true
	    		})
	    	}
    	}
    }

    handleBtnClick(value){
    	const max_length = "max_length" in this.props?this.props.max_length:6;
    	const min_length = "min_length" in this.props?this.props.min_length:1;
    	if(this.state.textPin.length < max_length){
	    	this.setState((oldState) => {
	    		let pinRender = (oldState.textPinRender+" *").trim();

	    		const newPin = oldState.textPin+""+value;

	    		//si se solicita validación
	    		if("valid" in this.props){
	    			if(this.props.valid == newPin){
	    				this.handleValidSuccess();
	    			}
	    		}

	    		const btnDisabledState = (newPin.length >= min_length && newPin.length <= max_length)?false:true;
	    		return {
	    			textPin: newPin,
	    			textPinRender: pinRender,
	    			btnDisabled:btnDisabledState
	    		}
	    	})
	    }
    }

    handleClear(){
    	this.setState({
    		textPin:"",
			textPinRender:"",
			btnDisabled:true
    	})
    }

    handleDelete(){
    	this.setState((oldState) => {
    		const max_length = "max_length" in this.props?this.props.max_length:6;
    		const min_length = "min_length" in this.props?this.props.min_length:1;
    		const btnDisabledState = ((oldState.textPin.length-1) >= min_length && (oldState.textPin.length-1) <= max_length)?false:true;
    		return {
    			textPin:oldState.textPin.substring(0, (oldState.textPin.length-1)),
				textPinRender:oldState.textPinRender.substring(0, (oldState.textPinRender.length-2)),
				btnDisabled:btnDisabledState
    		}
    	})
    }

    getButtonAction(){
    	let btnAction = <View/>;

    	if("btnAction" in this.props && this.props.btnAction){
    		const propsBtn = Object.assign({}, ("btnActionProps" in this.props?this.props.btnActionProps:{}), {disabled:this.state.btnDisabled, onPress:this.onPressActionButton});
    		btnAction = <Btn.Default {...propsBtn} />

    		if("btnActionType" in this.props){
    			switch (this.props.btnActionType) {
    				case "Primary":
						btnAction = <Btn.Primary {...propsBtn} />    					
    					break;
    				case "Success":
						btnAction = <Btn.Success {...propsBtn} />    					
    					break;
    				case "Warning":
						btnAction = <Btn.Warning {...propsBtn} />    					
    					break;
    				case "Danger":
						btnAction = <Btn.Danger {...propsBtn} />    					
    					break;
    				case "Info":
						btnAction = <Btn.Info {...propsBtn} />    					
    					break;
    				default:
    					break;
    			}
    		}
    	}

    	return btnAction;
    }

    render() {
    	const stylesText = Object.assign({}, this.styles.text, ("textPinProps" in this.props?this.props.textPinProps:{}));
        return (
        	<View style={{flex:3, flexDirection:"column"}}>
        		<View>
        			<Text style={stylesText}>{this.state.textPinRender}</Text>
        		</View>
	            <View style={this.styles.contenedor}>
	            	<View style={this.styles.row}>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="1" onPress={() => this.handleBtnClick(1)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="2" onPress={() => this.handleBtnClick(2)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="3" onPress={() => this.handleBtnClick(3)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            	</View>
	            	<View style={this.styles.row}>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="4" onPress={() => this.handleBtnClick(4)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="5" onPress={() => this.handleBtnClick(5)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="6" onPress={() => this.handleBtnClick(6)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            	</View>
	            	<View style={this.styles.row}>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="7" onPress={() => this.handleBtnClick(7)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="8" onPress={() => this.handleBtnClick(8)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="9" onPress={() => this.handleBtnClick(9)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>
	            	</View>
	            	<View style={this.styles.row}>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Danger 
	        					type="outline" 
	        					onPress={() => this.handleBtnClick(0)} 
	        					buttonStyle={this.styles.btn}
	        					icon={
									<IconFA
										name="trash-o"
										size={this.btnSize * 0.3}
										color={Colors.dangerText}
									/>
								}
								onPress={this.handleClear}
	        				/>
	            		</View>
	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default type="outline" title="0" onPress={() => this.handleBtnClick(0)} buttonStyle={this.styles.btn} titleStyle={this.styles.btnTitle}/>
	            		</View>

	            		<View style={this.styles.wrapperBtn}>
	        				<Btn.Default 
	        					type="outline" 
	        					onPress={() => this.handleBtnClick(0)} 
	        					buttonStyle={this.styles.btn}
	        					icon={
									<IconMI
										name="keyboard-return"
										size={this.btnSize * 0.5}
										color={Colors.defaultText}
									/>
								}
								onPress={this.handleDelete}
	        				/>
	            		</View>
	            	</View>
	            </View>
	            {this.getButtonAction()}
            </View>
        );
    }
}

export default Pin;
