import React, {PureComponent} from 'react';
import FelaContext from './felaContext';

export default function withRenderer(Component) {
  return class extends PureComponent {
    static displayName = `withRenderer(${Component.displayName})`;

    renderWrapped = renderer => {
      return <Component renderer={renderer} />;
    };

    render() {
      return (
          <FelaContext.Consumer>
            {this.renderWrapped}
          </FelaContext.Consumer>
      )
    }
  };
}
