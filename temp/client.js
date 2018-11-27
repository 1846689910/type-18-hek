class TimeoutError extends Error{}
const err = new TimeoutError();
console.log(err instanceof TimeoutError);