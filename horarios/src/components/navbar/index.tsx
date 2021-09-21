import {Layout} from "antd";
import React from "react";
import {NavbarProps, NavbarState} from "components/navbar/types";
import {withRouter} from "react-router-dom";
import logoUsc from "assets/usc.png";
import './navbar.less';


export class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout.Header className="header">
        <div className="logo-container">
          <img className="logo" src={logoUsc} alt="..."/>
        </div>
      </Layout.Header>
    );
  }
}

export default withRouter(Navbar);
