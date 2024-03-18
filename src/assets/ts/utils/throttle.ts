/**
 * Function throttling.
 * When an event is continuously triggered, ensure that it is executed only once within a certain time frame.
 * Timestamp + timer: If the last trigger occurs within the specified time interval, the timestamp will not execute that operation for this particular trigger.
 * The timer can accept this trigger; if there is no new trigger to clear the timer, it will delay execution.
 *
 * @param func Function
 * @param delay millisecond
 * @returns Function
 */
export function throttle(func: Function, delay = 1000) {
  let timer: number;
  let lastExecTime = 0;

  return function () {
    let current = Date.now();
    clearTimeout(timer);

    // Execute once at intervals
    if (current - lastExecTime > delay) {
      func();
      lastExecTime = current;
      // If the time interval is not met, set a timer to delay execution.
    } else {
      timer = setTimeout(func, delay);
    }
  };
}

/**
 * Ref throttling
 *
 * @param value any
 * @param delay millisecond
 * @returns customRef
 */
export function throttleRef(value: any, delay = 1000) {
  let timer: NodeJS.Timeout;
  let lastExecTime = 0;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        let current = Date.now();
        clearTimeout(timer);

        if (current - lastExecTime > delay) {
          value = newValue;
          trigger();
          lastExecTime = current;
        } else {
          timer = setTimeout(() => {
            value = newValue;
            trigger();
          }, delay);
        }
      },
    };
  });
}
