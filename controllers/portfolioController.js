const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//transport is the module that actually sends out email , configuring it below

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //email matter
    transporter.sendMail({
      to: "rahul.nain261141@gmail.com",
      from: "rahul.nain261141@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
      <h5>Detail Information</h5>
       <ul>
           <li><p>Name : ${name}</p></li>
           <li><p>Email : ${email}</p></li>
           <li><p>Message : ${msg}</p></li>
       </ul>
      `,
    });

    res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
