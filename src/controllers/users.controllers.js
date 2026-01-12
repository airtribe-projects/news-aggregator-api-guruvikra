const User = require('../models/users.js')

const signUp = async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            preferences
        })

        res.status(200)
            .json({"message": "User created successfully"})

    } catch (err) {
        if (err.name === 'ValidationError') {
            console.error(err);
            res.status(400).json({ error: 'Validation Error' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = await user.generateAccessToken()

        return res.status(200)
            .json({
                message: "Login successfully",
                token: token
            })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getPreferences = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email})
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ preferences: user.preferences });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserPreferences = async (req, res) => {
    try {
        const preferences = req.body.preferences
        if (!preferences) {
            return res.status(400).json({ error: 'Invalid preferences format' });
        }
        const user = await User.findOneAndUpdate(
            { email: req.user.email },
            { $addToSet: { preferences: { $each: preferences } } },
            { new: true }
        );

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).
            json({
                message: "Preferences updated",
                preferences: user.preferences
                });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

}




module.exports = {
    signUp,
    login,
    getPreferences,
    updateUserPreferences
}
