import React, { Component, PropTypes } from 'react';

import { View, ActivityIndicator, Text } from 'react-native';

import { connect } from 'react-redux';

class FullLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    	const { fullLoader } = this.props;

    	let fullLoaderRender = <View></View>

    	if(fullLoader.showFL){
    		const styles = {
    			backgroundColor:fullLoader.backgroundColorFL,
	            flex:1,
	            flexDirection:"column",
	            justifyContent:"center",
	            position:"absolute",
	            width:"100%", 
	            height:"100%", 
	            elevation: 100,
	            opacity: fullLoader.opacityFL,
    		}

    		fullLoaderRender = <View style={styles}>
		        <ActivityIndicator size="large" color={fullLoader.colorFL} />
		        <Text style={{textAlign:"center", color:fullLoader.textColorFL}}>{fullLoader.textFL}</Text>
	        </View>
    	}

        return fullLoaderRender
    }
}

const mapStateToProps = (state) => {
	return {
		fullLoader:state.fullLoader
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FullLoader);
