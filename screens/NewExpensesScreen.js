import React, { Component, PropTypes } from 'react';

import { connect } from "react-redux";
import { actUpdateAccountData } from "../redux/app/actions";
import { actOpenFL, actCloseFL } from '../redux/full_loader/actions';

import { ScrollView, ToastAndroid, View } from 'react-native';
import { styles } from '../constants/Styles';
import FormExpenses from '../components/FormExpenses';
import DB from '../constants/DB';

class NewExpensesScreen extends Component {
    static navigationOptions = {
        title:"Nuevo egreso"
    }

    constructor(props) {
        super(props);

        this.state = {
            resetForm:false
        }

        this.save = this.save.bind(this);        
    }

    save(data){
        this.props.openFullLoader("Guardando egreso");
        DB.insertExpenses(data)
        .then(
            (result) => {
                this.props.updateAccountData();
                this.props.closeFullLoader();
                ToastAndroid.show('Egreso registrado con éxito', ToastAndroid.LONG);

                this.setState(() => {
                    return {
                        resetForm:true,
                    }
                }, () => {
                    this.setState({resetForm:false});
                })
            },
            (error) => {
                console.log(error)
            }
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FormExpenses
                        onSubmit={this.save}
                        reset={this.state.resetForm}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAccountData:() => {
            dispatch(actUpdateAccountData());
        },
        openFullLoader:(message) => {
            return dispatch(actOpenFL({textFL:message}));
        },
        closeFullLoader:() => {
            return dispatch(actCloseFL());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExpensesScreen);
