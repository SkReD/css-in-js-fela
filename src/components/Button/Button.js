import React, { PureComponent } from "react";
import pt from "prop-types";
import { withRenderer } from "../../felaContext";
import { buttonRule } from "./Button.rule";
import renderRule from "../../renderRule";

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
    const { caption, color, disabled, renderer, renderRule } = this.props;
    return (
      <button
        className={renderRule(renderer, buttonRule, {
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
