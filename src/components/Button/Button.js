import React, { PureComponent } from "react";
import pt from "prop-types";
import { withRenderer } from "../../felaContext";
import { buttonRule } from "./Button.rule";

export class Button extends PureComponent {
  static propTypes = {
    caption: pt.string.isRequired,
    color: pt.string,
    disabled: pt.bool,
    renderer: pt.object.isRequired
  };

  static defaultProps = {
    color: "gray",
    disabled: false
  };

  render() {
    const { color, disabled } = this.props;
    return (
      <button
        className={this.props.renderer.renderRule(buttonRule, {
          color,
          disabled
        })}
      >
        {this.props.caption}
      </button>
    );
  }
}

export default withRenderer(Button);
