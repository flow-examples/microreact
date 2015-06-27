_.each(BabelTests.Transpile.groups, function (group) {
  if (! (group.features && group.features.length)) {
    throw new Error("Non-empty `features` array required in group");
  }
  _.each(group.cases, function (c) {
    Tinytest.add("babel - transpilation - " + group.groupName + " - " + c.name,
                 function (test) {
                   test.equal(
                     Babel.transformMeteor(c.input, {
                       whitelist: group.features
                     }).code,
                     c.expected);
                 });
  });
});
