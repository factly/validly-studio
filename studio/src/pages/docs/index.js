import { Menu, Row, Col, Card, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const Documentation = () => {
  const [currentDoc, setCurrentDoc] = useState('');
  const [docs, setDocs] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(window.REACT_APP_VALIDLY_SERVER_URL + '/docs/expectations')
      .then((response) => response.json())
      .then((response) => {
        setDocs(response);
        setCurrentDoc(Object.keys(response)[0]);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <link
        rel={'stylesheet'}
        href={'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'}
      ></link>
      {loading ? (
        <Spin size="default" style={{ display: 'block', marginTop: '15%' }} />
      ) : (
        <Row gutter={16}>
          <Col span={5}>
            <Menu defaultSelectedKeys={'0'} mode="inline">
              {Object.keys(docs).map((expectationTitle, index) => (
                <Menu.Item
                  onClick={() => {
                    setCurrentDoc(expectationTitle);
                  }}
                  key={index}
                >
                  {expectationTitle.replaceAll("_"," ")}
                </Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col span={19}>
            <Card>
              <div
                dangerouslySetInnerHTML={{ __html: currentDoc ? docs?.[currentDoc] : <div></div> }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Documentation;
