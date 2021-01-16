/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import DropdownForm, {
  MandatoryChoiceOptions,
  OptionalChoiceOptions,
  RangeOptions,
} from './DropdownForm';

import {choiceValueToArray} from '../helpers/util';

const PropertyDetails = React.forwardRef(({data, formValidation}, ref) => {
  const categoryRef = useRef();
  const numberOfFloorRef = useRef();
  const azimuthRef = useRef();
  const buildingRef = useRef();
  const hasParkingRef = useRef();
  const hasNoParkingRef = useRef();

  useImperativeHandle(ref, () => ({
    category: () => choiceValueToArray(
        data['dropdown_choice']['category'].length,
        categoryRef,
    ),
    numberOfFloor: () => numberOfFloorRef.current.value,
    azimuth: () => choiceValueToArray(
        data['dropdown_choice']['azimuth'].length,
        azimuthRef,
    ),
    building: () => choiceValueToArray(
        data['dropdown_choice']['building_structure'].length,
        buildingRef,
    ),
    hasParking: () => hasParkingRef.current.checked ? 1 : 0,
    hasNoParking: () => hasNoParkingRef.current.checked ? 1 : 0,
  }));

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='物件種目'
          name='category'
          customRef={categoryRef}
          isInvalid={!formValidation.category}
          Options={<MandatoryChoiceOptions data={data} optionName='category'/>}
        />
        <DropdownForm
          label='建物階'
          name='number-of-floors'
          customRef={numberOfFloorRef}
          isInvalid={!formValidation.numberOfFloor}
          Options={
            <RangeOptions
              data={data}
              optionName='number_of_floors'
              choicePrefix='地上'
              choiceSuffix='階建て'
            />
          }
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='方位'
          name='azimuth'
          customRef={azimuthRef}
          isInvalid={false}
          Options={<OptionalChoiceOptions data={data} optionName='azimuth'/>}
        />
        <DropdownForm
          label='構造'
          name='building-structure'
          customRef={buildingRef}
          isInvalid={!formValidation.building}
          Options={
            <MandatoryChoiceOptions
              data={data}
              optionName='building_structure'
            />
          }
        />
      </Form.Row>
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
              defaultChecked
              type="radio"
              name="has-parking"
              ref={hasNoParkingRef}
              label="なし"
              value="0"
            />
          </div>
        </Form.Group>
      </Form.Row>
    </>
  );
});

PropertyDetails.displayName = 'PropertyDetails';
PropertyDetails.propTypes = {
  'data': PropTypes.shape({
    'dropdown_choice': PropTypes.shape({
      'category': PropTypes.array,
      'azimuth': PropTypes.array,
      'building_structure': PropTypes.array,
    }),
    'radio_button': PropTypes.shape({
      'has_parking': PropTypes.array,
    }),
  }),
  'formValidation': PropTypes.object,
};

export default PropertyDetails;
