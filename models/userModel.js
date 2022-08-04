const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a name'],
            trim: true,
            minlength: [1, 'please provide non empty name'],
            maxlength: [20, "name can't be longer than 20 characters"],
        },
        password: {
            type: String,
            required: [true, 'you must enter a password'],
            trim: true,
        },
        birthDate: Date,
        email: {
            type: String,
            required: [true, 'you must enter an email'],
            unique: [true, 'email already in use'],
            min: [6, 'please provide non empty email'],
            max: [50, 'too long email address'],
            validate: [isEmail, 'invalid email'],
        },
        height: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val > 0;
                },
                message: "height can't be lower than 0",
            },
            default: 1.75,
        },
        weight: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val > 0;
                },
                message: "weight can't be lower than 0",
            },
            default: 80,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

userSchema.virtual('BMI').get(function () {
    return this.weight / Math.pow(this.height, 2);
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $eq: true } });
    // this.find({ active: { $ne: false } }); the same as line 63
    next();
});

userSchema.post('save', function () {
    if (this.height < 1.5) console.log('you are small!!');
});

// userSchema.post('init', function () {
//     console.log(this);
// });

userSchema.pre("save", function (next) {
    console.log("run before save")
    next()
})

const User = mongoose.model('Users', userSchema);
module.exports = User;
