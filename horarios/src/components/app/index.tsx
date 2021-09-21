import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import store from 'store';
import AppRoutes from "../../routes";
import {AppProps, AppState} from "./types";
import Ajustes from "routes/ajustes";
import {Layout} from "antd";


export class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Layout style={{minHeight: '100vh'}}>
            <Router>
              <Switch>
                <Route path={AppRoutes.AJUSTES}><Ajustes/></Route>
                <Route path={AppRoutes.HORARIO}>TBD...</Route>
                <Route path={AppRoutes.ICALENDAR}>TBD...</Route>
                <Route><Redirect to={AppRoutes.AJUSTES}/></Route>
              </Switch>
            </Router>
          </Layout>
        </Layout>
      </Provider>
    );
  }
}

export default App;
