import React, { Fragment } from "react";
import { withRenderer } from "../../felaContext";
import { fieldRule, labelRule } from "./Field.rule";

function Field({ label, type = 'text', value, onChange, onBlur, renderer, renderRule }) {
  const labelClassName = renderRule(renderer, labelRule);
  const fieldClassName = renderRule(renderer, fieldRule);

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
