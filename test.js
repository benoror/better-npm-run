

if (process.env.TEST_ENV !== "TEST_VALUE") {
    throw new Error(".env file is not loaded");
}

if (process.env.FOO !== "bar") {
    throw new Error("env params are missing")
}

if (process.argv[2] !== "--test") {
    throw new Error('it should accept params');
}
