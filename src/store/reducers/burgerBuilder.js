import * as actionsTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null, 
	totalPrice: 60,
	error: false
};
const INGREDIENT_PRICES = {
    salad: 40,
    cheese: 10,
    meat: 55,
    bacon: 45
}

const reducer = ( state = initialState, action ) => {
	switch(action.type) {
		case actionsTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionsTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
		case actionsTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				error: false,
				totalPrice: 60
			}
		case actionsTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			}
		default:
			return state;
	}
}

export default reducer;