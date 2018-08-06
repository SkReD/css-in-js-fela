import React, { PureComponent } from "react";
import pt from "prop-types";
import { withRenderer } from "../../felaContext";
import { buttonRule } from "./Button.rule";

export class Button extends PureComponent {
  static propTypes = {
    caption: pt.string.isRequired,
    color: pt.string,
    disabled: pt.bool,
    renderer: pt.object.isRequired,
    renderRule: pt.func.isRequired
  };

  static defaultProps = {
    color: "gray",
    disabled: false
  };

  render() {
    const { caption, color, disabled, renderRule } = this.props;
    return (
      <button
        className={renderRule(buttonRule, {
          color,
          disabled
        })}
      >
        {caption}
      </button>
    );
  }
}

export default withRenderer(Button);
