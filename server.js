require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// MongoDB Atlas Connection
// -----------------------------
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch(err => console.log("❌ Connection Error:", err));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// ======================================================
// 1️⃣ ERP Schema (Collection: erp)
// ======================================================
const ErpSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  primaryColor: String,
  secondaryColor: String,
  layout: String,
  features: [String],
  totalPrice: Number,
  totalDays: Number,
  institutionDetails: String,
  createdAt: { type: Date, default: Date.now }
});
const Erp = mongoose.model("erp", ErpSchema, "erp");

// ERP Route
app.post("/submit", async (req, res) => {
  try {
    const order = new Erp(req.body);
    await order.save();
    const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",   // where you want to receive
      subject: "New ERP Order Received 🚀",
      html: `
        <h3>New ERP Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Price:</strong> ₹${req.body.totalPrice}</p>
        <p><strong>Days:</strong> ${req.body.totalDays}</p>
        <p><strong>Primary Color:</strong> ${req.body.primaryColor}</p>
        <p><strong>Secondary Color:</strong> ${req.body.secondaryColor}</p>
        <p><strong>Features:</strong> ${req.body.features.join(", ")}</p>
        <p><strong>Description:</strong> ${req.body.institutionDetails}</p>
        <p><strong>Created At:</strong> ${order.createdAt}</p>
      `
    };
    // Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));
    res.json({ message: "Requirements saved and sent successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// ======================================================
// 2️⃣ Portfolio Schema (Collection: port1)
// ======================================================
const portfolioSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  primaryColor: String, 
  features: [String],
  price: Number,
  days: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Portfolio = mongoose.model("port1", portfolioSchema, "port1");

// Portfolio Route
app.post("/submit-portfolio1", async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
     const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",   // where you want to receive
      subject: "New Portfolio Order Received 🚀",
      html: `
        <h3>New Portfolio Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Price:</strong> ₹${req.body.price}</p>
        <p><strong>Days:</strong> ${req.body.days}</p>
        <p><strong>Primary Color:</strong> ${req.body.primaryColor}</p>
        <p><strong>Features:</strong> ${req.body.features.join(", ")}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Created At:</strong> ${newPortfolio.createdAt}</p>
      `
    };
// Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));
    res.json({ message: "Requirements saved and sent successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// ======================================================
// 3️⃣ Designer Portfolio Schema (Collection: port2)
// ======================================================
const designerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  primaryColor: String,
  features: [String],
  price: Number,
  days: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const DesignerPortfolio = mongoose.model("port2", designerSchema, "port2");

// Designer Portfolio Route
app.post("/submit-portfolio2", async (req, res) => {
  try {
    const newOrder = new DesignerPortfolio(req.body);
    await newOrder.save();
    const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",   // where you want to receive
      subject: "New Portfolio Order Received 🚀",
      html: `
        <h3>New Portfolio Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Price:</strong> ₹${req.body.price}</p>
        <p><strong>Days:</strong> ${req.body.days}</p>
        <p><strong>Primary Color:</strong> ${req.body.primaryColor}</p>
        <p><strong>Features:</strong> ${req.body.features.join(", ")}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Created At:</strong> ${req.body.createdAt}</p>
        <p><strong>Created At:</strong> ${newOrder.createdAt}</p>
      `
    };
    // Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));

    res.json({ message: "Requirements saved and sent successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// ======================================================
// 3️⃣ Freelancer Portfolio Schema (Collection: port3)
// ======================================================
const freelancer = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  primaryColor: String,
  features: [String],
  price: Number,
  days: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const FreelancerPortfolio = mongoose.model("port3", freelancer, "port3");

// Freelancer Portfolio Route
app.post("/submit-portfolio3", async (req, res) => {
  try {
    const newOrder = new FreelancerPortfolio(req.body);
    await newOrder.save();
    const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",   // where you want to receive
      subject: "New Portfolio Order Received 🚀",
      html: `
        <h3>New Portfolio Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Price:</strong> ₹${req.body.price}</p>
        <p><strong>Days:</strong> ${req.body.days}</p>
        <p><strong>Primary Color:</strong> ${req.body.primaryColor}</p>
        <p><strong>Features:</strong> ${req.body.features.join(", ")}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Created At:</strong> ${req.body.createdAt}</p>
        <p><strong>Created At:</strong> ${newOrder.createdAt}</p>
      `
    };
    // Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));

    res.json({ message: "Requirements saved and sent successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// ======================================================
// 3️⃣ Business Website Schema (Collection: web)
// ======================================================
const business = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  primaryColor: String,
  secondaryColor: String,
  features: [String],
  price: Number,
  days: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const businessweb = mongoose.model("web", business, "web");

// Business Website Route
app.post("/submit-website", async (req, res) => {
  try {
    const newOrder = new businessweb(req.body);
    await newOrder.save();
    const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",   // where you want to receive
      subject: "New Website Order Received 🚀",
      html: `
        <h3>New ERP Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Price:</strong> ₹${req.body.price}</p>
        <p><strong>Days:</strong> ${req.body.days}</p>
        <p><strong>Primary Color:</strong> ${req.body.primaryColor}</p>
        <p><strong>Secondary Color:</strong> ${req.body.secondaryColor}</p>
        <p><strong>Features:</strong> ${req.body.features.join(", ")}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Created At:</strong> ${newOrder.createdAt}</p>
      `
    };
    // Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));
    res.json({ message: "Requirements saved and sent successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})



// ======================================================
// 4️⃣ Contact Schema (Collection: contact)
// ======================================================

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  purpose: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model("contact", contactSchema, "contact");

// Contact Route
app.post("/submit-contact", async (req, res) => {
  try {

    const newContact = new Contact(req.body);
    await newContact.save();

    const mailOptions = {
      from: "adercraft39@gmail.com",
      to: "adercraft39@gmail.com",
      subject: "📩 New Contact Request",
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Mobile:</strong> ${req.body.mobile}</p>
        <p><strong>Purpose:</strong> ${req.body.purpose}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Created At:</strong> ${newContact.createdAt}</p>
      `
    };

    // Save first
    await newOrder.save();
    
    // Send mail in background (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Mail sent successfully"))
      .catch(err => console.log("Mail error:", err));

    res.json({ message: "✅ Contact request sent successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});





app.get("/", (req,res)=>{
  res.send("Backend working 🚀");
});


// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

