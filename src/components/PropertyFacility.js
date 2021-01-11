/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Checkboxes from './Checkboxes';

function PropertyFacility({data}) {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>人気の設備</Form.Label>
          <div>
            <Checkboxes data={data} checkboxName='popular_items'/>
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>おすすめの特徴・設備</Form.Label>
          <div>
            <Checkboxes data={data} checkboxName='features'/>
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
}

PropertyFacility.propTypes = {
  data: PropTypes.object,
};

export default PropertyFacility;
