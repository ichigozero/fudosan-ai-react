/* eslint-disable require-jsdoc */

import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PopularFacility() {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>人気の設備</Form.Label>
          <div>
            <Form.Check
              inline
              type="checkbox"
              name="popular-items"
              label="default checkbox 1"
            />
            <Form.Check
              inline
              type="checkbox"
              name="popular-items"
              label="default checkbox 2"
            />
            <Form.Check
              inline
              type="checkbox"
              name="popular-items"
              label="default checkbox 3"
            />
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>おすすめの特徴・設備</Form.Label>
          <div>
            <Form.Check
              inline
              type="checkbox"
              name="features"
              label="default checkbox 4"
            />
            <Form.Check
              inline
              type="checkbox"
              name="features"
              label="default checkbox 5"
            />
            <Form.Check
              inline
              type="checkbox"
              name="features"
              label="default checkbox 6"
            />
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
}

export default PopularFacility;
