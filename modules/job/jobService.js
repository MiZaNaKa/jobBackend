var jobDataprocessor = require("./jobDataprocessor")
var Job = require("../../models/job")
var ResponseData=require("../../responseData/responseData")
const { v4: uuidv4 } = require('uuid')
var Bcrypt = require('bcryptjs');

class jobService{
    async insertJob(request){
        var responseData=new ResponseData()
        try{
            var data=new Job()
            data.job_title=request.job_title
            data.location=request.location
            data.minimum=request.minimum
            data.maximum=request.maximum

            data.salary_date=request.salary_date
            data.job_type=request.job_type
            data.category=request.category
            data.description=request.description
            data.userID=request.userID
            data.userName=request.userName
            data.createDate
           
            console.log(data)
            var result=await jobDataprocessor.insertJob(data)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData

    }

    async getJobAll(){
        var responseData=new ResponseData()
        try{
            var result=await jobDataprocessor.getJobAll()
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async filterJob(request){
        var responseData=new ResponseData()
        try{
            var result=await jobDataprocessor.filterJob(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async getJobByID(request){
        var responseData=new ResponseData()
        try{
            var result=await jobDataprocessor.getJobByID(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async deleteJobByID(request){
        var responseData=new ResponseData()
        try{
            var result=await jobDataprocessor.deleteJobByID(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async updateJobByID(request){
        var responseData=new ResponseData()
        try{
            var result=await jobDataprocessor.updateJobByID(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }
    

    

    
}
module.exports=new jobService()

