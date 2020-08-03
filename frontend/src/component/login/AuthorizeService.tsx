import { UserManager, WebStorageStateStore, User } from 'oidc-client';
import { ApplicationPaths, ApplicationName} from './Constrants';

interface completeSignInOutReturnType {
  status: string;
  state?: any;
  message?: string;
}

export class AuthorizeService {
  _callbacks:any[] = [];
  _nextSubscriptionId = 0;
  _user?:User|null = undefined;
  _isAuthenticated = false;
  userManager?:UserManager = undefined;

  // pop up doesn't work properly on Edge
  _popUpDisabled = true;

  async isAuthenticated() {
    const user = await this.getUser();
    return !!user;
  }

  async getUser(){
    if (this._user && this._user!.profile) {
      return this._user!.profile;
    }
    await this.ensureUserManagerInitialized();
    const user = await this.userManager!.getUser();
    return user && user.profile;
  }

  // 3 ways:
  // 1. silently = already logged in
  // 2. try to use a pop-up window
  // 3. redirect to login
  async signIn(state:any) {
    await this.ensureUserManagerInitialized();
    try {
      const silentUser = await this.userManager!.signinSilent(this.createArguments());
      this.updateState(silentUser);
      return this.success(state);
    } catch (silentError) {
      // User may not be authenticated, try popup authentication
      console.log("Silent authentication error: ", silentError);
      try {
        if (this._popUpDisabled) {
          throw new Error('Popup disabled. Change setting in \'AuthorizeService.tsx\' to enable it');
        }

        const popUpUser = await this.userManager!.signinPopup(this.createArguments());
        this.updateState(popUpUser);
        return this.success(state);
      } catch (popUpError) {
        if (popUpError.message === "Popup window closed") {
          // The user closed login popup window.
          return this.error("The user closed the window.");
        } else if (!this._popUpDisabled) {
          console.log("Popup authentication error: ", popUpError);
        }

        //popup may be blocked. fallback to redirect
        try {
          await this.userManager!.signinRedirect(this.createArguments(state));
          return this.redirect();
        } catch (redirectError) {
          console.log("Redirect authentication error: ", redirectError);
          return this.error(redirectError);
        }
      }
    }
  }

  async completeSignIn(url: string): Promise<completeSignInOutReturnType> {
    try {
      await this.ensureUserManagerInitialized();
      const user = await this.userManager!.signinCallback(url);
      this.updateState(user);
      return this.success(user && user.state);
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return this.error('There was an error signing in.');
    }
  }

  // 2 ways
  // 1. try to signout using a popup window
  // 2. redirect
  async signOut(state:any) {
    await this.ensureUserManagerInitialized();
    try {
      if (this._popUpDisabled) {
        throw new Error('Popup disabled. Change setting in \'AuthorizeService.tsx\' to enable it');
      }
      await this.userManager?.signoutPopup(this.createArguments());
      this.updateState(undefined);
      return this.success(state);
    } catch (popUpSignOutError) {
      console.log("Popup signout error: ", popUpSignOutError);
      try {
        await this.userManager?.signoutRedirect(this.createArguments(state));
        return this.redirect();
      } catch (redirectSignOutError) {
        console.log("Redirect signout error: ", redirectSignOutError);
        return this.error(redirectSignOutError);
      }
    }
  }

  async completeSignOut(url: string): Promise<completeSignInOutReturnType> {
    await this.ensureUserManagerInitialized();
    try {
      const response:any = await this.userManager?.signoutRedirect(url);
      this.updateState(null);
      return this.success(response && response.data);
    } catch (error) {
      console.log(`There was an error trying to log out '${error}'.`);
      return this.error(error);
    }
  }

  updateState(user?:any) {
    this._user = user;
    this._isAuthenticated = !!this._user;
    this.notifySubscribers();
  }

  subscribe(callback:any) {
    this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
    return this._nextSubscriptionId - 1;
  }

  unsubscribe(subscriptionId:any) {
    const subscriptionIndex = this._callbacks
      .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false, index })
      .filter(element => element.found === true);
    if (subscriptionIndex.length !== 1) {
      throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
    }
    this._callbacks = this._callbacks.splice(subscriptionIndex[0]!.index, 1);
  }

  notifySubscribers() {
    for (let i = 0; i < this._callbacks.length; i++) {
      const callback = this._callbacks[i].callback;
      callback();
    }
  }

  createArguments(state?:any) {
    return { useReplaceToNavigate: true, data: state};
  }

  error(message:string) {
    return { status: AuthenticationResultStatus.Fail, message};
  }

  success(state:any) {
    return { status: AuthenticationResultStatus.Success, state };
  }

  redirect(){
    return { status: AuthenticationResultStatus.Redirect };
  }

  async ensureUserManagerInitialized() {
    if (this.userManager !== undefined) {
      return ;
    }
    console.log(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
    let response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}`);
    }
    let settings = await response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    settings.userStore = new WebStorageStateStore({
      prefix: ApplicationName
    });
    this.userManager = new UserManager(settings);
    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager?.removeUser();
      this.updateState(undefined);
    });
  }

  static get instance() { return authService }
}

const authService = new AuthorizeService();
  
export default authService;

export const AuthenticationResultStatus = {
  Redirect: 'redirect',
  Success: 'success',
  Fail: 'fail'
};