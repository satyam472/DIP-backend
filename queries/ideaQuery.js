const IdeaModel = require("../models/ideaModel");

const getAllIdeaQuery = async() => {
    try {
        // const response = await IdeaModel.find().project({ name: 1 });
        // await IdeaModel.find().project({ name: 1 });
        const resp = await IdeaModel.find({});
        return Promise.resolve({ status: true, data:resp, message: `All Idea response` });
    } catch (error) {
        // Logger.log(error)
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const createIdeaQuery = async(body) => {
    try {
        console.log(body)
        let doc = { 
            name: body.name,
            image: body.image,
            author: body.author,
            description: body.description
            // name: "body.name",
            // image:" body.image",
            // author: "body.author",
            // description: " body.description"
        }  
        console.log("before resp")
        const resp = await IdeaModel.create(doc ,function (err, small) {
            if (err) {console.log(err);}
            else{
                console.log(small);
            }

            // saved!
          });
        console.log("after resp")
        return Promise.resolve({ status: true, data:resp, message: `All Idea response` });
    }
        catch (error) {
        // Logger.log(error)
        return Promise.reject([500, 'Internal Server Error'])
    }
}



module.exports={
    getAllIdeaQuery,
    createIdeaQuery
}