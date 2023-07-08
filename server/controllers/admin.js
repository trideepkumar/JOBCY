const User = require("../model/user");
const Organization = require("../model/organisation");
const Job = require("../model/jobs");
const bcrypt = require("bcrypt");
// const Token = require("../model/Token");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");
const Jobs = require("../model/jobs");
const Posts = require("../model/post");
const PDFDocument = require('pdfkit');
const moment = require('moment');
// const fs = require('fs');



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
    res.setHeader('Content-Disposition', 'attachment; filename="JOBCY_organizations_report.pdf"');

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


const jobReportPdf = async (req, res) => {
  try {
    const jobs = await Job.find({}, 'jobTitle appliedCandidates').populate({
      path: 'appliedCandidates',
      select: 'name',
    });

    console.log(jobs);

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="JOBCY_job_report.pdf"');

    doc.pipe(res);

    doc.fontSize(18).text('Job Report', { align: 'center' });

    jobs.forEach((job, index) => {
      doc.moveDown(1).fontSize(14).text(`Job Title: ${job.jobTitle}`, { underline: true });

      if (job.appliedCandidates && job.appliedCandidates.length > 0) {
        doc.moveDown(0.5).fontSize(12).text('Applied Candidates:', { underline: true });

        job.appliedCandidates.forEach((candidate, candidateIndex) => {
          doc.moveDown(0.5).text(`${candidateIndex + 1}. ${candidate.fullName} - ${candidate.email}`);
        });
      } else {
        doc.moveDown(0.5).fontSize(12).text('No applied candidates found');
      }
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF report');
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("friends")
      .populate("orgFollowing")
      .lean();// Convert the mongoose documents to plain JavaScript objects

    const usersWithFriendCount = users.map((user) => ({
      ...user,
      friendCount: user.friends ? user.friends.length : 0,
      orgFollowingCount: user.orgFollowing ? user.orgFollowing.length : 0,
    }));

    console.log(usersWithFriendCount);
    res.status(200).json(usersWithFriendCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const blockUser = async (req, res) => {
    try {
      const userId = req.body.userId;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { isVerified: false },
        { new: true }
      );

      console.log(user);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

const unBlockuser = async(req,res)=>{
try {
  const userId = req.body.userId;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isVerified: true },
    { new: true }
  );

  console.log(user);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({user});
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}
}

const getOrganisations = async (req, res) => {
  try {
    const organizations = await Organization.find({})
      .populate("followers") 
      .lean(); 

    const organizationsWithUserAndCounts = organizations.map((org) => {
      const followerCount = org.followers ? org.followers.length : 0;
      const jobPostCount = org.jobposts ? org.jobposts.length : 0;
      return {
        ...org,
        user: req.user, 
        followerCount,
        jobPostCount,
      };
    });

    console.log(organizationsWithUserAndCounts);
    res.status(200).json(organizationsWithUserAndCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const blockOrganization = async (req, res) => {
  try {
    const organizationId = req.body.orgId;

    console.log(organizationId)
    const organization = await Organization.findOneAndUpdate(
      { _id: organizationId },
      { isVerified: false },
      { new: true }
    );

    console.log(organization);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.status(200).json({ organization });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const unblockOrganisation = async (req, res) => {
  try {
    const organisationId = req.body.orgId;

    const organisation = await Organization.findOneAndUpdate(
      { _id: organisationId },
      { isVerified: true },
      { new: true }
    );

    console.log(organisation);

    if (!organisation) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.status(200).json({ organisation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    
    const postsWithFormattedDate = posts.map((post) => ({
      ...post.toObject(),
      createdAt: moment(post.createdAt).fromNow()
    }));

    console.log(postsWithFormattedDate);
    res.status(200).json(postsWithFormattedDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


const blockpost = async (req, res) => {
  try {
    const postId = req.body.postId;

    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      { isDeleted: true },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const unblockpost =  async (req,res)=>{
  try {
    const postId = req.body.postId;

    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      { isDeleted: false },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({});

    const jobsWithFormattedData = jobs.map((job) => {
      return {
        ...job.toObject(),
        createdAt: moment(job.createdAt).fromNow(),
        totalApplicants: job.applicants ? job.applicants.length : 0,
        totalReports: job.reports ? job.reports.length : 0,
      };
    });

    res.status(200).json(jobsWithFormattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const blockJob = async(req,res)=>{
  try {
    const jobId = req.body.jobId

    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      { isDeleted: true },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'job not found' });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const unblockJob = async(req,res)=>{
  try {
    const jobId = req.body.jobId

    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      { isDeleted: false },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'job not found' });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}







module.exports = {
  adminLogin,
  adminSignup,
  getTotalUsers,
  totalusersbyMonth,
  totalOrganizationsByMonth,
  totalPostsJobs,
  organisationPdf,
  jobReportPdf,
  getUsers,
  blockUser,
  unBlockuser,
  getOrganisations,
  blockOrganization,
  unblockOrganisation,
  getPosts,
  blockpost,
  unblockpost,
  getJobs,
  blockJob,
  unblockJob
};
