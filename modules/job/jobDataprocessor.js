const Response = require('../../responseData/responseData')
var mongoDbService= require('../../service/mongodb')
const { MongoClient,  ObjectId } = require("mongodb");
class jobDataprocessor{
    async insertJob(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('jobs').insertOne(request)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async getJobAll(){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection('jobs').find({}).toArray()
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async filterJob(request){
        var responseData = new Response()
        try{
            var query={}
            if(request.search){
                query.job_title={ $regex: request.search, $options: 'i' }
            }

            if(request.category){
                query.category=parseInt(request.category)
            }

            if(request.jobType){
                query.job_type=request.jobType
            }

            var result=await mongoDbService.db.collection('jobs').find(query).toArray()
           
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async getJobByID(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("jobs").findOne({"_id":new ObjectId(id)})
            console.log(result)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    async deleteJobByID(id){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("jobs").deleteOne({"_id":new ObjectId(id)})
            console.log(result)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    async updateJobByID(request){
        var responseData = new Response()
        try{
            var result=await mongoDbService.db.collection("jobs").updateOne(
                { "_id": new ObjectId(request._id),
                    "userID":request.userID
                },
                {
                    $set: {
                        "job_title": request.job_title,
                        "location": request.location,
                        "minimum": request.minimum,
                        "maximum": request.maximum,
                        "salary_date": request.salary_date,
                        "job_type": request.job_type,
                        "category": request.category,
                        "description": request.description,
                    }
                }
            );
            console.log(result)
            responseData.getSuccessResponseData(result)
        }
        catch(e){
            responseData.getServerErrorResponseData(e)
        }
        return responseData
    }

    
    
}

module.exports=new jobDataprocessor()