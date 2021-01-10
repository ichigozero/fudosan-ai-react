/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import DropdownForm from './DropdownForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
} from '../helpers/formPopulator';

function PropertyDetails({data}) {
  return (
    <>
      <Form.Row>
        <DropdownForm
          label='物件種目'
          name='category'
          options={populateChoiceOptions(data, 'category')}
        />
        <DropdownForm
          label='建物階'
          name='number-of-floors'
          options={populateRangeOptions(data, 'number_of_floors')}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='方位'
          name='azimuth'
          options={populateChoiceOptions(data, 'azimuth')}
        />
        <DropdownForm
          label='構造'
          name='building-structure'
          options={populateChoiceOptions(data, 'building_structure')}
        />
      </Form.Row>
      {data['radio_button'] &&
        data['radio_button']['has_parking'] &&
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

PropertyDetails.propTypes = {
  'data': PropTypes.shape({
    'radio_button': PropTypes.shape({
      'has_parking': PropTypes.array,
    }),
  }),
};

export default PropertyDetails;
