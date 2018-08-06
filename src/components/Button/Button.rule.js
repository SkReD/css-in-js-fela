export function buttonRule({ color, disabled }) {
  return {
    display: "inline-block",
    color,
    cursor: disabled ? "default" : "pointer",
    ':active': {
      boxShadow: '1px 1px 4px inset',
      background: 'Silver'
    }
  };
}
