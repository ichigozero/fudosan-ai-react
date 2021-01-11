/* eslint-disable require-jsdoc */

import React, {useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import DropdownForm from './DropdownForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
  range,
} from '../helpers/formPopulator';


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

  const populateFloorNumberOptions = () => {
    const [min, max] = data['dropdown_range']['floor_number'];
    const keyName = 'floor-number';
    const options = [<option key={`${keyName}-0`} value=""></option>];

    range(min, max)
        .filter((val) => val !== 0 ? true : false)
        .map((val, index) => {
          let floorNumber = '';

          if (val < 0) {
            floorNumber = `地下${Math.abs(val)}階部分`;
          } else {
            floorNumber = `地上${val}階部分`;
          }

          const option = (
            <option key={`${keyName}-${index + 1}`} value={val}>
              {floorNumber}
            </option>
          );

          options.push(option);
        });

    return options;
  };

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='所在地'
          name='location'
          customRef={locationRef}
          options={populateChoiceOptions(data, 'location')}
        />
        <DropdownForm
          label='交通'
          name='access'
          customRef={accessRef}
          options={populateRangeOptions(data, 'access', '分')}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='間取り'
          name='room-layout'
          customRef={roomLayoutRef}
          options={populateChoiceOptions(data, 'room_layout')}
        />
        <DropdownForm
          label='専有面積'
          name='room-size'
          customRef={roomSizeRef}
          options=
            {populateRangeOptions(data, 'room_size', 'm2', 10)}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='築年'
          name='build-date'
          customRef={buildDateRef}
          options={populateRangeOptions(data, 'build_date')}
        />
        <DropdownForm
          label='所在階'
          name='floor-number'
          customRef={floorNumberRef}
          options={populateFloorNumberOptions()}
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
