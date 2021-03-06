import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import NewRecipe from '../../views/NewRecipe/NewRecipe';

// import AuthService from '../../modules/Auth/AuthService';
import WithAuth from '../../components/WithAuth';
// const Auth = new AuthService();

class Full extends Component {

  render() {
    return (
      <div className="app">
        {/*<Header />*/}
        {/*<div className="app-body">*/}
          {/*<Sidebar {...this.props}/>*/}
          {/*<main className="main">*/}
            {/*<Breadcrumb />*/}
            {/*<Container fluid>*/}
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/new-recipe" name="NewRecipe" component={NewRecipe}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            {/*</Container>*/}
          {/*</main>*/}
          {/*<Aside />*/}
        {/*</div>*/}
        {/*<Footer />*/}
      </div>
    );
  }
}

// export default WithAuth(Full);
export default Full;
