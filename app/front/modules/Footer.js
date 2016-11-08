import React, {Component, PropTypes,} from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<div className="content has-text-centered">
						<p>
							<strong>My react redux</strong> by siriwatknp
						</p>
					</div>
				</div>	
			</footer>
		);
	}
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default (Footer);
