const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    company_id :{ type: mongoose.ObjectId, ref: 'companyModel'},
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", userModel);
