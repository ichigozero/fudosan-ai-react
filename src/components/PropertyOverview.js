/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import DropdownForm from './DropdownForm';
import {
  populateChoiceOptions,
  populateRangeOptions,
  range,
} from '../helpers/formPopulator';


function PropertyOverview({data}) {
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    formSetter[name](value);
  };

  return (
    <>
      <Form.Row>
        <DropdownForm
          label='所在地'
          name='location'
          options={populateChoiceOptions(data, 'location')}
        />
        <DropdownForm
          label='交通'
          name='access'
          options={populateRangeOptions(data, 'access', '分')}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='間取り'
          name='room-layout'
          options={populateChoiceOptions(data, 'room_layout')}
        />
        <DropdownForm
          label='専有面積'
          name='room-size'
          options=
            {populateRangeOptions(data, 'room_size', 'm2', 10)}
        />
      </Form.Row>
      <Form.Row>
        <DropdownForm
          label='築年'
          name='build-date'
          handler={handleChange}
          options={populateRangeOptions(data, 'build_date')}
        />
        <DropdownForm
          label='所在階'
          name='build-date'
          handler={handleChange}
          options={populateFloorNumberOptions()}
        />
      </Form.Row>
    </>
  );
}

PropertyOverview.propTypes = {
  'data': PropTypes.shape({
    'dropdown_range': PropTypes.shape({
      'floor_number': PropTypes.array,
    }),
  }),
};

export default PropertyOverview;
