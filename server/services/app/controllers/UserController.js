const {Product, Image} = require("../models/index")

class UserControllers {
static async getAllProducts(req, res, next){
    try {
        const allProduct = await Product.findAll({
            include: {
              model: Image,
              attributes: {
                exclude: ["productId", "createdAt", "updatedAt"],
              },
            },
            order: [["id", "DESC"]],
          });
          res.status(200).json(allProduct);
    } catch (error) {
        next(error)
    }
}
static async getNewProducts(req, res, next){
    try {
        const allProduct = await Product.findAll({where: {stockStatus: "New"},
            include: {
              model: Image,
              attributes: {
                exclude: ["productId", "createdAt", "updatedAt"],
              },
            },
            order: [["id", "DESC"]],
          });
          res.status(200).json(allProduct);
    } catch (error) {
        next(error)
    }
}
static async getProductsDetail(req, res, next){
    try {
        const productId = req.params.productId;
      const data = await Product.findOne({
        where: { id: productId },
        include: {
          model: Image,
          attributes: {
            exclude: ["productId", "createdAt", "updatedAt"],
          },
        },
      });
      if (!data) {
        throw { name: "Data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}
}

module.exports = UserControllers