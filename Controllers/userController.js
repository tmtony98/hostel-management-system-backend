//import user model
const users = require("../Models/userSchema");
const rent = require("../Models/rentSchema");
const expenseData = require("../Models/expenseSchema");
const adminData  = require("../Models/adminSchema")
//const bcrypt = require('bcrypt');

//register
exports.register = async (req, res) => {
  console.log("inside register fn");
  const { name, email, number, room, joinedDate, Rent } = req.body;
  console.log(`name-${name} , email is ${email}, number is  ${number} joined date:${joinedDate}`);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(404).json(`user ${name} already exists`);
    } else {
      const newUser = new users({
        name,
        email,
        number,
        room,
        joinedDate,
        Rent,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

//get user list
exports.userList = async (req, res) => {
  console.log("inside get userlist fn");
  const usersList = await users.find({});
 // console.log(usersList);
  res.send(usersList);
};

//delete an user
exports.deleteUser = async (req,res) => {
  const userId = req.params.id;
   console.log("inside delete fn");
  console.log(userId);
  const newList = await users.findByIdAndDelete(userId);
  res.status(200).json(newList);
};

//add rent details
exports.addRent = async (req, res) => {
  console.log("inside ADD rent fn");

  const { name, email, number, room, selectedMonth, rentAmount, rentStatus } = req.body;
  console.log(`name-${name} , email is ${email}, number is  ${number} month ${selectedMonth}`);
  try {
    const newRent = new rent({
      name,
      email,
      number,
      room,
      selectedMonth,
      rentAmount,
      rentStatus,
    });
    await newRent.save();
    console.log(newRent);
    res.status(200).json(newRent);
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

//get rent data from db
exports.rentList = async (req, res) => {
  console.log("inside rentlist fn");
  const rentList = await rent.find({});
  console.log(rentList);
  res.send(rentList);
};

//delete an rentlist
exports.deleteRent = async (req, res) => {
  console.log("inside delete fn");
 // const { _id } = req.body;
 const rentId = req.params.id;
//  console.log(_id);
  const newRent = await rent.findByIdAndDelete(rentId);
  res.status(200).json(newRent);
};

//add expense details
exports.addExpense = async (req, res) => {
  console.log("inside expense rent fn");
  const { id, currentBill, waterBill, messBill, staffSalary, selectedMonth } = req.body;
  console.log(
    `currentbill-${currentBill} , waterbill =${waterBill}, messbill=${messBill} , ${staffSalary} , ${selectedMonth}, ${id} etc`
  );
  try {
    const newExpense = new expenseData({
      currentBill,
      waterBill,
      messBill,
      staffSalary,
      selectedMonth,
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

//get expense details
exports.getExpense= async(req,res)=>{
  console.log("inside get expenselist fn");
  const expenseList = await expenseData.find({});
  console.log(expenseList);
  res.send(expenseList);
}
//delete an expense data 

exports.deleteExpense= async (req, res) => {
  const userId = req.params.id;
  console.log("inside delete expense fn");
 // const { _id } = req.body;
  const newExpenseList = await expenseData.findByIdAndDelete(userId)
  res.status(200).json(newExpenseList);
  console.log("inside delete fn");
};

//edit user data
exports.editUser = async (req,res)=>{
 console.log("inside get edit user data fn");
const userId = req.params.id
// console.log(userId);
try{
  const edituser = await users.find({_id : userId});
  res.status(200).json(edituser);
 // console.log(edituser);
}catch(err){
  res.status(401).json(`Error ${err}`);
}

}

//fn to update user data
exports.updateUser = async (req, res)=>{
  const { id } = req.params;
  const updatedUserData = req.body;
  console.log("inside update user data fn");
  try{
    const updatedUser = await users.findByIdAndUpdate(id, updatedUserData, { new: true });
    res.json(updatedUser);
  }catch(error){
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//fn to edit expense data
exports.editExpense = async (req,res)=>{
  console.log("inside get edit expense data fn");
 const userId = req.params.id
  console.log(userId);
 try{
   const editexpense = await expenseData.find({ _id : userId});
   res.status(200).json(editexpense);
  // console.log(edituser);
 }catch(err){
   res.status(401).json(`Error ${err}`);
 }
   }

 //fn to get peopple count
 exports.usersCount = async (req,res)=>{
  console.log("inside get userCount fn");
  try{
    const totalCount = await users.countDocuments();
    res.status(200).json(totalCount);
    console.log(totalCount);
  }catch(error){
   // res.status(401).json(`Error ${err}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
 }
 
 //fn to edit expense data
 
 //fn to get total amount of rent collected
exports.totalRent = async (req,res)=>{
console.log("inside get totalRent fn");
try {
  const result = await rent.aggregate([
    {
      $group: {
        _id: null,
        totalRentAmount: { $sum: '$rentAmount' }
      }
    }
  ])

  console.log(result);
  const totalRentAmount = result.length > 0 ? result[0].totalRentAmount : 0;
  res.json(totalRentAmount );
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

 }

 //register
exports.adminRegister = async (req, res) => {
  console.log("inside admin register fn");
  const { name, email, password } = req.body;
  console.log(`name-${name} , email is ${email}, number is  ${password}`);
  try {
    const existingUser = await adminData.findOne({ email });
    if (existingUser) {
      res.status(404).json(`user ${name} already exists`);
    } else {
      const newUser = new adminData({
        name,
        email,
        password
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Error ${err}`);
  }
};

//fn to login
exports.login = async (req,res)=>{
  console.log("inside login  fn");
  const { email , password } = req.body;
  console.log( `email is ${email},number is ${password}`);
  try {
    const existingAdmin = await adminData.findOne({ email });
    console.log(existingAdmin);
    if (!existingAdmin) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (existingAdmin) {
      res.status(200).json(`user login successfull `)
    } else {
      res.status(404).json("no user found, do sign up");
    }
  } catch (err) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
   // res.status(401).json(`Error ${err}`);
  }
}

