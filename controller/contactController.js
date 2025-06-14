const crypto = require("crypto");
const nodemailer = require("nodemailer");

const contactController = async (req, res) => {
  try {
    const formData = req.body; // ✅ correct spelling
    const { firstName, lastName, jobTitle, companyName, email, message } = formData;
    console.log(formData);

    const requestId = crypto.randomBytes(4).toString("hex");

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const orgMailOptions = {
      from: `"BrandScaler Contact" <${process.env.MAIL_USER}>`,
      to: process.env.ORG_EMAIL,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `...`, // your HTML is perfect
    };

    const userMailOptions = {
      from: `"BrandScaler Team" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `We received your message at BrandScaler`,
      html: `...`, // your HTML is perfect
    };

    await transporter.sendMail(orgMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, requestId });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = contactController;
