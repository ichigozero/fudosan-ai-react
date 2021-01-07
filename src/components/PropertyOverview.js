/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';

function PropertyOverview() {
  const formContext = useContext(FormDataContext);

  const locationOptions = () => {
    const options = [];
    const locations = formContext.data['dropdown_choice']['location'];

    locations.map((location, index) => {
      const option = (
        <option key={`location-${index}`} value={location}>
          {location}
        </option>
      );
      options.push(option);
    });

    return options;
  };

  const accessOptions = () => {
    const options = [];
    const minMaxVal = formContext.data['dropdown_range']['access'];

    for (let val=minMaxVal[0]; val <= minMaxVal[1]; val++) {
      const option = (
        <option key={`access-${val}`} value={val}>
          {val}
        </option>
      );
      options.push(option);
    };

    return options;
  };

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
            {locationOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>交通</Form.Label>
          <Form.Control
            as="select"
            name='access'
          >
            <option value=""></option>
            {accessOptions()}
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
