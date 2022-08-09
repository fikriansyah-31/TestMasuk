const { news, user } = require("../../models")

// == Get News == //
exports.getNews = async (req, res) => {
    try {
        let data = await news.findAll({
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
                exclude: ["idUser", "createdAt", "updatedAt"],
              
            },
        })
                data = JSON.parse(JSON.stringify(data))

           
      res.status(200).send({
        status: "Success",
        message: "Get data all news success",
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

// == Add News == // 
exports.addNews = async (req, res) => {
    try {
        const data = {
            job: req.body.job,
            location: req.body.location,
            salary: req.body.salary,
            newsImg: req.file.filename,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            userId: req.user.id
        }

        let newNews = await news.create(data)

        let newsData = await news.findOne({
            where: {
                id: newNews.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt","startDate","endDate"],
            },
        })
        newsData = JSON.parse(JSON.stringify(newsData))

        res.send({
            status: "success",
            message: "Add Product Success",
            data: {
                    ...newsData, 
                    newsImg: process.env.FILE_PATH + newsData.newsImg
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

// == Get News Id ==//
exports.getnewss = async (req, res) => {
    try {
        const { id } = req.params

        let data = await news.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt","startDate","endDate"]
            }
        })

        data = JSON.parse(JSON.stringify(data))
        data = {
            ...data,
            newsImg: process.env.FILE_PATH + data.newsImg
        }

        res.send({
            status: "success",
            data: {
                news: data,
            },
        });
    } catch (error) {
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

// == Update news ==//
exports.updatenews = async (req, res) => {
    try {
        const { id } = req.params;

        let data = {
            job: req.body.job,
            salary: req.body.salary ,
            userId: req.body.userId
        };
    
        console.log(data);
      

        await news.update(data, {
            where: {
                id,
            },
        });
        let newsData = await news.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt","startDate","endDate"],
            },
        });
        res.send({
            status: "success",
            newsData,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
}

// == Delete news ==//
exports.deletenews = async (req, res) => {
    try {
        const { id } = req.params;

        await news.destroy({
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