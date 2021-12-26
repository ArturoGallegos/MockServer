import fs from 'fs';
const faker = require('faker');

const getProducts = (count:number) => {
  const items = new Array(count);
  return [...items].map(() => ({
    name: faker.commerce.productName(),
    color: faker.commerce.color(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),

  }))
}

const getPages = (numberPages:number, count: number) => {
  const items = new Array(Number(numberPages));
  return [...items].map(() => getProducts(count))
}

const generateProducts = (req, res) => {
  const {query} = req;
  const pages = getPages(Number(query.pages), Number(query.count));
  fs.writeFileSync('./json-data/products.json', JSON.stringify(pages));
  res.json({ok: true, pages, total: Number(query.pages) * Number(query.count)});
}

export default generateProducts;
