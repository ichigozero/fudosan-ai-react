import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const DropdownForm = ({label, name, handler, options}) => {
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" name={name}>
        {options}
      </Form.Control>
    </Form.Group>
  );
};

DropdownForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  handler: PropTypes.func,
  options: PropTypes.array,
};

export default DropdownForm;
