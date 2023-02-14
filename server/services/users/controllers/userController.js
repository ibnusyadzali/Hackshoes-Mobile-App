const User = require("../models/user");

class Controller {
  static async FindAll(req, res, next) {
    try {
      const data = await User.find();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async FindByPk(req, res, next) {
    try {
      const id = req.params.id;
      const data = await User.findbypk(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async Create(req, res, next) {
    try {
      const data = await User.create(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async DeleteById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await User.delete(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
