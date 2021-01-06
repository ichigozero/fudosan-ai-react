/* eslint-disable require-jsdoc */

import React, {useEffect, useState} from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import PrefectureOptions from './PrefectureOptions';
import PropertyOverview from './PropertyOverview';

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
    const value = event.target.value;

    if (value === '') {
      setFormElements({});
      return;
    }

    const uri = `/api/v1.0/form/${value}`;

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
          {Object.keys(formElements).length > 0 &&
            <Card className="mt-4">
              <Card.Header>ステップ２</Card.Header>
              <Card.Body>
                <Card.Title>物件概要</Card.Title>
                <PropertyOverview/>
              </Card.Body>
            </Card>
          }
        </Form>
      </div>
    </div>
  );
}

export default QueryForm;
