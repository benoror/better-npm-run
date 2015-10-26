

if (process.env.TEST !== "1") {
    throw new Error(".env file is not loaded");
}

if (process.env.FOO !== "bar") {
    throw new Error("env params are missing")
}