import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import store from 'store';
import AppRoutes from "../../routes";
import {AppProps, AppState} from "./types";


export class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path={AppRoutes.AJUSTES}>TBD...</Route>
            <Route path={AppRoutes.HORARIO}>TBD...</Route>
            <Route path={AppRoutes.ICALENDAR}>TBD...</Route>
            <Route exact path={AppRoutes.INICIO}><Redirect to={AppRoutes.AJUSTES}/></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
