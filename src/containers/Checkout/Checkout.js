import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckputSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends React.Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<div>
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
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients
	}
}

export default connect(mapStateToProps)(Checkout);