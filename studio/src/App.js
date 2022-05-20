import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import routes from './config/routes';
import 'antd/dist/antd.css';
import BasicLayout from './layout/basic';
function App() {
  return (
    <div className="App">
      <Router  basename={process.env.PUBLIC_URL}>
      {console.log(process.env.PUBLIC_URL,"process.env.PUBLIC_URL")}
        <Switch>
          {/* <Route path="/auth/login" component={(props) => <Auth {...props} flow={'login'} />} />
          <Route
            path="/auth/registration"
            component={(props) => <Auth {...props} flow={'registration'} />}
          />
          <Route path="/auth/recovery" component={() => <Recovery />} />
          <Route path="/auth/verification" component={() => <Verification />} />
          <Route path="/verification" component={() => <VerificationAfterRegistration />} />
          <Route path="/error" component={() => <KratosError />} /> */}
          <BasicLayout>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    component={
                      // orgCount !== 0
                      //   ? route.Component
                      //   : route.path === '/password' ||
                      //     route.path === '/profile' ||
                      //     route.path === '/organisation' ||
                      //     route.path === '/profile/invite'
                      //   ? route.Component
                      //   : () =>
                      //       ErrorComponent({
                      //         status: '500',
                      //         title: 'To access this page please create an organisation',
                      //         link: '/organisation',
                      //         message: 'Create Organisation',
                      //       })
                      route.Component
                    }
                  />
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
