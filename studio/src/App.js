import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './config/routes';
import 'antd/dist/antd.css';
import BasicLayout from './layout/basic';
import { getUserInfo, login } from './utils/zitadel';

function App() {
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = () => {
    getUserInfo().then((res) => {
      if (res.error) {
        window.localStorage.setItem('return_to', window.location.href);
        login().then((d) => {
          if (!d.error) {
            window.location.href = d.authorizeURL;
          }
        });
      }
    });
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <BasicLayout>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route key={route.path} exact path={route.path} component={route.Component} />
                );
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
