import React, { PureComponent, Fragment } from "react";
import Button from "../components/Button/Button";
import { FelaProvider } from "../felaContext";
import {
  clearFixRule,
  controlsPanelRule,
  cssResultRule,
  fieldRule,
  labelRule,
  rootRule
} from "./App.rule";
import { createRenderer } from "fela";
import monolithic from "fela-monolithic";
import memoize from "memoize-one";
import { render as renderFela, renderToMarkup } from "fela-dom";
import Editor from "../components/Editor/Editor";
import Field from "../components/Field/Field";
import renderRule from './../renderRule';
import {resetCache} from "../renderRule";

export class App extends PureComponent {
  state = {
    caption: "Click me!",
    resultCaption: "Click me!",
    color: "BlueViolet",
    resultColor: "BlueViolet",
    buttonDisabled: false,
    prettySelectors: true,
    monolithic: false,
    resultCss: "",
    renderer: createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true
        })
      ]
    })
  };

  static recalcRenderer = memoize((enableMonolithic, prettySelectors) => {
    if (enableMonolithic) {
      return createRenderer({
        enhancers: [
          monolithic({
            prettySelectors,
          })
        ]
      });
    } else {
      return createRenderer();
    }
  });

  static getDerivedStateFromProps = (props, state) => {
    return {
      ...state,
      renderer: App.recalcRenderer(state.monolithic, state.prettySelectors)
    };
  };

  onChangeMonolithic = ({ target: { checked: monolithic } }) =>
    this.setState({ monolithic });
  onChangePrettySelectors = ({ target: { checked: prettySelectors } }) =>
    this.setState({ prettySelectors });

  onChangeColor = ({ target: { value: color } }) => this.setState({ color });
  onChangeCaption = ({ target: { value: caption } }) =>
    this.setState({ caption });

  onBlurColor = () => this.setState({ resultColor: this.state.color });
  onBlurCaption = () => this.setState({ resultCaption: this.state.caption });

  onChangeDisabled = ({ target: { checked: buttonDisabled } }) =>
    this.setState({ buttonDisabled });

  componentDidMount() {
    this.updateStyles();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateStyles(prevState);
  }

  updateStyles(prevState = {}) {
    const currentCss = renderToMarkup(this.state.renderer);
    if (this.resultCss !== currentCss) {
      if (prevState.renderer !== this.state.renderer) {
        resetCache();
        renderFela(this.state.renderer);
      }
      this.setState({ resultCss: currentCss });
    }
  }

  render() {
    const { renderer } = this.state;
    const controlsPanelClassName = renderRule(renderer, controlsPanelRule);
    const cssResultClassName = renderRule(renderer, cssResultRule);
    const rootClassName = renderRule(renderer, rootRule);

    return (
      <FelaProvider value={renderer}>
        <Fragment>
          <div className={rootClassName}>
            <div className={controlsPanelClassName}>
              <h3>Settings</h3>
              <Field
                label="Monolithic"
                type="checkbox"
                value={this.state.monolithic}
                onChange={this.onChangeMonolithic}
              />
              {this.state.monolithic && (
                  <Field
                      label="Pretty Selectors"
                      type="checkbox"
                      value={this.state.prettySelectors}
                      onChange={this.onChangePrettySelectors}
                  />
              )}
              <Field
                  label="Caption"
                  value={this.state.caption}
                  onChange={this.onChangeCaption}
                  onBlur={this.onBlurCaption}
              />
              <br />
              <Field
                  label="Color"
                  value={this.state.color}
                  onChange={this.onChangeColor}
                  onBlur={this.onBlurColor}
              />
              <Field
                  label="Disable"
                  type="checkbox"
                  value={this.state.buttonDisabled}
                  onChange={this.onChangeDisabled}
              />
              <div>Result</div>
              <Button
                color={this.state.resultColor}
                caption={this.state.resultCaption}
                disabled={this.state.buttonDisabled}
              />
            </div>
            <div className={cssResultClassName}>
              <h3>Result css</h3>
              <Editor
                width={600}
                height={window.innerHeight - 90}
                value={this.state.resultCss}
              />
            </div>
          </div>
        </Fragment>
      </FelaProvider>
    );
  }
}

export default App;
