const {connect} = require("mongoose")

const connectDB = async (DB_URL) => {
    try{
        await connect(DB_URL);
        console.log("Database connected");
        
    }catch(err){
        console.log("Database connection error", err);
        
    }
}
module.exports = connectDB;