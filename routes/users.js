var express = require('express');
var router = express.Router();

var UserService=require("../modules/user/userService")
var Bcrypt = require('bcryptjs');
var otpHelper = require("../util/token")
const nodemailer = require("nodemailer");
const jwtHelper = require('../util/jwtHelper')
var Response = require("../responseData/responseData")


router.get('/', function(req, res, next) {
  console.log("hello")
  res.send('respond with a resource');
});

router.get('/getEmailOTP/:email',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var result = await UserService.checkEmail(req.params.email)
    var returnResult={
      status:0,
      data:[],
      message:''
    }
    if(result.success.data.success.data.length===0){
      var rec={
        email:req.params.email
      }
      var token = await otpHelper.generateOTP(rec)

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'khinlay.merryshall@gmail.com',
          pass: 'jaygfokzqayevakg'
        },
        tls : { rejectUnauthorized: false }
      });
      
      var mailOptions = {
        from: 'khinlay.merryshall@gmail.com',
        to: req.params.email,
        subject: 'Job',
        text: 'This is your opt.'+token.token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
          res.json(error);
        } else {
          
          var emailOTPObject={
            otp:token,
            email:req.params.email
          }
          var insertedORUpdateEmailOTP =  UserService.insertORUpdateEmailOTP(emailOTPObject)
          returnResult.status=1
          res.json(returnResult);
        }
      });
    }
    else{
      returnResult.message="email is exist"
      res.json(returnResult);
    }
    
  }
  catch(e){
    ResponseData.getFailResponseData(e)
    res.json(ResponseData);
  }
});


router.post('/checkNCreate',async function (req, res, next) {
  var ResponseData=new Response()
  try{
    var request=req.body
    var findEmailOTP = await UserService.getEmailOTP(request.email)
    var returnResult={
      status:0,
      data:[],
      message:''
    }
    console.log(findEmailOTP)
    console.log(findEmailOTP)
    
    if(findEmailOTP.success.data.success.data.length>0){
      var secret=findEmailOTP.success.data.success.data[0].otp.secret
      var verifyResult = await otpHelper.verifyOTP(request.otp,secret)
      console.log(verifyResult)
      console.log(verifyResult)
      if(verifyResult){
        var created = await UserService.createAccount(request)
        console.log(created.success.data)
        console.log(created.success.data)
        if(created.success.data.status===1){
          var jwt=await jwtHelper.generateJWT(created.success.data.success.data)
          returnResult.status=1
          var request={
            jwt:jwt,
            userInfo:created.success.data.success.data
          }
          returnResult.data=request
          res.json(returnResult);
        }
        else{
          returnResult.message="Email is exist"
          res.json(returnResult);
        }
      }
      else{
        returnResult.message="OTP is not correct"
        res.json(returnResult);
      }
    }
    else{
      var returnObj={
        status:0,
        message:'server error'
      }
      res.json(returnObj);
    }
    
  }
  catch(e){
    console.log(e.message)
    console.log(e)
    console.log(e)
    ResponseData.getFailResponseData(e)
  }
});


router.post('/login',async function (req, res, next) {
  var request=req.body
  var checkedEmail = await UserService.checkEamil(request.email)
  
  var returnResult = {
    ok:false,
    status:0,
    message:"",
    loginUser:"",
    loginJwt:""
  };
  if(checkedEmail.success.data.success.data.length>0){
    var checkPassword = Bcrypt.compareSync(request.password, checkedEmail.success.data.success.data[0].password)
    if(checkPassword){
      delete checkedEmail.success.data.success.data[0].password
      var jwt  = await jwtHelper.generateJWT(checkedEmail.success.data.success.data[0]);
      returnResult.loginUser=checkedEmail.success.data.success.data[0]
      returnResult.loginJwt=jwt
      returnResult.status=1
    }
    else{
      returnResult.message="Password is not correct"
    }
  }
  else{
    returnResult.message="email is not exist"
  }
  res.json(returnResult);
  
});


module.exports = router;
