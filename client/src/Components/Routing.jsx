import React from 'react';
import CreateUser from './CreateUser';
import Table from './TableUsers';
import { Route, Switch } from 'react-router-dom'

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={CreateUser} />
        </Switch>
    );
};

export default Routing;
