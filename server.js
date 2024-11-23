const express = require('express')
const dbConnect = require('./config/datatbase')
const authRoutes = require('./routes/auth')
const googleAuthRoutes = require('./routes/googleAuth')
require('dotenv').config()
const fileUpload = require('express-fileupload')
const cloudinaryConnect = require('./config/cloudinary')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const passportSetup = require('./config/passport')

const app = express()

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(session({
    secret: 'cyberwolve', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, 
    },
}));
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/auth', googleAuthRoutes)

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send("Welcome to the API")
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

cloudinaryConnect()
dbConnect()
