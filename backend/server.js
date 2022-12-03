import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import Stripe from "stripe";
import cors from "cors";
import path from "path";
import passport from "passport";
import session from "express-session";
import passportjs from "./config/passport.js";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import internRoutes from './routes/internRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import innovationRoutes from "./routes/innovationRoutes.js";
import counselRoutes from "./routes/counselRoutes.js";
import aimRoutes from "./routes/aimRoutes.js";
import sharpenRoutes from './routes/sharpenRoutes.js';
import commitmentRoutes from "./routes/commitmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contentRoutes from './routes/contentRoutes.js';
import Content from './models/contentModel.js';
import internFormRoutes from './routes/internFormRoutes.js';
import affRoutes from './routes/affRoutes.js';

dotenv.config();

//passport config
passportjs(passport);
connectDB();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET);
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
// Sessions
app.use(
  session({
    secret: "keyboardMatE",
    resave: false,
    saveUninitialized: false,
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/innovation", innovationRoutes);
app.use("/api/aim", aimRoutes);
app.use("/api/counsel", counselRoutes);
app.use("/api/commitment", commitmentRoutes);
app.use("/api/sharpen",sharpenRoutes);
app.use("/api/content",contentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/intern",internRoutes);
app.use("/api/faculty",facultyRoutes);
app.use("/api/internForm",internFormRoutes);
app.use("/api/aff",affRoutes);
app.post("/api/payment_intents", async (req, res) => {
  
  
  try {
    const content=await Content.findOne({name:"content"})
    console.log(content.sharpPrice)
    
    const { amountType, receipt_email } = req.body;
    console.log(amountType)
    let amount = 0;
    if (amountType === "counsel") {
      amount = content.counselPrice * 100;
    }
    if (amountType === "signup") {
      amount = content.signupPrice * 100;
    }
    if (amountType=== "TeamQ"){
      amount= content.teamqPrice*100;
    }
    if (amountType=== "Diam"){
      amount= content.diamPrice*100;
    }
    if (amountType=== "Resillience"){
      amount= content.resPrice*100;
    }
    if(amountType=== "university")
    {
      amount=content.uniPrice*100;
    }
    if(amountType==="sharp"){
      amount=content.sharpPrice*100;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      receipt_email,
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))




if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//custom err middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);
