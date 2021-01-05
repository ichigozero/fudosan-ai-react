/* eslint-disable require-jsdoc */

import React, {useEffect, useState} from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function QueryForm() {
  const [prefectures, setPrefectures] = useState([]);

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

  return (
    <div className="row">
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              as="select"
              name='prefecture'
              defaultValue="都道府県を選択"
            >
              <option value="">都道府県を選択</option>
              <PrefectureOptions data={prefectures}/>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

function PrefectureOptions({data}) {
  const options = [];

  data.map((prefecture, index) => {
    const option = (
      <option key={`prefecture-${index}`} value={prefecture.id}>
        {prefecture.name}
      </option>
    );
    options.push(option);
  });

  return options;
}

export default QueryForm;
