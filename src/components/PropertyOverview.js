/* eslint-disable require-jsdoc */

import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PropertyOverview() {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>所在地</Form.Label>
          <Form.Control
            as="select"
            name='location'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>交通</Form.Label>
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
          <Form.Label>間取り</Form.Label>
          <Form.Control
            as="select"
            name='room-layout'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>専有面積</Form.Label>
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
          <Form.Label>築年</Form.Label>
          <Form.Control
            as="select"
            name='build-date'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>所在階</Form.Label>
          <Form.Control
            as="select"
            name='floor-number'
          >
            <option value=""></option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}

export default PropertyOverview;
