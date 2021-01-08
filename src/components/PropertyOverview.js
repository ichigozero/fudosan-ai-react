/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
} from '../helpers/formPopulator';


function PropertyOverview() {
  const formContext = useContext(FormDataContext);
  const formData = formContext.data;

  const populateFloorNumberOptions = () => {
    const [min, max] = formData['dropdown_range']['floor_number'];
    const keyName = 'floor-number';
    const options = [<option key={`${keyName}-0`} value=""></option>];

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
            <option key={`${keyName}-${index + 1}`} value={val}>
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
            {populateChoiceOptions(formData, 'location')}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>交通</Form.Label>
          <Form.Control
            as="select"
            name='access'
          >
            {populateRangeOptions(formData, 'access', '分')}
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
            {populateChoiceOptions(formData, 'room_layout')}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>専有面積</Form.Label>
          <Form.Control
            as="select"
            name='room-size'
          >
            {populateRangeOptions(formData, 'room_size', 'm2', 10)}
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
            {populateRangeOptions(formData, 'build_date')}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>所在階</Form.Label>
          <Form.Control
            as="select"
            name='floor-number'
          >
            {populateFloorNumberOptions()}
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
