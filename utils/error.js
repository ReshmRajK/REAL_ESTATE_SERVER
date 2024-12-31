//manually created error

exports.errorHandler=(statusCode,message)=>{
    const error=new error
    error.statusCode=statusCode
    error.message=message
    return error

}