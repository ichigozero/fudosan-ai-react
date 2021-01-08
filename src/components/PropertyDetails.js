/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
} from '../helpers/formPopulator';

function PropertyDetails() {
  const formContext = useContext(FormDataContext);
  const formData = formContext.data;

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>物件種目</Form.Label>
          <Form.Control
            as="select"
            name='category'
          >
            {populateChoiceOptions(formData, 'category')}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>建物階</Form.Label>
          <Form.Control
            as="select"
            name='number-of-floors'
          >
            {populateRangeOptions(formData, 'number_of_floors')}
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
            {populateChoiceOptions(formData, 'azimuth')}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>構造</Form.Label>
          <Form.Control
            as="select"
            name='building-structure'
          >
            {populateChoiceOptions(formData, 'building_structure')}
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
