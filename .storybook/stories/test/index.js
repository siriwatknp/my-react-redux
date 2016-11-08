import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import {withKnobs, text, boolean, number, object, select} from '@kadira/storybook-addon-knobs';
import '../../../static/bulma-0.2.3/css/bulma.css';
import '../../../static/font-awesome-4.6.3/css/font-awesome.css';

const stories = storiesOf('Test',module);
stories.addDecorator(withKnobs);

stories.add('Button',() => {
	const label = text('label','label');
	return <button>{label}</button>
});

stories.add('Bulma fontAwesome',() => {
	return(
		<a className="button">
			<span className="icon">
				<i className="fa fa-github"/>
			</span>
			<span>GitHub</span>
		</a>
	)
});