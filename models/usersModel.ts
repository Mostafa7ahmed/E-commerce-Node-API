import { Schema, model } from "mongoose";
import { Users } from "../interfaces/users";
import bcrypt from 'bcryptjs'


const UsersSchema:Schema = new Schema<Users>({

    name:{type:String, required:true, trim: true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role:{type:String, enum:['manager', 'admin', 'user'], default:'user'},
    image: String,
    wishlist:[{type: Schema.Types.ObjectId,  ref: 'products'}],
    address:[{
        street: String,
        city: String,
        state: String,
        postalCode:String,
    }],
    active: {type:Boolean, default:true},
    phone:{type:String},
    restCode: String,
    passwordChangedAt: Date,
    restCodeExpireTime: Date,
    restCodeVerify: Boolean
},
{
    timestamps: true
});


UsersSchema.pre<Users>('save', async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 15)
})

export default model<Users>('users', UsersSchema);