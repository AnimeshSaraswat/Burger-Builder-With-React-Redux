import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckputSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends React.Component {
	state = {
		key: this.props.location.key
	}

	static getDerivedStateFromProps(newProps, newState) {
		if(newProps.key !== newState.key) {
			newProps.onInitPurchase();
		}
		return null;
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		let summary = <Redirect to="/" />
		if( this.props.ings ) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{ purchasedRedirect }
					<CheckoutSummary 
						ingredients={this.props.ings}
						checkoutCanceller={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler} />
						<Route 
							path={this.props.match.path + '/contact-data'}
							component={ContactData} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onInitPurchase: () => dispatch(actions.purchaseInit())
	}
}

export default connect( mapStateToProps, mapDispatchToProps )(Checkout);