/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import DropdownForm, {
  ChoiceOptions,
  RangeOptions,
  FloorNumberOptions,
} from './DropdownForm';

const PropertyOverview = React.forwardRef(({data}, ref) => {
  const locationRef = useRef();
  const accessRef = useRef();
  const roomLayoutRef = useRef();
  const roomSizeRef = useRef();
  const buildDateRef = useRef();
  const floorNumberRef = useRef();

  useImperativeHandle(ref, () => ({
    get location() {
      return locationRef.current;
    },
    get access() {
      return accessRef.current;
    },
    get roomLayout() {
      return roomLayoutRef.current;
    },
    get roomSize() {
      return roomSizeRef.current;
    },
    get buildDate() {
      return buildDateRef.current;
    },
    get floorNumber() {
      return floorNumberRef.current;
    },
  }));

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='所在地'
          name='location'
          customRef={locationRef}
          Options={<ChoiceOptions data={data} optionName='location'/>}
        />
        <DropdownForm
          label='交通'
          name='access'
          customRef={accessRef}
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
          Options={<ChoiceOptions data={data} optionName='room_layout'/>}
        />
        <DropdownForm
          label='専有面積'
          name='room-size'
          customRef={roomSizeRef}
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
          Options={<RangeOptions data={data} optionName='build_date'/>}
        />
        <DropdownForm
          label='所在階'
          name='floor-number'
          customRef={floorNumberRef}
          Options={<FloorNumberOptions data={data}/>}
        />
      </Form.Row>
    </>
  );
});

PropertyOverview.displayName = 'PropertyOverview';
PropertyOverview.propTypes = {
  'data': PropTypes.shape({
    'dropdown_range': PropTypes.shape({
      'floor_number': PropTypes.array,
    }),
  }),
};

export default PropertyOverview;
