import React, { Component, PropTypes } from 'react';

import { Button } from 'react-native-elements';

import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/EvilIcons';

import Colors from '../../../constants/Colors';

const iconSizeMCI = 13;
const iconSizeFA = 11;
const iconSizeI = 15;
const iconSizeMI = 15;
const iconSizeE = 17;

const getIconColor = (props, color) =>  {
	let iconColor = Colors[color+"TextBasic"];

	if("type" in props && props.type == "outline")
		iconColor = Colors[color+"Text"];

	return iconColor;
}

const getStylesButton = (props, color) =>  {
	let titleStyle = {color:Colors[color+"TextBasic"], fontSize:13};
	if("type" in props && props.type == "outline")
		titleStyle.color = Colors[color+"Text"];

	let borderRadius = 3;

	if("circle" in props)
		borderRadius = 50;

	let buttonStyle = {borderRadius};
	
	if("title" in props){
		buttonStyle.paddingLeft = 30;
		buttonStyle.paddingRight = 30;
	}

	if("type" in props && props.type == "outline")
		buttonStyle.borderColor = Colors[color+"Background"];
	else
		buttonStyle.backgroundColor = Colors[color+"Background"];

	if("buttonStyle" in props){
		buttonStyle = Object.assign({}, buttonStyle, props.buttonStyle);
	}

	if("titleStyle" in props){
		titleStyle = Object.assign({}, titleStyle, props.titleStyle);
	}

	return {
		titleStyle,
		buttonStyle
	};
}

const Primary = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "primary")}
        />
    );
}

const Info = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "info")}
        />
    );
}

const Success = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "success")}
        />
    );
}

const Danger = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "danger")}
        />
    );
}

const Warning = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "warning")}
        />
    );
}

const Default = (props) => {   
    return (
        <Button 
        	{...props} 
        	{...getStylesButton(props, "default")}
        />
    );
}

const Save = (props) => {                        
    return (
    	<Primary 
    		{...props}
    		icon={
				<IconMCI
					name="content-save-outline"
					size={iconSizeMCI}
					color={getIconColor(props, "primary")}
					style={{marginRight:10}}
				/>
			}
        	title="Guardar"
		/>
    );
}

const SignIn = (props) => {                        
    return (
    	<Primary 
    		{...props}
    		icon={
				<IconFA
					name="sign-in"
					size={iconSizeFA}
					color={getIconColor(props, "primary")}
					style={{marginRight:10}}
				/>
			}
        	title="Ingresar"
		/>
    );
}

const Close = (props) => {                        
    return (
    	<Default
    		{...props}
    		icon={
				<IconE
					name="close"
					size={iconSizeE}
					color={getIconColor(props, "default")}
					style={{marginRight:10}}
				/>
			}
        	title="Cerrar"
		/>
    );
}

const Update = (props) => {
    return (
        <Primary 
    		{...props}
    		icon={
				<IconMCI
					name="update"
					size={iconSizeMCI}
					color={getIconColor(props, "primary")}
					style={{marginRight:10}}
				/>
			}
        	title="Actualizar"
		/>
    );
}

const UpdateOnlyIcon = (props) => {
    return (
        <Primary 
    		{...props}
    		icon={
				<IconMCI
					name="update"
					size={iconSizeMCI}
					color={getIconColor(props, "primary")}
				/>
			}
		/>
    );
}

const Delete = (props) => {
    return (
        <Danger 
    		{...props}
    		icon={
				<IconFA
					name="trash-o"
					size={iconSizeFA}
					color={getIconColor(props, "danger")}
					style={{marginRight:10}}
				/>
			}
        	title="Eliminar"
		/>
    );
}

const Add = (props) => {
    return (
        <Primary 
    		{...props}
    		icon={
				<IconMI
					name="add"
					size={iconSizeMI}
					color={getIconColor(props, "primary")}
					style={{marginRight:10}}
				/>
			}
        	title="Agregar"
		/>
    );
}

const Accept = (props) => {
    return (
        <Success 
    		{...props}
    		icon={
				<IconMI
					name="check"
					size={iconSizeMI}
					color={getIconColor(props, "success")}
					style={{marginRight:10}}
				/>
			}
        	title="Aceptar"
		/>
    );
}

const Cancel = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="close"
					size={iconSizeE}
					color={getIconColor(props, "default")}
					style={{marginRight:10}}
				/>
			}
        	title="Cancelar"
		/>
    );
}

const Yes = (props) => {
    return (
        <Success 
    		{...props}
    		icon={
				<IconMI
					name="check"
					size={iconSizeMI}
					color={getIconColor(props, "success")}
					style={{marginRight:10}}
				/>
			}
        	title="Sí"
		/>
    );
}

const No = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="close"
					size={iconSizeE}
					color={getIconColor(props, "default")}
					style={{marginRight:10}}
				/>
			}
        	title="No"
		/>
    );
}

const Lock = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="lock"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
			title=" Bloquear"
		/>
    );
}

const Unlock = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="unlock"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
			title=" Desbloquear"
		/>
    );
}

const LockOnlyIcon = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="lock"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
		/>
    );
}

const UnlockOnlyIcon = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="unlock"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
		/>
    );
}

const Send = (props) => {
    return (
        <Primary 
    		{...props}
    		icon={
				<IconFA
					name="send-o"
					size={iconSizeFA}
					color={getIconColor(props, "primary")}
					style={{marginRight:10}}
				/>
			}
        	title="Enviar"
		/>
    );
}

const Next = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="chevron-right"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
			iconRight={true}
			title="Siguiente"
		/>
    );
}

const Previous = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconE
					name="chevron-left"
					size={iconSizeE}
					color={getIconColor(props, "default")}
				/>
			}
			title="Anterior"
		/>
    );
}

const More = (props) => {
    return (
        <Primary
    		{...props}
    		icon={
				<IconE
					name="eye"
					size={iconSizeE}
					color={getIconColor(props, "primary")}
				/>
			}
			title=" Ver más"
		/>
    );
}

const Return = (props) => {
    return (
        <Default
    		{...props}
    		icon={
				<IconMI
					name="keyboard-return"
					size={iconSizeMI}
					color={getIconColor(props, "default")}
				/>
			}
			title="Regresar"
		/>
    );
}

class Btn extends Component {
	static Primary = Primary;
	static Info = Info;
	static Success = Success;
	static Danger = Danger;
	static Warning = Warning;
	static Default = Default;

	static Save = Save;
	static SignIn = SignIn;
	static Close = Close;
    static Update = Update;
    static UpdateOnlyIcon = UpdateOnlyIcon;
    static Delete = Delete;
    static Add = Add;
    static Accept = Accept;
    static Cancel = Cancel;
    static Yes = Yes;
    static No = No;
    static Lock = Lock;
    static Unlock = Unlock;
    static LockOnlyIcon = LockOnlyIcon;
    static UnlockOnlyIcon = UnlockOnlyIcon;
    static Send = Send;
    static Next = Next;
    static Previous = Previous;
    static More = More;
    static Return = Return;

    render() {
        return (
    		<Button {...this.props}/>        
        );
    }
}

export default Btn;
