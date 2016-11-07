import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/test')
}

configure(loadStories, module);
