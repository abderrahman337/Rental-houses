import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
      name :{ type : String , required : true},
      email : {type : String , required: true},
      avatar : {type : String , required: true},
      allProperties : [{type : mongoose.Schema.Types.ObjectId ,ref : 'Property'}],
})

// module.exports = mongoose.model('User', UserSchema)
const useModel = mongoose.model('User', UserSchema)

export default useModel;