import express from "express";
import cors from "cors";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// ---------- CONTACT FORM ----------
// app.post("/api/contact", async (req, res) => {
//   const { name, email, phone, company, message } = req.body;

//   try {
//     await transporter.sendMail({
//       from: `"SmooothGrow Leads" <${process.env.EMAIL_USER}>`,
//       to: process.env.RECEIVER_EMAIL,
//       subject: "New Contact Lead 🚀",
//       html: `
//         <h2>New Contact Lead</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Company:</b> ${company}</p>
//         <p><b>Message:</b><br/>${message}</p>
//       `,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });



app.post("/api/contact", (req, res) => {
  const { name, email, phone, company, message } = req.body;

  // ✅ Respond instantly (UX)
  res.json({ success: true });

  // 🔥 Send email asynchronously
  resend.emails
    .send({
      from: "SmooothGrow <onboarding@resend.dev>",
      to: [process.env.RECEIVER_EMAIL],
      subject: "New Contact Lead 🚀",
      html: `
        <h2>New Contact Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    })
    .catch((err) => console.error("Resend error:", err));
});



// ---------- QUOTE FORM ----------
// app.post("/api/quote", async (req, res) => {
//      console.log("QUOTE BODY:", req.body); // 👈 ADD THIS
//   const { name,email, phone, sector, services, budget, timeline } = req.body;

//   try {
//     await transporter.sendMail({
//       from: `"SmooothGrow Leads" <${process.env.EMAIL_USER}>`,
//       to: process.env.RECEIVER_EMAIL,
//       subject: "New Quote Request 📈",
//       html: `
//         <h2>New Quote Request</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//   <p><b>Phone:</b> ${phone}</p>
//         <p><b>Sector:</b> ${sector}</p>
//         <p><b>Services:</b> ${services.join(", ")}</p>
//         <p><b>Budget:</b> ${budget}</p>
//         <p><b>Timeline:</b> ${timeline}</p>
//       `,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });





app.post("/api/quote", (req, res) => {
  const { name, email, phone, sector, services, budget, timeline } = req.body;

  // ✅ Respond instantly
  res.json({ success: true });

  // 🔥 Async email
  resend.emails
    .send({
      from: "SmooothGrow <onboarding@resend.dev>",
      to: [process.env.RECEIVER_EMAIL],
      subject: "New Quote Request 📈",
      html: `
        <h2>New Quote Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Sector:</b> ${sector}</p>
        <p><b>Services:</b> ${services.join(", ")}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Timeline:</b> ${timeline}</p>
      `,
    })
    .catch((err) => console.error("Resend error:", err));
});



// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
