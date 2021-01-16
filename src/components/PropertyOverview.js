/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import DropdownForm, {
  MandatoryChoiceOptions,
  RangeOptions,
  FloorNumberOptions,
} from './DropdownForm';

import {choiceValueToArray} from '../helpers/util';

const PropertyOverview = React.forwardRef(({data, formValidation}, ref) => {
  const locationRef = useRef();
  const accessRef = useRef();
  const roomLayoutRef = useRef();
  const roomSizeRef = useRef();
  const buildDateRef = useRef();
  const floorNumberRef = useRef();

  useImperativeHandle(ref, () => ({
    location: () => choiceValueToArray(
        data['dropdown_choice']['location'].length,
        locationRef,
    ),
    access: () => accessRef.current.value,
    roomLayout: () => choiceValueToArray(
        data['dropdown_choice']['room_layout'].length,
        roomLayoutRef,
    ),
    roomSize: () => roomSizeRef.current.value,
    buildDate: () => buildDateRef.current.value,
    floorNumber: () => floorNumberRef.current.value,
  }));

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='所在地'
          name='location'
          customRef={locationRef}
          isInvalid={!formValidation.location}
          Options={<MandatoryChoiceOptions data={data} optionName='location'/>}
        />
        <DropdownForm
          label='交通'
          name='access'
          customRef={accessRef}
          isInvalid={!formValidation.access}
          Options={
            <RangeOptions
              data={data}
              optionName='access'
              choiceSuffix='分'
            />
          }
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='間取り'
          name='room-layout'
          customRef={roomLayoutRef}
          isInvalid={!formValidation.roomLayout}
          Options={
            <MandatoryChoiceOptions data={data} optionName='room_layout'/>
          }
        />
        <DropdownForm
          label='専有面積'
          name='room-size'
          customRef={roomSizeRef}
          isInvalid={!formValidation.roomSize}
          Options={
            <RangeOptions
              data={data}
              optionName='room_size'
              choiceSuffix='m2'
              step={10}
            />
          }
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='築年'
          name='build-date'
          customRef={buildDateRef}
          isInvalid={!formValidation.buildDate}
          Options={<RangeOptions data={data} optionName='build_date'/>}
        />
        <DropdownForm
          label='所在階'
          name='floor-number'
          customRef={floorNumberRef}
          isInvalid={!formValidation.floorNumber}
          Options={<FloorNumberOptions data={data}/>}
        />
      </Form.Row>
    </>
  );
});

PropertyOverview.displayName = 'PropertyOverview';
PropertyOverview.propTypes = {
  'data': PropTypes.shape({
    'dropdown_choice': PropTypes.shape({
      'location': PropTypes.array,
      'room_layout': PropTypes.array,
    }),
  }),
  'formValidation': PropTypes.object,
};

export default PropertyOverview;
