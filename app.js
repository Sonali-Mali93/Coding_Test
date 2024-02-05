const express = require("express");
const mongoose = require("mongoose");
const companyModel = require("./Model/companyModel");
const userModel = require("./Model/userModel");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "srv -string/CompanyUserDB"
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

//Add a Company [Name, City].
app.post("/addCompanyDetails", (req, res) => {
  const companyName = req.body.companyName;
  const city = req.body.city;
  const companyData = companyModel
    .create({ companyName, city })
    .then((data) => {
      res.send(data);
    });
});

// Add a User [Name, Email, Phone].
app.post("/adduserDetails", (req, res) => {
  let { company_id, userName, email, phone } = req.body;
  userModel.create({ company_id, userName, email, phone }).then((data) => {
    res.send(data);
  });
});

app.get("/getCompanyDetails", (req, res) => {
  const data = companyModel.find();
  data.then((data) => {
    res.send(data);
  });
});

// Delete a given Company.
app.post("/deleteCompanyDetails/:id", (req, res) => {
  companyModel.findOneAndDelete(req.params._id).then((data) => {
    res.json({ message: "Company is deleted" });
  });
});

//Get all Users’ data for a given Company.
app.post('/getUserDataByCompany/:id',(req,res)=>{
    companyModel.findById(req.params._id).then(data =>{
        res.send(data);
    })
})


app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
