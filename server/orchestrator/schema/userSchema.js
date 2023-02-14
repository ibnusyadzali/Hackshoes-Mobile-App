const axios = require("axios");
const redis = require("ioredis");
const Redis = new redis({
  host: 'redis-16093.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 16093,
  password: 'kBcdmGfqhQtJIG1AymUb5cXyJmHNdmdj'
});
const userServer = "http://localhost:4001/";

const typeDefs = `#graphql

type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type CreatedUserOutput {
    acknowledged: String
    insertedId: String
}
type DeletedUserOutput {
    acknowledged: Boolean
    deletedCount: Int
}

input AddUserInput {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
}

type Message {
    message: String
}

type Query {
    getAllUser: [User]
    getUserById (id:ID): User
}

type Mutation {
    addUser (AddUserInput:AddUserInput): CreatedUserOutput
    deleteUser (id: ID): DeletedUserOutput
}
`;

const resolvers = {
  Query: {
    getAllUser: async () => {
      try {
        const { data } = await axios.get(userServer);
        await Redis.set("allUSerData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, args) => {
      try {
        const id = args.id;
        const { data } = await axios.get(userServer + id);
        await Redis.set("allUSerData", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { AddUserInput } = args;
        const { data } = await axios.post(userServer, AddUserInput);
        await Redis.del("allUSerData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const id = args.id;
        const { data } = await axios.delete(userServer + id);
        await Redis.del("allUSerData");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
