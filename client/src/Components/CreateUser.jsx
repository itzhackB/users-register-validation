import React, { useState, useEffect } from 'react';
import stateHanler from '../utils/stateHandler'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CreateUser = () => {
    const [currentDate, setCurrentDate] = useState();
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState();

    useEffect(() => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        setCurrentDate(`${yyyy}-${mm}-${dd}`);

        fetch('user/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((data) => data.json())
            .then((data) => setUsers(data.results));
    }, [errors]);



    const addUser = () => {

        fetch('user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((data) => data.json())
            .then((data) => data.success === false ? setErrors(data.errors) : setErrors({}))
            .catch((err) => console.log(err))
            .finally(() => console.log(errors))

    }


    return (
        <>
            <div class="create-blog content">

                <label for="firstName">First Name:</label>
                <input type="text" id="title" name="firstName" required
                    onChange={(e) => stateHanler(e, user, setUser)}
                />

                <label for="lastName">Last Name:</label>
                <input type="text" id="snippet" name="lastName" required
                    onChange={(e) => stateHanler(e, user, setUser)}
                />

                <label for="id">ID:</label>
                <input type="text" id="snippet" name="id" required
                    onChange={(e) => stateHanler(e, user, setUser)}
                />

                <label for="birthDay">BirthDay:</label>
                <input type="date" id="snippet" name="birthDay" required
                    defaultValue={currentDate}
                    onChange={(e) => stateHanler(e, user, setUser)}
                />

                <label for="email">Email:</label>
                <input type="email" id="snippet" name="email" required
                    onChange={(e) => stateHanler(e, user, setUser)}
                />


                <button onClick={addUser}>Submit</button>

                {
                    errors ?
                        <div className='err'>
                            <ul>
                                {
                                    Object.keys(errors).map((fieldName, fieldIndex) => {
                                        return <li style={{ color: "red" }}>{errors[fieldName]}</li>
                                    })
                                }
                            </ul>
                        </div>
                        :
                        ""
                }

            </div>
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Birth Day</TableCell>
                                <TableCell align="right">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users?.length > 0 ?
                                    users?.map((user) => (
                                        <TableRow
                                            key={user._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="right">{user.firstName}</TableCell>
                                            <TableCell align="right">{user.lastName}</TableCell>
                                            <TableCell align="right">{user.birthDay}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                        </TableRow>

                                    ))
                                    :
                                    ""
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </>
    );
};

export default CreateUser