const choiceValueToArray = (length, ref) => {
  return [...Array(length)].map((_, index) => {
    return index === parseInt(ref.current.value) ? 1 : 0;
  });
};

export {choiceValueToArray};
