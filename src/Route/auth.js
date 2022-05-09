const router = require('express').Router();
const { body, validationResult } = require('express-validator')
const userdetails = require('../Model/user')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

router.post('/register', [body('email', 'Enter a valid email').isEmail(), body('name', 'Name must be 6 characters long').isLength({ min: 6 })], async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ msg: errors.array() })

    const { name, password, email } = req.body;
        // if (!name)
        //     return res.status(400).send({ msg: "name must be provided" })
        // if (!password)
        //     return res.status(400).send({ msg: "password must be provided" })
        // if (!email)
        //     return res.status(400).send({ msg: "email must be provided" })

        //check email
        const result = await userdetails.findOne({ email: email })
        if (result)
            return res.status(400).send({ msg: "email already exist!!!" })

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new userdetails({
            name: name,
            email: email,
            password: hashedPassword
        })

        await user.save();
        const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET_TOKEN)
        return res.status(200).send({ authtoken: token });
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.post('/login',[body('email', 'Enter a valid email').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ msg: errors.array() })
    
    const { email, password } = req.body
    try {
        if (!email)
            return res.status(400).send({ msg: "Email not provided" })
        if (!password)
            return res.status(400).send({ msg: "Password not provided" })

        //emaiil
        const users = await userdetails.findOne({ email: email })
        if (!users)
            return res.status(400).send({ msg: "Email not found" });

        //password
        const matched = await bcrypt.compare(password, users.password)
        if (!matched)
            return res.status(400).send({ msg: "Invalid Credentials" });

        // token
        const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET_TOKEN)
        return res.status(200).send({ authtoken: token });
    } catch (e) {
        return res.status(500).send(e);
    }
})

module.exports = router;  