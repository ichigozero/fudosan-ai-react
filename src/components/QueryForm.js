/* eslint-disable require-jsdoc */

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function QueryForm() {
  const [prefectures, setPrefectures] = useState([]);
  const [formElements, setFormElements] = useState({});

  useEffect(() => {
    const uri = '/api/v1.0/prefectures';

    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          if ('prefectures' in data) {
            setPrefectures(data.prefectures);
          }
        });
  }, []);

  const handlePrefectureChange = (event) => {
    const modelId = event.target.value;

    if (modelId === '') return;

    const uri = `/api/v1.0/form/${modelId}`;

    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          if ('form' in data) {
            setFormElements(data.form);
            console.log(formElements);
          }
        });
  };

  return (
    <div className="row">
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <PrefectureOptions
              data={prefectures}
              onChangeHandler={handlePrefectureChange}
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

function PrefectureOptions({data, onChangeHandler}) {
  const moreOptions = [];

  data.map((prefecture, index) => {
    const option = (
      <option key={`prefecture-${index}`} value={prefecture.id}>
        {prefecture.name}
      </option>
    );
    moreOptions.push(option);
  });

  return (
    <>
      <Form.Label>都道府県</Form.Label>
      <Form.Control
        as="select"
        name='prefecture'
        defaultValue="都道府県を選択"
        onChange={onChangeHandler}
      >
        <option value="">都道府県を選択</option>
        {moreOptions}
      </Form.Control>
    </>
  );
}

PrefectureOptions.propTypes = {
  data: PropTypes.array,
  onChangeHandler: PropTypes.func,
};

export default QueryForm;
