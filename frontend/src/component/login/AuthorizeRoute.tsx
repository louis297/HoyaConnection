import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './Constrants'
import authService from './AuthorizeService';

interface Iprops {
  component: any
  path?: string
}
interface Istate {
  ready: boolean,
  authenticated: boolean,
}
export default class AuthorizeRoute extends Component<Iprops, Istate> {
  _subscription?: number;
  constructor(props: Iprops){
    super(props);

    this.state = {
      ready: false,
      authenticated: false
    }
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.authenticationChanged());
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  render() {
    const { ready, authenticated } = this.state;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`;
    if(!ready){
      return <div></div>;
    } else {
      const { component: Component, ...rest } = this.props;
      return <Route {...rest}
        render={(props)=> {
          if(authenticated) {
            return <Component {...props} />
          } else {
            return <Redirect to={redirectUrl} />
          }
        }} />
    }
  }
  async populateAuthenticationState(){
    const authenticated: boolean = await authService.isAuthenticated();
    this.setState({ ready: true, authenticated });
  }

  async authenticationChanged(){
    this.setState({ ready: false, authenticated: false });
    await this.populateAuthenticationState();
  }
}
