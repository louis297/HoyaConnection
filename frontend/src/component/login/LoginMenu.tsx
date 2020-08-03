import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './Constrants';
import { userInfo } from 'os';

interface Iprops{

}
interface Istate{
  isAuthenticated: boolean,
  userName?: string|null
}

export class LoginMenu extends Component<Iprops, Istate> {
  _subscription : any;

  constructor(props:Iprops) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    }
  }

  componentDidMount(){
    this._subscription = authService.subscribe(() => this.populateState());
  }

  componentWillUnmount(){
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if(!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = { pathname: `${ApplicationPaths.Logout}`, state: { local: true } };
      return this.authenticatedView(userName!, profilePath, logoutPath);
    }
  }

  authenticatedView(userName:string|null, profilePath:string, logoutPath:any){
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
      </NavItem>
      <NavItem>
      < NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
      </NavItem>
    </Fragment>)
  }

  anonymousView(registerPath:string, loginPath:string){
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
      </NavItem>
      <NavItem>
      < NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
      </NavItem>
    </Fragment>)
  }  
}
