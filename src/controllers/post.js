const { post, user} = require("../../models")

//== Add post ==//
exports.addPost = async (req, res) => {
    try {
        const data = {
            desc : req.body.desc,
            postImg: req.file.filename,
            idUser: req.user.id
        }

        let newPost = await post.create(data)

        let postData = await post.findOne({
            where: {
                id: newPost.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt","startDate","endDate"],
            },
        })
        postData = JSON.parse(JSON.stringify(postData))

        res.send({
            status: "success",
            message: "Add Post Success",
            data: {
                    ...postData, 
                    postImg: process.env.FILE_PATH + postData.postImg
            },
        });
    } catch (error) {
        
    }
}

//== Get post ==//
exports.getPost = async (req, res) => {
    try {
        let data = await post.findAll({
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                    exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
            ],
                attributes: {
                exclude: ["Userid", "createdAt", "updatedAt"],
              
            },
        })
           data = JSON.parse(JSON.stringify(data))

      res.status(200).send({
        status: "Success",
        message: "Get data all post success",
        data,
      });
    } catch (error) {
        console.log(error);
        res.status(404).send({
        status: "Get data Failed",
        message: "Server Error",
    });
    }
}

//== Get id ==// 
exports.getPosts = async (req, res) => {
    try {
        const { id } = req.params

        let data = await post.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        data = JSON.parse(JSON.stringify(data))
        data = {
            ...data,
            postImg: process.env.FILE_PATH + data.postImg
        }

        res.send({
            status: "success",
            data: {
                post: data,
            },
        });
    } catch (error) {
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

//== Update post ==//
exports.updatepost = async (req, res) => {
    try {
        const { id } = req.params;

        let data = {
            desc: req.body.desc
        };
    
        console.log(data);
      

        await post.update(data, {
            where: {
                id,
            },
        });
        let postData = await post.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        res.send({
            status: "success",
            postData,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

//== Delete post ==//
exports.deletepost = async (req, res) => {
    try {
        const { id } = req.params;

        await post.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: "Delete success",
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}