const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dbnrosh3i",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPDF = async (pdfData) => {
  try {
    const result = await cloudinary.uploader.upload(pdfData, {
      resource_type: "raw",
      folder: "pdfs", 
      format: "pdf",
    });
    console.log('PDF uploaded to Cloudinary:', result.secure_url);
  } catch (error) {
    console.error('Error uploading PDF to Cloudinary:', error);
  }
};


// const pdfData = "/Users/trideep/JOBCY/server/public/pdf"; 

// uploadPDF(pdfData);

module.exports = cloudinary;
