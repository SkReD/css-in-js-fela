import React from "react";

const { Provider, Consumer } = React.createContext("fela");

export const FelaProvider = Provider;
export function withRenderer(Component) {
  const WrappedComponent = (props) => (
      <Consumer>
        {renderer => <Component {...props} renderer={renderer} />}
      </Consumer>
  );

  WrappedComponent.displayName = `withRenderer(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
