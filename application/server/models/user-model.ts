import * as mongoose from 'mongoose'
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        minLength:2,
        maxLength:255,
    },

    googleID:{
        type:String,
    },

    date:{
        type: Date,
        default:Date.now(),

    },

    thumbnail:{
        type:String,
    },

    //  local login 使用本地登入
    email:{
        type:String,
        required: true,
        maxLength:1024,

    },

    password: {
        type:String,
        required: true,
        maxLength:1024,
        minLength:6,
    },

    facebookID: {
        type:String,
    },
    role:{
        type:String ,
        enum:["breeder" , "vet"],
        
    },
});

userSchema.methods.isStudent = function() {
    return this.role == "student";
};

userSchema.methods.isAdmin = function() {
    return this.role == "admin";
};

userSchema.methods.isInstructor = function() {
    return this.role == "instructor";
};

//  mongoose schema middleware 
userSchema.pre("save" , async function(next) {
    if(this.isModified("password") || this.isNew) {
        const hash = await bcrypt.hash(this.password , 10 );
        this.password = hash;
        next();
    }else {
        return next();
    }
});

//  比對並確認用戶輸入的密碼及加密後的密碼
userSchema.methods.comparePassword = function(password , cb ) {
    bcrypt.compare(password , this.password , (err , isMatch) => {
        if(err ) {
            return cb(err , isMatch);
        }
        cb(null , isMatch);
    });
};

module.exports = mongoose.model("User" , userSchema);