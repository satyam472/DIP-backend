//For Register Page
// const dashboardView = (req, res) => {
const fs = require('fs');

const { getAllIdeaQuery, createIdeaQuery } = require("../queries/ideaQuery");

//     res.status(200).json({true});

//     res.render("dashboard", {
//       user: req.user
//     });
//   };


const getAllIdea = async(req, res) => {
    try {
        // let { group_name, group_type, group_member_id } = req.body
        console.log(req.cookie);
        const response = await getAllIdeaQuery()
        .then((resp) => {
            // res.setHeader('Access-Control-Allow-Credentials', true)
            // res.setHeader('Access-Control-Allow-Origin', '*')
            console.log(resp.data);
            res.status(200).json(resp.data);
        });
        
    } catch (error) {
        console.log(error);
    }
};

const createIdea = async(req, res) => {
    try {
        // let { name, image, author,description } = req.body
        console.log(req.body)
        console.log("files = ",req.files);
        const fileContent = req.files[0].buffer;

        await fs.writeFile(`./uploads/${req.files[0].originalname}`,fileContent, (err) => {
          if (err) throw err;
          console.log('File created successfully.');
        });

        const response = await createIdeaQuery(req.body,req.files[0]);

        await fs.unlink(`./uploads/${req.files[0].originalname}`, (err) => {
            if (err) throw err;
            console.log('File created successfully.');
          });
       
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

  
// updateGroupQuery(_id) {
//     try {
//         const response: any = await GroupModel.findByIdAndUpdate(_id, {
//             $push: {
//                 group_member_id: group_member_id
//             }
//         }, { new: true })
//         return Promise.resolve({ status: true, message: `${response.group_name} Updated Successfully` });
//     } catch (error: any) {
//         Logger.log(erro)
// return Promise.reject([500, 'Internal Server Error'])
//     }
// }

module.exports = {
    getAllIdea,
    createIdea
};