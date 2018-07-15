import React, { PureComponent } from "react";
import ace from 'ace-builds/src-noconflict/ace';
import { Mode as CssMode } from 'ace-builds/src-noconflict/mode-css';
import { beautify } from 'ace-builds/src-noconflict/ext-beautify';
import pt from "prop-types";

export default class Editor extends PureComponent {
  static propTypes = {
    value: pt.string,
    width: pt.number.isRequired,
    height: pt.number.isRequired
  };

  componentDidMount() {
    this.editor = ace.edit("editor");
    this.editor.session.setMode(new CssMode());
    this.editor.renderer.setShowGutter(false);
  }

  componentWillUnmount() {
    this.editor.destroy();
    this.editor.container.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.editor.setValue(this.props.value);
      beautify(this.editor.session);
    }
  }

  render() {
    const { width, height } = this.props;
    return (
      <div style={{ position: "relative", width, height }} id={"editor"} />
    );
  }
}
