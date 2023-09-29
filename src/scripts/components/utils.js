function parseValue(value) {
  if (value === '') {
    return undefined;
  }

  try {
    const parsedValue = JSON.parse(value);

    return parsedValue;
  } catch (error) {
    return value;
  }
}

function on(name, func, options = {}, container) {
  container.addEventListener(
    name,
    (event) => {
      if (options.preventDefault) event.preventDefault();

      const { target, detail } = event;

      func({
        target,
        data: detail,
      });
    },
    options
  );
}

export { on, parseValue };
