import React, {Component, PropTypes,} from 'react';

class Header extends Component {
	render() {
		return (
			<nav className="nav">
				<div className="nav-left">
					<p className="nav-item title">Logo</p>
				</div>
				<div className="nav-center nav-menu">
					<a className="nav-item" href="#">
						Home
					</a>
					<a className="nav-item" href="#">
						Documentation
					</a>
					<a className="nav-item" href="#">
						Blog
					</a>
				</div>
				<div className="nav-right">
					<span className="nav-item">
						<a className="button is-primary" href="#">
							<span className="icon">
								<i className="fa fa-sign-in"/>
							</span>
							<span>Log in</span>
						</a>
					</span>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {};
Header.defaultProps = {};

export default (Header);
