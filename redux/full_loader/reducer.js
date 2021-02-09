import types from './const';

const initState = {
    showFL:false,
    colorFL:"#000",
    backgroundColorFL:"#fff",
    opacityFL:0.8,
    textColorFL:"#000",
    textFL:"Cargando"
}

const reducer = (state=initState, action) => {
    switch (action.type) {

        case types.OPEN:
            let newState = Object.assign({}, initState, action.props);
            newState.showFL = true;
            return newState;
            break;
        case types.CLOSE:
            return initState;
            break;
        default:
    }

    return initState;
}

export default reducer;
