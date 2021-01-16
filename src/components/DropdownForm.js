/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function DropdownForm({label, name, customRef, isInvalid, Options}) {
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        ref={customRef}
        isInvalid={isInvalid}
      >
        {Options}
      </Form.Control>
    </Form.Group>
  );
}

DropdownForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  customRef: PropTypes.object,
  isInvalid: PropTypes.bool,
  Options: PropTypes.object,
};

function MandatoryChoiceOptions({data, optionName}) {
  const choices = data['dropdown_choice'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [<option key={`${keyName}`} value=""></option>];

  choices
      .filter((choice) => choice ? true : false)
      .map((choice, index) => {
        const option = (
          <option key={`${keyName}-${index}`} value={index}>
            {choice}
          </option>
        );
        options.push(option);
      });

  return options;
}

MandatoryChoiceOptions.propTypes = {
  data: PropTypes.object,
  optionName: PropTypes.string,
};

function OptionalChoiceOptions({data, optionName}) {
  const choices = data['dropdown_choice'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [<option key={`${keyName}-0`} value="0"></option>];

  choices
      .filter((choice) => choice ? true : false)
      .map((choice, index) => {
        const option = (
          <option key={`${keyName}-${index + 1}`} value={index + 1}>
            {choice}
          </option>
        );
        options.push(option);
      });

  return options;
}
OptionalChoiceOptions.propTypes = {
  data: PropTypes.object,
  optionName: PropTypes.string,
};


function RangeOptions({
  data,
  optionName,
  choicePrefix='',
  choiceSuffix='',
  step=1,
}) {
  const [min, max] = data['dropdown_range'][optionName];
  const keyName = optionName.replace(/_/g, '-');
  const options = [<option key={`${keyName}-0`} value=""></option>];

  range(min, max, step).map((choice, index) => {
    const option = (
      <option key={`${keyName}-${index + 1}`} value={choice}>
        {choicePrefix + choice + choiceSuffix}
      </option>
    );
    options.push(option);
  });

  return options;
}

RangeOptions.propTypes = {
  data: PropTypes.object,
  optionName: PropTypes.string,
  choiceSuffix: PropTypes.string,
  step: PropTypes.number,
};

function FloorNumberOptions({data}) {
  const [min, max] = data['dropdown_range']['floor_number'];
  const keyName = 'floor-number';
  const options = [<option key={`${keyName}-0`} value=""></option>];

  range(min, max)
      .filter((val) => val !== 0 ? true : false)
      .map((val, index) => {
        let floorNumber = '';

        if (val < 0) {
          floorNumber = `地下${Math.abs(val)}階部分`;
        } else {
          floorNumber = `地上${val}階部分`;
        }

        const option = (
          <option key={`${keyName}-${index + 1}`} value={val}>
            {floorNumber}
          </option>
        );

        options.push(option);
      });

  return options;
};

FloorNumberOptions.propTypes = {
  data: PropTypes.object,
};

function range(start, stop, step=1) {
  return Array.from(
      {length: (stop - start) / step + 1},
      (_, i) => start + (i * step),
  );
}

export default DropdownForm;
export {
  MandatoryChoiceOptions,
  OptionalChoiceOptions,
  RangeOptions,
  FloorNumberOptions,
};
