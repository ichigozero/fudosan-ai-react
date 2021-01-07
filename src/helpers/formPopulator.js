import React from 'react';

const choiceOptions = (data, optionName) => {
  const choices = data['dropdown_choice'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [];

  choices.map((choice, index) => {
    const option = (
      <option key={`${keyName}-${index}`} value={choice}>
        {choice}
      </option>
    );
    options.push(option);
  });

  return options;
};

const rangeOptions = (data, optionName, choiceSuffix='', step=1) => {
  const [min, max] = data['dropdown_range'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [];

  range(min, max, step).map((choice, index) => {
    const option = (
      <option key={`${keyName}-${index}`} value={choice}>
        {choice + choiceSuffix}
      </option>
    );
    options.push(option);
  });

  return options;
};

const range = (start, stop, step=1) => {
  return Array.from(
      {length: (stop - start) / step + 1},
      (_, i) => start + (i * step),
  );
};

export {choiceOptions, rangeOptions};
