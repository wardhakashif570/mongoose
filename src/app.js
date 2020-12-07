const mongoose = require("mongoose");
const validator=require("validator");

//connection creation and create in new db

mongoose.connect("mongodb://localhost:27017/wardadata", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection succesfull......"))
    .catch((err) => console.log(err));



const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:5,
        maxlength:30,
    },
    ctype: {
     type:String,
     required:true,
     enum:["Front End","Backend","Mongoose"]
    },
    videos:
    { 
    type:Number,
    validate(value){
        if(value < 0){
            throw new Error("videos count should not be negetive");
                 }
    }
    // validate: {
    //     validator: function(value) {
    //       return value < 0
          
    //     },
    //     message:"videos count should not be negative"
    // },

    },
    author: String,
    email:{
       type: String,
       required:true,
       unique:true,

       validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is Invalid");
                 }
    }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);



//create document & Insert

const createDocument = async () => {
    try {
        const reactplaylist = new Playlist({
            name: "React JS",
            ctype: "Front End",
            videos: 20,
            author: "wardhakashif",
            email:"thapa.ya@go",
            active: true,

        })


        const jsplaylist = new Playlist({
            name: " JS",
            ctype: "Front End",
            videos: 20,
            author: "wardhakashif",
            active: true,

        })


        const expressplaylist = new Playlist({
            name: " Express",
            ctype: "Backend",
            videos: 20,
            author: "wardhakashif",
            active: true,

        })


        const mongooseplaylist = new Playlist({
            name: " Mongo",
            ctype: "Mongoose",
            videos: 20,
            author: "wardhakashif",
            active: true,

        })

        const result = await Playlist.insertMany([reactplaylist, jsplaylist, expressplaylist, mongooseplaylist]);
        // console.log(result);

        // const result=await jsplaylis.save();
        // console.log(result);

        // const result=await expressplaylist.save();
        // console.log(result);

        // const result=await rmongooseplaylist.save();
        // console.log(result);

    } catch (err) {
        console.log(err);
    }
}


//createDocument();
const getDocument = async () => {
    try {
        const result = await Playlist
            // .find({ctype : {$in : ["Backend","Front End"]}})
            // .find({ videos: {$gte : 20} })
            //.find({$or :[{ctype: "Backend"},{name: " Express"}]})

            .find({ $or: [{ ctype: "Backend" }, { name: " Express" }] })
            .select({ name: 1 })
            .sort({ name: -1 });
        //.sort({name:1}); //1 is used for Ascending order
        //.countDocuments();
        //.limit(1);
        console.log(result);
    } catch (err) {
        console.log(err);

    }
}



//getDocument(); to read

//update the document
const updateDocument = async (_id) => {
    try {

        const result = await Playlist.findByIdAndUpdate({ _id },
            {
                $set: {
                    name: "Javascript developer"
                }
            }, {
            new: true,
            useFindAndModify: false
        });
        console.log(result);
    }


    catch (err) {
        console.log(err);
    }
}
updateDocument("5fc6b1080c993e34e48a13ba");


//delete the document
const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndDelete({ _id });
        console.log(result);
    } catch (err) {
        console.log(err);
    }


}

deleteDocument("5fc6b1080c993e34e48a13ba");