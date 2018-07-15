export function buttonRule({ color, disabled }) {
  return {
    display: "inline-block",
    color,
    cursor: disabled ? "default" : "pointer"
  };
}
