/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

function Checkboxes({data, checkboxName}) {
  const labels = data['checkbox'][checkboxName];
  const keyName = checkboxName.replace(/_/g, '-');
  const checkboxes = [];

  labels.map((label, index) => {
    const checkbox = (
      <Form.Check
        inline
        type="checkbox"
        key={`${keyName}-${index}`}
        name={checkboxName.replace(/_/g, '-')}
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
};

export default Checkboxes;
