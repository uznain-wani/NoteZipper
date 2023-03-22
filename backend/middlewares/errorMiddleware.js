//error middleware for  "not found" so that if user goes to anything that is not anyroute then 404 handler will handle

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); //in message: not found /api/test  will be displayed
};

//error middleware (for general errors)  for custom error handling it will also take error as arg

const errorHandler = (err, req, res, next) => {
  // when  we get 200 it shows sucess but still it is an error sometimes that is y we made it 500 which is server error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = { notFound, errorHandler };

//to create custom error handler we need to add some custom middleware which is simply a function that has access to our request and resp

/*app .use((req,res,next)=>{
  //  it will get printed as we request any route say on /api/products route ,we will get hello in terminal
    console.log("hello")
  //  we also have aceess to anything that is in our  request 
    console.log(req.originalUrl) // /api/products will be shown in terminal
    next()      //to move to next piece of middleware
})*/
