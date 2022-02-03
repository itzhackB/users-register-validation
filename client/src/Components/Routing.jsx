import React from 'react';
import CreateUser from './CreateUser';
import Table from './TableUsers';
import { Route, Switch } from 'react-router-dom'

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={CreateUser} />
            <Route path={'/all-users'} component={Table} />
        </Switch>
    );
};

export default Routing;
