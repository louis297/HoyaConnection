import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Layout from './component/Layout';
import { Route } from 'react-router-dom';
import Home from './component/Home';
import AuthorizeRoute from './component/login/AuthorizeRoute';
import Board from './component/Board';
import { ApplicationPaths } from './component/login/Constrants';
import ApiAuthorizationRoutes from './component/login/ApiAuthorizationRoutes';
import AccountLogin from './component/login/AccountLogin';
import AccountRegister from './component/login/AccountRegister';
import IdentityManage from './component/login/IdentityManage';
import MapComponent from './component/map/MapComponent';

function App() {
  return (
    <Layout> 
      <Route exact path='/' component={Home}/>
      <Route path='/map' component={MapComponent}/>
      {/* <Route path={ApplicationPaths.Login} component={AccountLogin} />
      <Route path={ApplicationPaths.Register} component={AccountRegister} /> */}
      {/* <Route path={ApplicationPaths.IdentityManagePath} component={IdentityManage} /> */}
      <AuthorizeRoute path='/board' component={Board}/>
      <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
    </Layout>
  );
}

export default App;
