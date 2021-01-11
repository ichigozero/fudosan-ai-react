import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const DropdownForm = ({label, name, customRef, options}) => {
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" name={name} ref={customRef}>
        {options}
      </Form.Control>
    </Form.Group>
  );
};

DropdownForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  customRef: PropTypes.object,
  options: PropTypes.array,
};

export default DropdownForm;
