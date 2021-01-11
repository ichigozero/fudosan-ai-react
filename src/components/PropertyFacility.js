/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Checkboxes from './Checkboxes';

const PropertyFacility = React.forwardRef(({data}, ref) => {
  const popularItemRefs = useRef([]);
  const featureRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    popularItems: (index) => popularItemRefs.current[index],
    features: (index) => featureRefs.current[index],
  }));

  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>人気の設備</Form.Label>
          <div>
            <Checkboxes
              data={data}
              checkboxName='popular_items'
              customRefs={popularItemRefs}
            />
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>おすすめの特徴・設備</Form.Label>
          <div>
            <Checkboxes
              data={data}
              checkboxName='features'
              customRefs={featureRefs}
            />
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
});

PropertyFacility.displayName = 'PropertyFacility';
PropertyFacility.propTypes = {
  data: PropTypes.object,
};

export default PropertyFacility;
