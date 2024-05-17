import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import UserRouter from './Router/UserRouter.js'
import VehicleRoute from './Router/VehicleRouter.js'
import mongoose from 'mongoose'

const app=express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/api/v1/user',UserRouter)  
app.use('/api/v1/vehicle',VehicleRoute)

// config dotenv
dotenv.config()

// Connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

const PORT=process.env.PORT||4000

app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
)
