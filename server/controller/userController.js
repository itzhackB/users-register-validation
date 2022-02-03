const User = require('../model/user');
const validator = require('../assist/validator');

const get_all_users = (req, res) => {

    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
}

const create_user = async (req, res) => {

    const { errors, isValid } = validator(req.body);

    if (!isValid) {
        return res
            .status(401)
            .json({
                success: false,
                message: "there is error with validation",
                errors: errors
            });
    }

    await User.findOne({ email: req.body.email }, (err, result) => {
        if (err) throw err;
        if (result) {
            return res
                .status(401)
                .json({
                    success: false,
                    errors:
                    {email: "email already exists"}
                });
        }


        const user = new User(req.body);
        try {
            user.save();
            res
                .status(201)
                .json({
                    success: true,
                    message: "create new user success",
                    data: user,
                });
        } catch (err) {
            res
                .status(400)
                .json({
                    success: false,
                    message: "create new user filed",
                    error: err.message,
                });
        }
    });

}

const delete_user = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(result => {
            res.send('User deleted')
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    get_all_users,
    create_user,
    delete_user
}