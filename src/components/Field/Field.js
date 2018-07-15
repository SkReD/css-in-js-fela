import React, { Fragment } from "react";
import { withRenderer } from "../../felaContext";
import { fieldRule, labelRule } from "./Field.rule";

function Field({ label, type = 'text', value, onChange, onBlur, renderer }) {
  const labelClassName = renderer.renderRule(labelRule);
  const fieldClassName = renderer.renderRule(fieldRule);

  return (
    <Fragment>
      <label className={labelClassName}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className={fieldClassName}
        {...(type === "checkbox" ? { checked: value } : { value })}
      />
    </Fragment>
  );
}

export default withRenderer(Field);
