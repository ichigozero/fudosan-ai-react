/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

function Checkboxes({
  data,
  checkboxName,
  customRefs,
  sharedOptions,
  onChangeHandler,
}) {
  const labels = data['checkbox'][checkboxName];
  const keyName = checkboxName.replace(/_/g, '-');
  const checkboxes = [];

  labels.map((label, index) => {
    const checkbox = label in sharedOptions ?
      (
        <Form.Check
          inline
          type="checkbox"
          key={`${keyName}-${index}`}
          name={checkboxName.replace(/_/g, '-')}
          checked={sharedOptions[label]}
          ref={customRefs.current[index]}
          label={label}
          value={index}
          onChange={onChangeHandler}
        />
      ) :
      (
        <Form.Check
          inline
          type="checkbox"
          key={`${keyName}-${index}`}
          name={checkboxName.replace(/_/g, '-')}
          ref={customRefs.current[index]}
          label={label}
          value={index}
        />
      );

    checkboxes.push(checkbox);
  });

  return checkboxes;
};

Checkboxes.propTypes = {
  data: PropTypes.object,
  checkboxName: PropTypes.string,
  customRefs: PropTypes.object,
  onChangeHandler: PropTypes.func,
};

export default Checkboxes;
