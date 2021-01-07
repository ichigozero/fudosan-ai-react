/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';

function PropertyOverview() {
  const formContext = useContext(FormDataContext);

  const locationOptions = () => choiceOptions('location');

  const choiceOptions = (optionName) => {
    const choices = formContext.data['dropdown_choice'][optionName];
    const keyName = optionName.replace(/_/g, '-');
    const options = [];

    choices.map((choice, index) => {
      const option = (
        <option key={`${keyName}-${index}`} value={choice}>
          {choice}
        </option>
      );
      options.push(option);
    });

    return options;
  };

  const accessOptions = () => rangeOptions('access');
  const buildDateOptions = () => rangeOptions('build_date');

  const rangeOptions = (optionName, choiceSuffix='', step=1) => {
    const [min, max] = formContext.data['dropdown_range'][optionName];
    const keyName = optionName.replace(/_/g, '-');
    const options = [];

    range(min, max, step).map((choice, index) => {
      const option = (
        <option key={`${keyName}-${index}`} value={choice}>
          {choice + choiceSuffix}
        </option>
      );
      options.push(option);
    });

    return options;
  };

  const floorNumberOptions = () => {
    const [min, max] = formContext.data['dropdown_range']['floor_number'];
    const options = [];

    range(min, max)
        .filter((val) => val !== 0 ? true : false)
        .map((val, index) => {
          let floorNumber = '';

          if (val < 0) {
            floorNumber = `地下${Math.abs(val)}階部分`;
          } else {
            floorNumber = `地上${val}階部分`;
          }

          const option = (
            <option key={`floor-number-${index}`} value={val}>
              {floorNumber}
            </option>
          );

          options.push(option);
        });

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
            {buildDateOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>所在階</Form.Label>
          <Form.Control
            as="select"
            name='floor-number'
          >
            <option value=""></option>
            {floorNumberOptions()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}

const range = (start, stop, step=1) => {
  return Array.from(
      {length: (stop - start) / step + 1},
      (_, i) => start + (i * step),
  );
};

export default PropertyOverview;
