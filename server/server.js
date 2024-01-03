const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const passport = require('passport')
const session = require('express-session')
const PORT = process.env.PORT || 3000
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const loginRoute = require('./routes/loginRoute')
const assistantRoutes = require('./routes/assistantRoute')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const loginController = require('./controllers/loginController')
const refreshRoute = require('./routes/refreshRoute')
const logoutRoute = require('./routes/logoutRoute')
const appointmentsRoute = require('./routes/appointmentsRoute')
const schedulesRoute = require('./routes/schedulesRoute')
const specializationRoute = require('./routes/specializationRoute')
const asyncHandler = require('express-async-handler');
const doctorRoute = require("./routes/doctorRoute")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const googleUser = require('./models/googleUser')
const cookieParser = require('cookie-parser')
const app = express()


dotenv.config()

connectDB()


//OPTION 1
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true
// }));

app.use(credentials)

//OPTION 2
app.use(cors(corsOptions))


//middleware
app.use(express.json())


app.use(cookieParser())


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).json({message: 'Unauthorized'})
  }
}

async function getGoogleUserById(userId) {
  try {
    const user = await googleUser.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await googleUser.findOne({googleId: profile.id})
        if(!user) {
          const newUser = new googleUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          })

          await newUser.save()
          console.log('New user created!: ', newUser);
          done(null, newUser)
        } else {
          console.log('Existing user found: ', user);
          done(null, user)
        }
      } catch (err) {
        console.log(err);
        done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, {_id: user._id, roles: user.roles})
})

passport.deserializeUser(async (obj, done) => {
  try {
    googleUser.findById(obj._id).then((user)=>{
      done(null, user);
    })
  } catch (error) {
    done(error, null);
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*60}
}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:5173/login'}), (req, res) => {
  res.redirect('http://localhost:5173/home')
})


app.get('/get-current-user', (req, res) => {
  const userData = req.user
  
  res.send(userData)
  // if(req.isAuthenticated()){
  //   const { _id, email } = req.user
  //   const simplifiedUser = { _id, email }
  //   res.json(simplifiedUser)
  // } else{
  //   res.status(401).send('Unauthorized')
  // }
})


app.get('/example', (req, res) => {
  const sessionData = req.user;
  
  console.log('Session Data:', sessionData);


  res.json(sessionData);
});


app.get('/logout', (req,res) =>{
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destring session: ', err);
    }
  })
  // res.redirect('http://localhost:5173/login')
})

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}


app.use('/users', userRoutes)
app.post('/login', asyncHandler(loginController.loginUser))
app.use('/doctors', doctorRoute)
app.use('/appointments', appointmentsRoute)
app.use('/schedules', schedulesRoute)
app.use('/specializations', specializationRoute)
app.use('/refresh', refreshRoute)
app.use('/assistants', assistantRoutes)
app.use('/logout', logoutRoute)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    }
    else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
})

mongoose.connection.on('error', error => {
    console.log(error);
})