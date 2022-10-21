import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from '../components/GlobalNav/Header';
import Sidebar from '../components/GlobalNav/Sidebar';
import { Helmet } from 'react-helmet';
import './basic.css';

function BasicLayout(props) {
  const { children } = props;

  return (
    <Layout hasSider={true}>
       <Helmet titleTemplate={'%s - Validly Studio'} title={'Dega Studio'} />
      <Sidebar />
      <Layout style={{ background: '#fff' }}>
        <Header />
        <Layout.Content className="layout-content">
          <div key={'children'} className="wrap-children-content">
            {children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(BasicLayout);
