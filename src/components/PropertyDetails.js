/* eslint-disable require-jsdoc */

import React, {useContext} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import DropdownForm from './DropdownForm';
import {FormDataContext} from './QueryForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
} from '../helpers/formPopulator';

function PropertyDetails() {
  const formContext = useContext(FormDataContext);
  const formData = formContext.data;

  const handleChange = () => {
  };

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='物件種目'
          name='category'
          handler={handleChange}
          options={populateChoiceOptions(formData, 'category')}
        />
        <DropdownForm
          label='建物階'
          name='number-of-floors'
          handler={handleChange}
          options={populateRangeOptions(formData, 'number_of_floors')}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='方位'
          name='azimuth'
          handler={handleChange}
          options={populateChoiceOptions(formData, 'azimuth')}
        />
        <DropdownForm
          label='構造'
          name='building-structure'
          handler={handleChange}
          options={populateChoiceOptions(formData, 'building_structure')}
        />
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
