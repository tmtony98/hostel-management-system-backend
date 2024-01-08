const express = require("express");

//create router for express app using router () object
//here router is a variaable i think
const router = new express.Router();

//import useciontroller to linkk routes with the logic
const userController = require("../Controllers/userController");

//now definr differnt requrst or api call in here
//add user to database 
router.post("/user/register", userController.register);

//get users list
router.get("/users/list",userController.userList)

//delete users 
router.post("/user/delete/:id",userController.deleteUser)

//add new rent details
router.post("/rent",userController.addRent)

//get rent data from rent 
router.get("/rent/list",userController.rentList)

//add newexpense 
router.post("/expense/add",userController.addExpense)

//get expenses
router.get("/expense/list",userController.getExpense)

//delete an expense
router.post("/expense/delete/:id",userController.deleteExpense)

//delete rent data in rentlist
router.post("/rent/delete/:id",userController.deleteRent)

//edit data in userslist
router.get("/user/edit/:id",userController.editUser)

//update user detaiols on edit page
router.put("/user/edit/:id",userController.updateUser)

//edit api call to edit expenses
router.put("/expenses/edit/:id",userController.editExpense )

//to get total count of residents 
router.get("/users/count",userController.usersCount)

//to get total amount of rent collected
router.get("/rent/collection",userController.totalRent)

//api router to register admin in sign up page
router.post("/signup",userController.adminRegister)

//api call to login 
router.post("/login",userController.login)

//export router to get it in index
module.exports = router