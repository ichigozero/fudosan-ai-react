/* eslint-disable require-jsdoc */

import React, {createRef, useEffect, useState} from 'react';
import '../css/QueryForm.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import PrefectureOptions from './PrefectureOptions';
import PropertyDetails from './PropertyDetails';
import PropertyFacility from './PropertyFacility';
import PropertyOverview from './PropertyOverview';

function QueryForm() {
  const [prefectures, setPrefectures] = useState([]);
  const [formData, setFormData] = useState({});

  const overviewRef = createRef();
  const detailRef = createRef();
  const facilityRef = createRef();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const modelValues = [
      overviewRef.current.access(),
      overviewRef.current.buildDate(),
      overviewRef.current.roomSize(),
      overviewRef.current.floorNumber(),
      detailRef.current.numberOfFloor(),
      detailRef.current.hasParking(),
      ...facilityRef.current.popularItems(),
      ...facilityRef.current.features(),
      ...overviewRef.current.location(),
      ...overviewRef.current.roomLayout(),
      ...detailRef.current.category(),
      ...detailRef.current.azimuth(),
      ...detailRef.current.building(),
    ];

    const modelId = formData.modelId;
    const stringifiedValues = modelValues.join('&val=');
    const uri = `api/v1.0/model/${modelId}/rent-price?val=${stringifiedValues}`;

    fetch(uri)
        .then((response) => response.json())
        .then((data) => console.log(data));
  };

  return (
    <div className="row">
      <div className="col px-0">
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Header>ステップ１</Card.Header>
            <Card.Body>
              <PrefectureOptions
                data={prefectures}
                setter={(data) => setFormData(data)}
              />
            </Card.Body>
          </Card>
          {Object.keys(formData).length > 0 &&
            <Card className="mt-4">
              <Card.Header>ステップ２</Card.Header>
              <Card.Body className="card-body-main">
                <Card.Title>物件概要</Card.Title>
                <PropertyOverview data={formData} ref={overviewRef}/>
              </Card.Body>
              <Card.Body className="card-body-main">
                <Card.Title>物件詳細情報</Card.Title>
                <PropertyDetails data={formData} ref={detailRef}/>
              </Card.Body>
              <Card.Body className="card-body-main">
                <Card.Title>物件の特徴・設備</Card.Title>
                <PropertyFacility data={formData} ref={facilityRef}/>
              </Card.Body>
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
