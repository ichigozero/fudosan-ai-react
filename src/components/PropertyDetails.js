/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';
import {choiceOptions, rangeOptions} from '../helpers/formPopulator';

function PropertyDetails() {
  const formContext = useContext(FormDataContext);
  const formData = formContext.data;

  const azimuthOptions = () => choiceOptions(formData, 'azimuth');
  const buildingStructureOptions = () => {
    return choiceOptions(formData, 'building_structure');
  };
  const categoryOptions = () => choiceOptions(formData, 'category');

  const numberOfFloorOptions = () => {
    return rangeOptions(formData, 'number_of_floors');
  };

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>物件種目</Form.Label>
          <Form.Control
            as="select"
            name='category'
          >
            <option value=""></option>
            {categoryOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>建物階</Form.Label>
          <Form.Control
            as="select"
            name='number-of-floors'
          >
            <option value=""></option>
            {numberOfFloorOptions()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>方位</Form.Label>
          <Form.Control
            as="select"
            name='azimuth'
          >
            <option value=""></option>
            {azimuthOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>構造</Form.Label>
          <Form.Control
            as="select"
            name='building-structure'
          >
            <option value=""></option>
            {buildingStructureOptions()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      {formData['radio_button'] &&
        formData['radio_button']['has_parking'] &&
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>駐車場</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                name="has-parking"
                label="あり"
                value="1"
              />
              <Form.Check
                inline
                type="radio"
                name="has-parking"
                label="なし"
                value="0"
              />
            </div>
          </Form.Group>
        </Form.Row>
      }
    </>
  );
}

export default PropertyDetails;
