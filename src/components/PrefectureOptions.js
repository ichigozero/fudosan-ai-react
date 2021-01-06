/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PrefectureOptions({data, onChangeHandler}) {
  const moreOptions = [];

  data.map((prefecture, index) => {
    const option = (
      <option key={`prefecture-${index}`} value={prefecture.id}>
        {prefecture.name}
      </option>
    );
    moreOptions.push(option);
  });

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>都道府県を選択</Form.Label>
          <Form.Control
            as="select"
            name='prefecture'
            onChange={onChangeHandler}
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
  onChangeHandler: PropTypes.func,
};

export default PrefectureOptions;
