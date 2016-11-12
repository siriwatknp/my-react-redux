import React, {PropTypes} from 'react';
import Radium from 'radium';

const styles = {
	base:{
		color:'white',
		':hover':{
			cursor:'pointer'
		}
	},
	icon:{
		fontSize:18
	}
};

const ClickableIcon = ({onClick,className,style,...other}) => (
	<a onClick={onClick} style={[styles.base,style]} {...other}>
		<i className={className} style={styles.icon}/>
	</a>
);

ClickableIcon.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string.isRequired,
	style: PropTypes.object,
};

export default Radium(ClickableIcon)