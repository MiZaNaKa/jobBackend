class user{
    constructor(
        name='',
        email='',
        profileImage='',
        createDate=new Date(),
        password=''
    ){
        this.name=name,
        this.email=email,
        this.profileImage=profileImage,
        this.createDate=createDate,
        this.password=password
    }
    
}

module.exports=user