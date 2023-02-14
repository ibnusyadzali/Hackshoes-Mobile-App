const { User, Product, Category, Image, sequelize } = require("../models/index");

class AdminControllers {
  static async getAllProducts(req, res, next) {
    try {
      const allProduct = await Product.findAll({
        include: [
          {
            model: Image,
            attributes: {
              exclude: ["productId", "createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
      });
      res.status(200).json(allProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json(allCategory);
    } catch (error) {
      next(error);
    }
  }

  static async getProductsDetail(req, res, next) {
    try {
      const productId = req.params.productId;
      const data = await Product.findOne({
        where: { id: productId },
        include: [
          {
            model: Image,
            attributes: {
              exclude: ["productId", "createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!data) {
        throw { name: "Data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    let t = await sequelize.transaction();
    try {
      // additional ini sudah bentuk array
      let { name, description, price, mainImg, categoryId, additionalImages, UserId } = req.body;
      let slug = name.toLowerCase().split(" ").join("-");

      //ini create product
      const newProduct = await Product.create({ name, slug, description, price, stockStatus: "New", mainImg, categoryId, UserId }, { transaction: t });

      const dataImages = additionalImages.map((el) => {
        return { productId: newProduct.id, imgUrl: el };
      });
      //create Images
      await Image.bulkCreate(dataImages, { transaction: t });
      await t.commit();
      const newProductData = await Product.findOne({
        where: { name: name },
        include: [
          {
            model: Image,
            attributes: {
              exclude: ["productId", "createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(201).json( newProductData );
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let t = await sequelize.transaction();
    try {
      let productId = req.params.productId;
      let { name, description, price, mainImg, categoryId, stockStatus, additionalImages, UserId } = req.body;
      let slug = name.toLowerCase().split(" ").join("-");
      let findProduct = await Product.findOne(
        {
          where: { id: productId },
          include: {
            model: Image,
          },
        },
        { transaction: t }
      );

      if (!findProduct) {
        throw { name: `Data not found` };
      } else {
        await Product.update({ id: findProduct.id, name, slug, description, price, stockStatus, mainImg, categoryId, UserId }, { where: { id: productId } }, { transaction: t });

        const arrOfImagesId = findProduct.Images.map((el) => {
          return { id: el.id, productId: el.productId };
        });
        additionalImages.forEach((el, i) => {
          arrOfImagesId[i].imgUrl = el;
        });
        await Image.bulkCreate(arrOfImagesId, { updateOnDuplicate: ["imgUrl"] }, { transaction: t });
        await t.commit();
        res.status(201).json({ message: `Success to update detail on product ${findProduct.name}` });
      }
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let productId = req.params.productId;
      let findProduct = await Product.findOne({ where: { id: productId } });
      await Product.destroy({ where: { id: productId } });
      if (!findProduct) {
        throw { name: `Data not found` };
      } else {
        res.status(200).json({ message: `Success to delete product ${findProduct.name}` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    let t = await sequelize.transaction();
    try {
      let { name } = req.body;
      const newCategory = await Category.create({ name }, { transaction: t });
      await t.commit();
      res.status(201).json(newCategory);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let categoryId = req.params.categoryId;
      let findCategory = await Category.findOne({ where: { id: categoryId } });
      await Category.destroy({ where: { id: categoryId } });
      if (!findCategory) {
        throw { name: `Data not found` };
      } else {
        res.status(200).json({ message: `Success to delete product ${findCategory.name}` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminControllers;
