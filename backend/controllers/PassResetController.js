const { getSupabase } = require("../DataBase/DBConnection");
const nodemailer = require('nodemailer');
const sendGridTransport = require("nodemailer-sendgrid-transport");



var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
  user: 's11924807@stu.najah.edu',
  pass: 'zts@54166'
  },
  tls: {
  rejectUnauthorized: false
  }
  });
exports.sendForgetPasswordCode = async (req, res, next) => {
  const EMAIL = req.body.eMail;
  const { data, error } = await getSupabase()
    .from("Person")
    .select("Email")
    .ilike('Email', `%${EMAIL}%`)

  if (error) {
    res.status(500).json({ error: error.message });
  } else if (data.length == 0) {
    res.status(404).json({ error: "There is no user registered with this email" });
  } else {
    try {
    
      const newPassword = generateStrongPassword();
  
      await transporter.sendMail({
        to : EMAIL,
        from : 's11924807@stu.najah.edu',
        subject : 'Forgotten your SAWOM account password? No worries -- it happens!',
        sender : 's11924807@stu.najah.edu',
        html : "<p>Your new password is :" +newPassword+  "</p><p>please don't forget to sign in and change it as soon as possible!</p>"
      })
      const { data} = await getSupabase()
      .from('Person')
      .update({ Password: newPassword })
      .ilike('Email', `%${EMAIL}%`)
      res.status(200).json({ Message: "Success" });


    }
    catch(err) {
      res.status(500).json({ error: next (err) });

    }
  }
  
}

function generateStrongPassword() {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=';

  const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

  let password = '';

  // Generate at least one character from each character set
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(numericChars);
  password += getRandomChar(specialChars);

  // Generate remaining characters
  for (let i = 4; i < 12; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the password string
  password = shuffleString(password);

  return password;
}

function getRandomChar(characters) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

function shuffleString(string) {
  let shuffledString = '';
  const stringArray = string.split('');
  while (stringArray.length > 0) {
    shuffledString += stringArray.splice(Math.floor(Math.random() * stringArray.length), 1);
  }
  return shuffledString;
}
