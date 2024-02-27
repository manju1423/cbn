const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));
let validateToken = (req, res, next) => {
  console.log("server validate token");
  console.log(req.headers.authorization);

  console.log("server validate token");
  next();
};
app.use(validateToken);
const multer = require("multer");
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});
let User = new mongoose.model("user", userSchema);

app.post("/Login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await User.find().and({ email: req.body.email });

  console.log(userDetails);
  if (userDetails.length > 0) {
    let isPasswordValid = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );
    if (isPasswordValid == true) {
      let token = jwt.sign(
        { email: req.body.email, password: userDetails[0].password },
        "secretkey"
      );
      let dataObj = {
        age: userDetails[0].age,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
        mobileNo: userDetails[0].mobileNo,
        token: token,
      };
      res.json({ status: "success", data: dataObj });
    } else {
      res.json({ status: "failure", msg: "Invalid token" });
    }
  } else {
    res.json({ status: "failure", msg: "Invalid token" });
  }
});

app.post("/LoginWithToken", upload.none(), async (req, res) => {
  let receivedToken = req.body.token;
  let decryptedTokenObj = jwt.verify(receivedToken, "secretkey");

  console.log(decryptedTokenObj);
  let userDetails = await User.find().and({ email: decryptedTokenObj.email });
  if (userDetails.length >= 0) {
    if (userDetails[0].password == decryptedTokenObj.password) {
      let dataObj = {
        age: userDetails[0].age,
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        email: userDetails[0].email,
        profilePic: userDetails[0].profilePic,
      };
      res.json({ status: "success", data: dataObj });
    } else {
      res.json({ status: "failure", msg: "Invalid token" });
    }
  } else {
    res.json({ status: "failure", msg: "Invalid token" });
  }
});

app.post("/Signup", upload.array("profilePic"), async (req, res) => {
  try {
    console.log(req.body);

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let signupUser = new User({
      firstName: req.body.fn,
      lastName: req.body.ln,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.files[0].path,
    });
    await User.insertMany([signupUser]);
    res.json({ status: "success", msg: "User created successfully" });
  } catch (err) {
    console.log("UNABLE TO SENT DATA TO MDB");
    console.log(err);
  }
});

app.put("/updateProfile", upload.single("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    if (req.body.fn.length > 0) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          firstName: req.body.fn,
        }
      );
      console.log(updatedDetailsStatus);
    }
    if (req.body.ln.length > 0) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          lastName: req.body.ln,
        }
      );
    }
    if (req.body.age.length > 0) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          age: req.body.age,
        }
      );
    }
    if (req.body.password.length > 0) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          password: req.body.password,
        }
      );
    }
    if (req.body.mobileNo.length > 0) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          mobileNo: req.body.mobileNo,
        }
      );
    }

    if (req.file) {
      let updatedDetailsStatus = await User.updateMany(
        { email: req.body.email },
        {
          profilePic: req.file.path,
        }
      );
    }
    console.log(updatedDetailsStatus);
    res.json({ status: "success", msg: " User details updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "failure", msg: "Unable to update details", err: err });
  }
});

app.delete("/deleteProfile", upload.none(), async (req, res) => {
  try {
    await User.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "User deleted successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to delete user" });
  }
});

app.listen(process.env.port, () => {
  console.log(`listening to the port ${process.env.port}`);
});

let connecttoMDB = async () => {
  try {
    // mongoose.connect("mongodb://localhost:27017/static");
    mongoose.connect(process.env.mdburl);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("no connection to mongoDB");
    console.log(err);
  }
};
connecttoMDB();
