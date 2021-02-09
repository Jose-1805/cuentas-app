import React, { Component, PropTypes } from 'react';

import { Text, View, TextInput, Switch } from 'react-native';
import { Btn } from '../components/elements/Elements';
import { styles, combineStyles } from '../constants/Styles';
import Colors from '../constants/Colors';

class FormIncome extends Component {
    constructor(props) {
        super(props);

        const name = ("income" in props && props.income.name)?props.income.name:"";
        const value = ("income" in props && props.income.value)?props.income.value:"";
        const state = ("income" in props && props.income.state)?(props.income.state == 1?true:false):false;

        this.state = {
            name,
            value:value.toString(),
            state,
            formOk:false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.validForm();
    }

    componentWillReceiveProps(nextProps) {
        if("reset" in nextProps && nextProps.reset){
        	this.setState({
            	name:"",
            	value:"",
            	state:false,
            	formOk:false
        	});
        }
    }

    submit(){
    	if("onSubmit" in this.props){
    		if("income" in this.props){
	    		this.props.onSubmit(Object.assign({}, this.state, {id:this.props.income.id}));
    		}else{
	    		this.props.onSubmit(this.state);
	    	}
    	}
    }

    handleOnChange(name, value){
        this.setState({[name]:value}, this.validForm);
    }

    validForm(){
        const {name, value} = this.state;
        setTimeout(() => {
            let isValid = false;
            if(name.length > 0 && !isNaN(value) && parseFloat(value) > 0){
                isValid = true;
            }
            this.setState({formOk:isValid});
        }, 10);
    }

    render() {
    	const {name, value, state, formOk} = this.state;

        return (
            <View>
                <View style={{paddingBottom:12}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelCircle}>Nombre del ingreso</Text>
                            <TextInput
                                style={styles.inputCircle}
                                onChangeText={value_ => this.handleOnChange("name", value_)}
                                value={name}
                              />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelCircle}>Valor del ingreso</Text>
                            <TextInput
                                style={styles.inputCircle}
                                keyboardType="numeric"
                                onChangeText={value_ => this.handleOnChange("value", value_)}
                                value={value}
                              />
                        </View>

                        <View style={combineStyles([styles.inputContainer, {flexDirection:"row", alignItems:"center"}])}>
                            <Text style={combineStyles([styles.labelCircle, {flex:5}])}>
                                Active esta opción si el ingreso ya se hizo efectivo. Esto le indicará a la aplicación
                                que debe incluir el ingreso en los cálculos.
                            </Text>
                            <View style={{flex:1}}> 
                                <Switch
                                    thumbColor={state?Colors.primaryBackground:Colors.defaultBackground}
                                    onValueChange={value => this.handleOnChange("state", value)}
                                    value={state}
                                />
                            </View>
                        </View>
                </View>

            	<Btn.Save
                    circle
            		onPress={this.submit}
                    disabled={!formOk}
            	/>
            </View>
        );
    }
}

export default FormIncome;
