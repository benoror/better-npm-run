
if (process.env.TEST_ENV !== "TEST_VALUE") {
    throw new Error(".env file is not loaded");
}

if (process.env.FOO !== "bar") {
    throw new Error("env params are missing")
}

if (process.env.TEST_ENV_SUBSTITUTION !== "TEST_VALUE") {
    throw new Error('it should substitute in env');
}
