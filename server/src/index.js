const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const route = require('./routes');
const db = require('./configs/db.config');
const dotenv = require('dotenv');
const User = require('./models/user.models');
const { generateToken } = require('./utils/auth');
// Config dotenv
dotenv.config();
// Connect to the database
db.connectDatabase();

const app = express();
const port = process.env.PORT || 3333;
// Allow permission for PUT DELETE
app.use(methodOverride('_method'))
app.use(cors());
app.use(express.json()); // gửi từ code javascript
app.use(express.static(path.join(__dirname, 'public'))); // Cấp quyền cho phép người dùng có thể xem được những thứ trong folder public
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ['profile', 'email'],
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        if (profile.emails[0].value) {
            User.findOne({ email: profile.emails[0].value })
                .then(user => {
                    if (user) {
                        if (user.image === '') {
                            user.image = profile.photos[0].value;
                        }
                        user.save();
                        done(null, user);
                    } else {
                        const newUser = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            image: profile.photos[0].value,
                            isAdmin: false,
                        });
                        newUser.save();
                        done(null, newUser);
                    }
                })

        } else {
            return done(null, false);
        }
    }
    , function () { }))
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});
// after login success redirect to home page
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
        res.status(200).send({
            token: generateToken(req.user),
        });
    });
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }))
//Routes init
route(app);

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})