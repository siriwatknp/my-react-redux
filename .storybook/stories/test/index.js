import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import {withKnobs, text, boolean, number, object, select} from '@kadira/storybook-addon-knobs';

const stories = storiesOf('Test',module);
stories.addDecorator(withKnobs);

stories.add('Button',() => {
	const label = text('label','label');
	return <button>{label}</button>
});