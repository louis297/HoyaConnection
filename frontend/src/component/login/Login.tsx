import React, { Component } from 'react';
import authService, { AuthenticationResultStatus } from './AuthorizeService'
import { LoginActions, QueryParameterNames, ApplicationPaths } from './Constrants'

interface Iprops {
  action:string
}

interface Istate {
  returnUrl?:string,
  message?:string|null,
}

// handle user's login process
// this is the start point of login process
// any component that needs to authenticate a user can simply redirect to this component with a return Url
export class Login extends Component<Iprops, Istate> {
  constructor(props:any) {
    super(props);

    this.state = {
      message: undefined
    }
  }

  componentDidMount() {
    const action = this.props.action;
    switch(action) {
      case LoginActions.Login:
        this.login(this.getReturnUrl());
        break;
      case LoginActions.LoginCallback:
        this.processLoginCallback();
        break;
      case LoginActions.LoginFailed:
        const params = new URLSearchParams(window.location.search);
        const error = params.get(QueryParameterNames.Message);
        this.setState({ message:error });
        break;
      case LoginActions.Profile:
        this.redirectToProfile();
        break;
      case LoginActions.Register:
        this.redirectToRegister();
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  }

  render(){
    const action = this.props.action;
    const { message } = this.state;
    if (!!message) {
      return <div>{message.toString()}</div>
    } else {
      switch (action) {
        case LoginActions.Login:
          return (<div>Processing login</div>);
        case LoginActions.LoginCallback:
          return (<div>Processing login callback</div>);
        case LoginActions.Profile:
        case LoginActions.Register:
          return (<div></div>)
        default:
          throw new Error(`Invalid action '${action}'`);
      }
    }
  }

  async login(returnUrl:string) {
    const state = { returnUrl };
    const result:any = await authService.signIn(state);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        break;
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(returnUrl);
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(`Invalid authentication result status '${result.status}'.`);
    }
  }

  async processLoginCallback() {
    const url = window.location.href;
    const result = await authService.completeSignIn(url);
    switch (result.status) {
      case AuthenticationResultStatus.Redirect:
        // There should not be any redrects
        // Only completeSignIn finishes is when we are doint a redirect sign in flow
        throw new Error('Should not redirect.');
      case AuthenticationResultStatus.Success:
        await this.navigateToReturnUrl(this.getReturnUrl(result.state));
        break;
      case AuthenticationResultStatus.Fail:
        this.setState({ message: result.message });
        break;
      default:
        throw new Error(`Invalid authentication result status '${result.status}'.`);
    }
  }

  getReturnUrl(state?:Istate) {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}`)) {
      // this is an extra check to prevent open redirects.
      throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
    }
    return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
  }

  redirectToRegister() {
    this.redirectToApiAuthorizationPath(`${ApplicationPaths.IdentityRegisterPath}?${QueryParameterNames.ReturnUrl}=${encodeURI(ApplicationPaths.Login)}`);
  }

  redirectToProfile() {
    this.redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
  }

  redirectToApiAuthorizationPath(apiAuthorizationPath:string) {
    const redirectUrl = `${window.location.origin}${apiAuthorizationPath}`;
    // It is important to replace url to avoid hitting back arrow to get to this component
    // and user should be back to where it was on the app
    window.location.replace(redirectUrl);
  }

  navigateToReturnUrl(returnUrl:string) {
    // It is important to replace url here to remove the callback uri with the 
    // fragment containing the tokens from the browser history.
    window.location.replace(returnUrl);
  }  
}