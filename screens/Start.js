import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import {actUpdateAccountData} from '../redux/app/actions';

import DB from '../constants/DB';


class Start extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        DB.init();

        DB.getUser()
            .then(
                (response) => {
                    if(response.rows.length){
                        if(response.rows._array[0].auth == 1){
                            this.props.navigation.navigate("Main");
                        }else{
                            this.props.navigation.navigate("Auth");
                        }
                    }else{
                        this.props.navigation.navigate("newUser");
                    }
                }, 
                () => {
                    console.log("FAILS");
                })

        this.props.loadData();
    }

    render() {
        return <Text>Iniciando...</Text>
    }
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
        loadData:() => {
            return dispatch(actUpdateAccountData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);
