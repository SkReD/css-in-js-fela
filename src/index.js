import {createRenderer} from 'fela';
import {render} from 'react-dom'
import React, {Fragment} from 'react';

import FelaContext from './felaContext';

const renderer = createRenderer();

const className = renderer.renderRule(props => ({
  fontSize: '13px',
  color: props.color,
  textDecoration: props.textDecoration
}), {
  color: 'red',
  textDecoration: 'underline'
});

render(
    <FelaContext.Provider renderer={renderer}>
      <Fragment>
        <div className={className}>Primary</div>
      </Fragment>
    </FelaContext.Provider>,
    document.getElementById('app')
);

module.hot.accept();
