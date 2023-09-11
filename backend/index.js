// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const cors = require('cors');


// // Set up the Express app
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// // Enable CORS
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB using Mongoose
// mongoose.connect('mongodb+srv://vipulkrvks:vipulkrsingh@cluster0.q6qgros.mongodb.net/chat-app-jwt?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//   });

// const User = mongoose.model('User', {
//   username: String,
//   email: String,
//   password: String,
//   isVerified: Boolean
// });


// // Configure Nodemailer for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'chatappvipul@gmail.com',
//     pass: 'pjghxgjszpehzyut'
//   }
// });

// // Sign up route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
//   console.log(username,email,password)
//   try {
//     // Check if the username already exists in the database
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists.' });
//     }

//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({ message: 'Email already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user with the hashed password
//     const user = new User({ username, email, password: hashedPassword, isVerified: false });

//     // Save the user to the database
//     const savedUser = await user.save();

//     // Generate a JWT token
//     const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', { expiresIn: '1h' });

//     // Send a verification email
//     const mailOptions = {
//       from: 'chatappvipul@gmail.com',
//       to: savedUser.email,
//       subject: 'Account Verification',
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
//           <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//             <h2 style="color: #333; text-align: center;">Account Verification</h2>
//             <p style="color: #555; text-align: center; font-size: 16px;">
//               Hi ${savedUser.username},
//             </p>
//             <p style="color: #555; text-align: center; font-size: 16px;">
//               Thank you for signing up with our chat application. To complete your registration, please click the button below to verify your account:
//             </p>
//             <div style="text-align: center; margin-top: 30px;">
//               <a href="http://localhost:3000/verify?token=${token}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 18px; font-weight: bold;">Verify Account</a>
//             </div>
//             <p style="color: #555; text-align: center; font-size: 16px;">
//               If the button above doesn't work, you can also copy and paste the following link into your web browser:
//             </p>
//             <p style="color: #555; text-align: center; font-size: 16px;">
//               <a href="http://localhost:3000/verify?token=${token}" style="color: #007bff; text-decoration: none;">http://localhost:3000/verify?token=${token}</a>
//             </p>
//             <p style="color: #555; text-align: center; font-size: 16px;">
//               Thank you,
//               <br>
//               The Chat App Team
//             </p>
//           </div>
//         </div>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log('Verification email sent:', info.response);
//     res.status(200).json({ message: 'Signed up successfully. Please check your email for verification.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to sign up.' });
//   }
// });

// // Verify email route
// app.get('/verify', async (req, res) => {
//   const { token } = req.query;

//   try {
//     // Verify the JWT token
//     const decoded = jwt.verify(token, 'your-secret-key');

//     // Find the user by their ID and update the isVerified field
//     const result = await User.updateOne({ _id: decoded.userId }, { isVerified: true });

//     if (result.nModified === 0) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({ message: 'Email verified successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to verify email.' });
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username,password)

//   try {
//     // Find the user by their username
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     if (!user.isVerified) {
//       return res.status(401).json({ message: 'Email not verified.' });
//     }

//     // Check if the password is correct
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Incorrect password.' });
//     }

//     // Generate a JWT token
//     // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Logged in successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to login.' });
//   }
// });

// // Start the server
// const PORT = 3000;
// http.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// Import necessary packages and modules
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Include dotenv for environment variables

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.get('/',(req,res)=>{
  res.send("Welcome to BuddyCart Backend")
})

// Import and use routes
const userRoutes = require('./routes/userRoutes.js');
app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
