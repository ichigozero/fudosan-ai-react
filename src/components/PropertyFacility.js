/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {FormDataContext} from './QueryForm';
import {generateCheckboxes} from '../helpers/formPopulator';

function PropertyFacility() {
  const formContext = useContext(FormDataContext);
  const formData = formContext.data;

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>人気の設備</Form.Label>
          <div>
            {generateCheckboxes(formData, 'popular_items')}
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>おすすめの特徴・設備</Form.Label>
          <div>
            {generateCheckboxes(formData, 'features')}
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
}

export default PropertyFacility;
