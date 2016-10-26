if (process.env.FOO !== 'bar') {
  throw new Error("env variable is not provided");
}

if (process.env.TEST_ENV !== "overridden" || process.env.TEST_ENV2 !== "envvar") {
  throw new Error("environment variable is overridden");
}
