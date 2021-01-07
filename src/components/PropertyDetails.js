/* eslint-disable require-jsdoc */

import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PropertyDetails() {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>物件種目</Form.Label>
          <Form.Control
            as="select"
            name='location'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>建物階</Form.Label>
          <Form.Control
            as="select"
            name='access'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>方位</Form.Label>
          <Form.Control
            as="select"
            name='room-layout'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>構造</Form.Label>
          <Form.Control
            as="select"
            name='room-size'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>駐車場</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              name="has-parking"
              label="あり"
            />
            <Form.Check
              inline
              type="radio"
              name="has-parking"
              label="なし"
            />
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
}

export default PropertyDetails;
