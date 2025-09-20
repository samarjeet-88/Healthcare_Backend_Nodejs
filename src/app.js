import express from "express"
import userRoutes from "./routes/user.routes.js"
import patientRoutes from "./routes/patient.routes.js"
import doctorRoutes from "./routes/doctor.route.js"
import mappingRoutes from "./routes/mapping.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"




const app=express()

app.use(cors())

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',userRoutes)
app.use('/api',patientRoutes)
app.use('/api',doctorRoutes)
app.use('/api',mappingRoutes)

export default app