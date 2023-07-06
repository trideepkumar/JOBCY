const User = require("../model/user");
const Organization = require("../model/organisation");
const bcrypt = require("bcrypt");
const Token = require("../model/Token");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");
const Jobs = require("../model/jobs");
const Post = require("../model/post");
const PDFDocument = require('pdfkit');
const fs = require('fs');



const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({
        message: "Admin with email already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(200).json({
      message: "Admin signup successful.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "An error occurred during admin signup.",
      success: false,
    });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (!existingAdmin) {
    return res
      .status(400)
      .json({ message: "Admin not registered.", success: false });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Invalid password.", success: false });
  }

  const token = jwt.sign(
    { id: existingAdmin._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, admin: existingAdmin, token: token });
};


const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      success: true,
      totalUsers: totalUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching total users.",
    });
  }
};

const totalusersbyMonth = async (req, res) => {
  console.log("totalusersbyMonth");
  try {
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = usersByMonth.reduce((acc, monthData) => {
      const month = new Date().toLocaleString("en-us", { month: "long" });
      acc[month] = monthData.count;
      return acc;
    }, {});

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users by month" });
  }
};

const totalOrganizationsByMonth = async (req, res) => {
  console.log("totalOrganizationsByMonth");
  try {
    const organizationsByMonth = await Organization.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = organizationsByMonth.reduce((acc, monthData) => {
      const month = new Date().toLocaleString("en-us", { month: "long" });
      acc[month] = monthData.count;
      return acc;
    }, {});

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch organizations by month" });
  }
};

const totalPostsJobs = async (req, res) => {
  try {

    const jobsByMonth = await Jobs.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(jobsByMonth)

    const postsByMonth = await Post.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);


    const formattedData = {
      jobs: formatDataByMonth(jobsByMonth),
      posts: formatDataByMonth(postsByMonth),
    };

    console.log(formattedData)

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs and posts by month" });
  }
};

const formatDataByMonth = (dataByMonth) => {
  const formattedData = {};
  for (const item of dataByMonth) {
    const month = item._id; // Assuming `_id` represents the month
    const count = item.count;
    formattedData[month] = count;
  }
  console.log(formattedData)
  return formattedData;
};

const organisationPdf = async (req,res)=>{
  console.log("organisationPdf")
  try {
    const organizations = await Organization.find({}, 'orgName category place registrationNumber');
    console.log(organizations)
    
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="organizations_report.pdf"');

    doc.pipe(res);

    doc.fontSize(18).text('Total Organizations Details', { align: 'center' });

    organizations.forEach((organization) => {
      doc
        .fontSize(12)
        .text(`Organization Name: ${organization.orgName}`)
        .text(`Category: ${organization.category}`)
        .text(`Place: ${organization.place}`)
        .text(`Registration Number: ${organization.registrationNumber}`)
        .moveDown(0.5); 
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF report');
  }
}







module.exports = {
  adminLogin,
  adminSignup,
  getTotalUsers,
  totalusersbyMonth,
  totalOrganizationsByMonth,
  totalPostsJobs,
  organisationPdf
};
