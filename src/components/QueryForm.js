/* eslint-disable require-jsdoc */

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function QueryForm() {
  const [prefectures, setPrefectures] = useState([]);
  const [modelId, setModelId] = useState('');
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
    setModelId(event.target.value);

    if (modelId === '') {
      setFormElements({});
      return;
    }

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
      <div className="col px-0">
        <Form>
          <Card>
            <Card.Header>ステップ１</Card.Header>
            <Card.Body>
              <PrefectureOptions
                data={prefectures}
                onChangeHandler={handlePrefectureChange}
              />
            </Card.Body>
          </Card>
          {!Object.keys(formElements).length &&
            <Card className="mt-4">
              <Card.Header>ステップ２</Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          }
        </Form>
      </div>
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
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>都道府県を選択</Form.Label>
          <Form.Control
            as="select"
            name='prefecture'
            defaultValue=""
            onChange={onChangeHandler}
          >
            <option value=""></option>
            {moreOptions}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  );
}

PrefectureOptions.propTypes = {
  data: PropTypes.array,
  onChangeHandler: PropTypes.func,
};

export default QueryForm;
