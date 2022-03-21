const MailAPI = require("../models/mailapi");
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { validIP, apiKey } = req.body;
  const foundIP = await MailAPI.findOne({ where: { validIP: validIP, apiKey:apiKey } });
  if (!foundIP ) return res.sendStatus(401);
  // console.log(foundIP.credits<0)
  if((foundIP.credits)<=0) return res.status(400).json({'message':'sorry you do not have enough credits left'})
  if (foundIP && (foundIP.credits)>0) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD,
      },
    });
    const mailConfigurations = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    });

    res.status(201).json({ success: "Mail sent Successfully" });
    foundIP.credits = foundIP.credits - 1;
    const result = await foundIP.save();
    console.log(foundIP.credits);
  }
};

module.exports = { sendMail };
