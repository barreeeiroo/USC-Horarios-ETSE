import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import store from 'store';
import AppRoutes from "../../routes";
import {AppProps, AppState} from "./types";
import Ajustes from "routes/ajustes";
import {Col, Layout, Row} from "antd";
import Navbar from "components/navbar";
import Horario from "routes/horario";
import {generarUrl, getMatriculaValida, hayMatriculaGuardada} from "utils/share";
import Fab from "components/fab";


export class App extends React.Component<AppProps, AppState> {
  render() {
    let rutaInicio: string = AppRoutes.AJUSTES;
    if (hayMatriculaGuardada()) {
      rutaInicio = AppRoutes.HORARIO + "/" + generarUrl(getMatriculaValida());
    }

    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Navbar/>
            <Layout style={{minHeight: '100vh'}}>
              <Layout.Content className={'container'}>
                <Row justify="space-between">
                  <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}/> {/* Left gutter for large devices */}
                  <Col xs={22} sm={22} md={22} lg={20} xl={20} xxl={20}>
                    <Switch>
                      <Route path={AppRoutes.AJUSTES}><Ajustes/></Route>
                      <Route path={AppRoutes.HORARIO}><Horario/></Route>
                      <Route path={AppRoutes.ICALENDAR}>TBD...</Route>
                      <Route><Redirect to={rutaInicio}/></Route>
                    </Switch>
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}/> {/* Right gutter for large devices */}
                </Row>
              </Layout.Content>
              <Layout.Footer style={{textAlign: 'center'}}>
                Horarios ETSE © 2021-2022 | Creado
                por <a href="https://diego.barreiro.xyz" target="_blank" rel="noreferrer">Diego Barreiro</a>
              </Layout.Footer>
            </Layout>
            <Fab/>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
