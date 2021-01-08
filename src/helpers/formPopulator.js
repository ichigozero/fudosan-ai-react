import React from 'react';

import Form from 'react-bootstrap/Form';

const generateCheckboxes = (data, checkboxName) => {
  const labels = data['checkbox'][checkboxName];
  const checkboxes = [];

  labels.map((label, index) => {
    const checkbox = (
      <Form.Check
        inline
        type="checkbox"
        name={checkboxName.replace(/_/g, '-')}
        label={label}
        value={index}
      />
    );
    checkboxes.push(checkbox);
  });

  return checkboxes;
};

const populateChoiceOptions = (data, optionName) => {
  const choices = data['dropdown_choice'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [<option key={`${keyName}-0`} value=""></option>];

  choices
      .filter((choice) => choice ? true : false)
      .map((choice, index) => {
        const option = (
          <option key={`${keyName}-${index + 1}`} value={choice}>
            {choice}
          </option>
        );
        options.push(option);
      });

  return options;
};

const populateRangeOptions = (data, optionName, choiceSuffix='', step=1) => {
  const [min, max] = data['dropdown_range'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [<option key={`${keyName}-0`} value=""></option>];

  range(min, max, step).map((choice, index) => {
    const option = (
      <option key={`${keyName}-${index + 1}`} value={choice}>
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

export {populateChoiceOptions, generateCheckboxes, populateRangeOptions};
