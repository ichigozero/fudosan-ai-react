/* eslint-disable require-jsdoc */

import React, {createRef, useEffect, useState} from 'react';
import '../css/QueryForm.css';

import Alert from 'react-bootstrap/Alert';
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
  const [formValidation, setFormValidation] = useState({
    location: true,
    access: true,
    roomLayout: true,
    roomSize: true,
    buildDate: true,
    floorNumber: true,
    category: true,
    numberOfFloor: true,
    building: true,
  });

  const overviewRef = createRef();
  const detailRef = createRef();
  const facilityRef = createRef();

  useEffect(() => {
    const uri = '/fudosan-ai/api/v1.0/prefectures';

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

    const newFormValidation = {
      location: overviewRef.current.location().length > 0 ? true : false,
      access: overviewRef.current.access() !== '' ? true : false,
      roomLayout: overviewRef.current.roomLayout().length > 0 ? true : false,
      roomSize: overviewRef.current.roomSize() !== '' ? true : false,
      buildDate: overviewRef.current.buildDate() !== '' ? true : false,
      floorNumber: overviewRef.current.floorNumber() !== '' ? true : false,
      category: detailRef.current.category().length > 0 ? true : false,
      numberOfFloor: detailRef.current.numberOfFloor() !== '' ? true : false,
      building: detailRef.current.building().length > 0 ? true : false,
    };

    if (JSON.stringify(formValidation) !== JSON.stringify(newFormValidation)) {
      setFormValidation(newFormValidation);
    }

    if (!Object.values(newFormValidation).every(Boolean)) {
      if (!formData.showAlert) {
        setFormData({...formData, rentPrice: [], showAlert: true});
      }

      return null;
    }

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
    const uri = '/fudosan-ai/api/v1.0' +
      `/model/${modelId}/rent-price?val=${stringifiedValues}`;

    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          const {price, 'mean_error': meanError} = data.result;
          setFormData({
            ...formData,
            showAlert: false,
            rentPrice: [price - meanError, price + meanError],
          });
        });
  };

  const {showAlert, rentPrice} = formData;

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
                <PropertyOverview
                  data={formData}
                  formValidation={formValidation}
                  ref={overviewRef}
                />
              </Card.Body>
              <Card.Body className="card-body-main">
                <Card.Title>物件詳細情報</Card.Title>
                <PropertyDetails
                  data={formData}
                  formValidation={formValidation}
                  ref={detailRef}
                />
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
          {Array.isArray(rentPrice) && rentPrice.length > 0 &&
            <Card className="mt-4">
              <Card.Header>推定価格</Card.Header>
              <Card.Body>
                {parseFloat(rentPrice[0].toFixed(2)).toLocaleString() + ' 〜 ' +
                 parseFloat(rentPrice[1].toFixed(2)).toLocaleString() + ' 円'}
              </Card.Body>
            </Card>
          }
          {showAlert !== undefined && showAlert &&
            <Alert className="mt-4" variant="danger">エラーが発生しました！</Alert>
          }
        </Form>
      </div>
    </div>
  );
}

export default QueryForm;
