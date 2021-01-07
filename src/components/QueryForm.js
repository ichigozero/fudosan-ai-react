/* eslint-disable require-jsdoc */

import React, {createContext, useEffect, useState} from 'react';
import '../css/QueryForm.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import PrefectureOptions from './PrefectureOptions';
import PropertyDetails from './PropertyDetails';
import PropertyFacility from './PropertyFacility';
import PropertyOverview from './PropertyOverview';

const FormDataContext = createContext();

function QueryForm() {
  const [prefectures, setPrefectures] = useState([]);
  const [formData, setFormData] = useState({});

  const formContextValue = {
    data: formData,
  };

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
      setFormData({});
      return;
    }

    const uri = `/api/v1.0/form/${value}`;

    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          if ('form' in data) {
            setFormData(data.form);
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
          {Object.keys(formData).length > 0 &&
            <Card className="mt-4">
              <Card.Header>ステップ２</Card.Header>
              <FormDataContext.Provider value={formContextValue}>
                <Card.Body className="card-body-main">
                  <Card.Title>物件概要</Card.Title>
                  <PropertyOverview/>
                </Card.Body>
                <Card.Body className="card-body-main">
                  <Card.Title>物件詳細情報</Card.Title>
                  <PropertyDetails/>
                </Card.Body>
                <Card.Body className="card-body-main">
                  <Card.Title>物件の特徴・設備</Card.Title>
                  <PropertyFacility/>
                </Card.Body>
              </FormDataContext.Provider>
              <Card.Body>
                <Button
                  block
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  送信する
                </Button>
              </Card.Body>
            </Card>
          }
        </Form>
      </div>
    </div>
  );
}

export default QueryForm;
export {FormDataContext};
