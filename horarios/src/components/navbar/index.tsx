import {Layout, Menu} from "antd";
import React from "react";
import {NavbarProps, NavbarState} from "components/navbar/types";
import {withRouter} from "react-router-dom";
import logoUsc from "assets/usc.png";
import './navbar.less';
import AppRoutes from "routes";
import {generarUrl, getMatriculaValida} from "utils/share";
import Icon from "@mdi/react";
import * as MDI from "@mdi/js";


export class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {};
  }

  private getPaginaActual() {
    let paginas: string[] = [];
    Object.values(AppRoutes).forEach(route => {
      if (this.props.location.pathname.startsWith(route)) paginas.push(route);
    });
    return paginas;
  }

  private irA(key: AppRoutes): void {
    if (key === AppRoutes.GITHUB) {
      window.open("https://github.com/barreeeiroo/Horarios-ETSE", '_blank');
      return;
    }

    let url: string = key;
    if (key === AppRoutes.HORARIO) {
      url += "/" + encodeURI(generarUrl(getMatriculaValida()));
    }
    this.props.history.push(url);
  }

  render() {
    return (
      <Layout.Header className="header">
        <div className="logo-container">
          <img className="logo" src={logoUsc} alt="..."/>
        </div>
        <Menu
          theme="dark" mode="horizontal" selectedKeys={this.getPaginaActual()}
          onClick={e => this.irA(e.key as AppRoutes)}
        >
          <Menu.Item key={AppRoutes.AJUSTES}>Ajustes</Menu.Item>
          <Menu.Item key={AppRoutes.HORARIO}>Horario</Menu.Item>
          <Menu.Item className="menu-right" key={AppRoutes.GITHUB} icon={<Icon
            path={MDI.mdiGithub} size={1.2} className="icon-navbar"
          />}>
            Ver en Github
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default withRouter(Navbar);
