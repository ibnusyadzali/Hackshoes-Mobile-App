const axios = require("axios");
const redis = require("ioredis");
const Redis = new redis({
  host: 'redis-16093.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 16093,
  password: 'kBcdmGfqhQtJIG1AymUb5cXyJmHNdmdj'
});
const appServer = "http://localhost:4002/";
const userServer = "http://localhost:4001/";

const typeDefs = `#graphql

    type Product {
        id: ID
        name: String
        slug: String
        description: String
        price: Int
        stockStatus: String
        mainImg: String
        categoryId: Int
        UserId: String
        Images: [Images]
        Category: Category
    }
    type DetailProduct {
        id: ID
        name: String
        slug: String
        description: String
        price: Int
        stockStatus: String
        mainImg: String
        categoryId: Int
        UserId: String
        Images: [Images]
        Category: Category
        User: User
    }

    type User {
      username: String
      email: String
    }

    type NewProduct {
        id: ID
        name: String
        slug: String
        description: String
        price: Int
        stockStatus: String
        mainImg: String
        categoryId: Int
        UserId: String
        Images: [Images]
    }

    type Category {
        id: ID
        name: String
    }

    type Images {
        id: ID
        imgUrl: String
    }


    input addInput {
      name: String
      description: String
      price: Int
      mainImg: String
      categoryId: Int
      additionalImages: [String]
      UserId: String
    }
    
    input editInput {
      name: String
      description: String
      price: Int
      mainImg: String
      categoryId: Int
      stockStatus: String
      additionalImages: [String]
      UserId: String
    }

    input editProductInput {
      id: ID
      editInput: editInput
    }

    input addCategoryInput {
      name: String
    }

    type Message {
      message: String
    }

    type Query {
        getProducts: [Product]
        getNewArrivals: [NewProduct]
        getCategories: [Category]
        getProductDetail(id:ID): DetailProduct
    }

    type Mutation {
      addProduct (addInput: addInput): Product 
      editProduct (editProductInput: editProductInput): Message 
      deleteProduct(id:ID): Message
      addCategory (addCategoryInput:addCategoryInput): Category
      deleteCategory(id:ID): Message
    }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const { data } = await axios.get(appServer + "admin/products");
        await Redis.set("allProductData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getNewArrivals: async () => {
      try {
        const { data } = await axios.get(appServer + "user/new");
        await Redis.set("allNewArrivalsData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getCategories: async () => {
      try {
        const { data } = await axios.get(appServer + "admin/categories");
        await Redis.set("allCategoryData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getProductDetail: async (_, args) => {
      try {
        let id = args.id;
        const { data } = await axios.get(appServer + "admin/" + id);
        // console.log(data.UserId)
        const { data: detailData } = await axios.get(userServer + data.UserId)
        data.User = detailData
        console.log(data)
        await Redis.set("productDetail", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addProduct: async (_, args) => {
      try {
        let { addInput } = args;
        const { data } = await axios.post(appServer + "admin/add", addInput);
        await Redis.del("allProductData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editProduct: async (_, args) => {
      try {
        let { id, editInput } = args.editProductInput;
        const { data } = await axios.put(appServer + "admin/" + id, editInput);

        await Redis.del("allProductData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (_, args) => {
      try {
        let id = args.id;
        const { data } = await axios.delete(appServer + "admin/product/" + id);
        await Redis.del("allProductData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addCategory: async (_, args) => {
      try {
        let { addCategoryInput } = args;
        const { data } = await axios.post(appServer + "admin/addCategory", addCategoryInput);
        await Redis.del("allCategoryData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteCategory: async (_, args) => {
      try {
        let id = args.id;
        const { data } = await axios.delete(appServer + "admin/category/" + id);
        await Redis.del("allCategoryData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
