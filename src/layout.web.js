// @flow

export default ({ components }) => (
  <div>
    {components.map(({ ...rest, id, Component }) => (
      <Component key={id} {...rest} />
    ))}
  </div>
);
