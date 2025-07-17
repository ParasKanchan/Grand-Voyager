module.exports = (fn) =>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}
//this will be used to handel the errors without crashing the server