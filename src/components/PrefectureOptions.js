/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PrefectureOptions({data, setter}) {
  const moreOptions = [];

  data.map((prefecture, index) => {
    const option = (
      <option key={`prefecture-${index}`} value={prefecture.id}>
        {prefecture.name}
      </option>
    );
    moreOptions.push(option);
  });

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === '') {
      setter({});
      return;
    }

    const uri = `/api/v1.0/form/${value}`;

    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          if ('form' in data) {
            setter({...data.form, modelId: value, rentPrice: []});
          }
        });
  };

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>都道府県を選択</Form.Label>
          <Form.Control
            as="select"
            name='prefecture'
            onChange={handleChange}
          >
            <option value=""></option>
            {moreOptions}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}

PrefectureOptions.propTypes = {
  data: PropTypes.array,
  setter: PropTypes.func,
};

export default PrefectureOptions;
