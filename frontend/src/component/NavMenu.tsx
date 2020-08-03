import React, { Component } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.scss';
import { LoginMenu } from './login/LoginMenu';

interface IProps {
}

interface IState {
  collapsed: boolean;
}

export default class NavMenu extends Component<IProps, IState> {
  static displayName = NavMenu.name;

  constructor(props: IProps) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState( {
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to='/'>HoyaConnection</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to='/'>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to='/board'>Board</NavLink>
                </NavItem>

                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}
