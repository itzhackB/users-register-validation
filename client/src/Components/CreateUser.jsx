import React, { useState, useEffect } from 'react';
import stateHanler from '../utils/stateHandler'

const CreateUser = () => {

    useEffect(() => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        setCurrentDate(`${yyyy}-${mm}-${dd}`);
    }, []);


    const [currentDate, setCurrentDate] = useState();
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});

    const addUser = () => {

        fetch('/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((data) => data.json())
            .then((data) => data.success === false ? setErrors(data.errors) : setErrors({} ))
            .catch((err) => console.log(err))
            .finally(() => console.log(errors))

    }


    return (
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
                                    return <li style={{color:"red"}}>{errors[fieldName]}</li>
                                })
                            }
                        </ul>
                    </div>
                    :
                    ""
            }

        </div>
    );
};

export default CreateUser