import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
// import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

import AuthOrApp from './authOrApp';
import Dashboard2 from '../dashboard2/dashboard2';
import BillingCycle from '../billingCycle/billingCycle';

export default props => (
    <div className='content-wrapper'>
        <Switch>
            <Route exact path='/' component={Dashboard2} />
            <Route path='/billingCycles' component={BillingCycle} />
            <Redirect from='*' to="/" />
        </Switch>
    </div>

    // <Router history={hashHistory}>
    //     <Route path='/' component={AuthOrApp}>
    //         <IndexRoute component={Dashboard2} />
    //         <Route path='billingCycles' component={BillingCycle} />
    //     </Route>
    //     <Redirect from='*' to="/" />
    // </Router>
)