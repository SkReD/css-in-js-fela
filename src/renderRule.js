const Map = require('es6-map');

let cache = new Map();

export const resetCache = () => {
  cache = new Map();
};

export default function renderRule(renderer, rule, props) {
  const propsKey = !!props ? JSON.stringify(props) : 'def';
  let ruleCache = cache.get(rule);
  let resultClassName;

  if (ruleCache) {
    resultClassName = ruleCache[propsKey];
  }

  if (resultClassName) {
    return resultClassName;
  }

  resultClassName = renderer.renderRule(rule, props);
  if (!ruleCache) {
    ruleCache = {};
    cache.set(rule, ruleCache);
  }

  ruleCache[propsKey] = resultClassName;

  return resultClassName;
}
