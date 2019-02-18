if (process.argv[2] === "--silent") {
	throw new Error('it should eat extra arguments');
}
if (process.argv[2] !== "--test") {
  throw new Error('it should accept params');
}
if (process.argv[3] !== 'param in quotes') {
  throw new Error('it should accept quoted params');
}
