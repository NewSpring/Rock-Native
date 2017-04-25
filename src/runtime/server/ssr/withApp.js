export default App =>
  (event, ctx) => ({
    path: event.path,
    ctx,
    context: {},
    App,
  });
