const { productsMock } = require('../utils/mocks');
const MongoLib = require('../lib/mongo')
class ProductService {

  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products;
  }

  async getProduct(id){
    const product = await this.mongoDB.getProductById(this.collection, id);
    return product;
  }

  async createProduct(id){
    const product = await this.mongoDB.create(this.collection, id);
    return product;
  }

  async updateProduct(id, data){
    const product = await this.mongoDB.update(this.collection, id, data);
    return product;
  }

  async deleteProduct(id){
    const product = await this.mongoDB.delete(this.collection, id);
    return product;
  }

  
}

module.exports = ProductService;
