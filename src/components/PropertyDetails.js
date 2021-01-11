/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import DropdownForm, {ChoiceOptions, RangeOptions} from './DropdownForm';

const PropertyDetails = React.forwardRef(({data}, ref) => {
  const categoryRef = useRef();
  const numberOfFloorRef = useRef();
  const azimuthRef = useRef();
  const buildingRef = useRef();
  const hasParkingRef = useRef();
  const hasNoParkingRef = useRef();

  useImperativeHandle(ref, () => ({
    get category() {
      return categoryRef.current;
    },
    get numberOfFloor() {
      return numberOfFloorRef.current;
    },
    get azimuth() {
      return azimuthRef.current;
    },
    get building() {
      return buildingRef.current;
    },
    get hasParking() {
      return hasParkingRef.current;
    },
    get hasNoParking() {
      return hasNoParkingRef.current;
    },
  }));

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='物件種目'
          name='category'
          customRef={categoryRef}
          Options={<ChoiceOptions data={data} optionName='category'/>}
        />
        <DropdownForm
          label='建物階'
          name='number-of-floors'
          customRef={numberOfFloorRef}
          Options={<RangeOptions data={data} optionName='number_of_floors'/>}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='方位'
          name='azimuth'
          customRef={azimuthRef}
          Options={<ChoiceOptions data={data} optionName='azimuth'/>}
        />
        <DropdownForm
          label='構造'
          name='building-structure'
          customRef={buildingRef}
          Options={<ChoiceOptions data={data} optionName='building_structure'/>}
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
                ref={hasParkingRef}
                label="あり"
                value="1"
              />
              <Form.Check
                inline
                type="radio"
                name="has-parking"
                ref={hasNoParkingRef}
                label="なし"
                value="0"
              />
            </div>
          </Form.Group>
        </Form.Row>
      }
    </>
  );
});

PropertyDetails.displayName = 'PropertyDetails';
PropertyDetails.propTypes = {
  'data': PropTypes.shape({
    'radio_button': PropTypes.shape({
      'has_parking': PropTypes.array,
    }),
  }),
};

export default PropertyDetails;
