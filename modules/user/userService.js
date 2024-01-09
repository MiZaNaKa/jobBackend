var userDataprocessor = require("./userDataprocessor")
var User = require("../../models/user")
var ResponseData=require("../../responseData/responseData")
const { v4: uuidv4 } = require('uuid')
var Bcrypt = require('bcryptjs');

class userService{
    async insertUser(request){
        var responseData=new ResponseData()
        try{
            var userInfo=new User()
            userInfo.name=request.name
            userInfo.email=request.email
            userInfo.profileImage=request.profileImage
            userInfo.password=uuidv4()
            userInfo.createDate
            console.log(userInfo)
            console.log(userInfo)
            var result=await userDataprocessor.insertUser(userInfo)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    
    async checkEmail(email){
        var responseData=new ResponseData()
        try{
           
            var result=await userDataprocessor.checkEmail(email)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    async insertORUpdateEmailOTP(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.insertORUpdateEmailOTP(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async getEmailOTP(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.getEmailOTP(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async createAccount(value){
        var responseData=new ResponseData()
        try{
            var user = new User()
            user.name=value.name
            user.email=value.email
            user.password = Bcrypt.hashSync(value.password);
            var result=await userDataprocessor.createAccount(user)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async checkEamil(value){
        var responseData=new ResponseData()
        try{
            var result=await userDataprocessor.checkEamil(value)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }
}
module.exports=new userService()

