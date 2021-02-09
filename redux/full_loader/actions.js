import types from './const';

const actOpenFL = (props) => {
	return {
		type:types.OPEN,
		props
	}
}

const actCloseFL = () => {
	return {
		type:types.CLOSE
	}
}

export {
	actOpenFL,
	actCloseFL
}