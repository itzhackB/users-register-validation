import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <div class="site-title">
                <Link to={"/"}><h1>Itzhack's.B </h1></Link>
                <p>User App</p>
            </div>
            <ul>
                <li><Link to={'/'}>Create User</Link></li>
                <li><Link to={'/all-users'}>Users</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
