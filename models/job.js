class job{
    constructor(
        job_title= "",
        location= "",
        minimum= "",
        maximum= "",
        salary_date= "",
        job_type= "",
        category= "",
        description= "",
        userID= "",
        userName="",
        createDate=new Date(),
    ){
        this.job_title=job_title,
        this.location=location,
        this.minimum=minimum,
        this.maximum=maximum,
        this.salary_date=salary_date,

        this.job_type=job_type,
        this.category=category,
        this.description=description,
        this.salary_date=salary_date,
        this.userID=userID,
        this.userName=userName
        this.createDate=createDate
    }
    
}

module.exports=job