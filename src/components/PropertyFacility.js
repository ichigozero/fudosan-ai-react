/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Checkboxes from './Checkboxes';

const PropertyFacility = React.forwardRef(({data}, ref) => {
  const popularItemRefs = useRef([]);
  const featureRefs = useRef([]);

  const sharedOptionStates = getSharedOptionDefaultStates(
      data['checkbox']['popular_items'],
      data['checkbox']['features'],
  );
  const [sharedOptions, setSharedOptions] = useState(sharedOptionStates);

  useImperativeHandle(ref, () => ({
    popularItems: (index) => popularItemRefs.current[index],
    features: (index) => featureRefs.current[index],
  }));

  const handleClick = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const label = name === 'popular-items' ?
      data['checkbox']['popular_items'][value] :
      data['checkbox']['features'][value];

    if (label in sharedOptions) {
      setSharedOptions({
        ...sharedOptions,
        [label]: !sharedOptions[label],
      });
    }
  };

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
              sharedOptions={sharedOptions}
              onChangeHandler={handleClick}
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
              sharedOptions={sharedOptions}
              onChangeHandler={handleClick}
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

const getSharedOptionDefaultStates = (popularItems, features) => {
  const states = {};

  popularItems.map((item) => {
    if (features.includes(item)) states[item] = false;
  });

  return states;
};

export default PropertyFacility;
