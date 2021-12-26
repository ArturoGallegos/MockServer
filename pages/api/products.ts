const faker = require("faker");
const Cors = require("cors");

const getProducts = (count: number) => {
  const items = new Array(count);
  return [...items].map(() => ({
    // name: faker.commerce.productName(),
    // color: faker.commerce.color(),
    // department: faker.commerce.department(),
    // price: parseFloat(faker.commerce.price()),
    // description: faker.commerce.productDescription(),
    id: "10001",
    create_user_id: 1,
    update_user_id: 0,
    delete_user_id: 0,
    create_dt: "2020-09-01T00:00:00",
    update_dt: null,
    delete_dt: null,
    active: true,
    deleted: false,
    type: 2,
    code: "10001",
    sku: "40000-20000",
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    race_points: 20,
    giftcard_points: 0.0,
    reservation_points: 0,
    is_bundle: false,
    notes: null,
    taxable: true,
    tax_code: 1003,
    class_id: 1,
    visible: true,
    custom1: "1",
    custom2: "Racing",
    custom3: "A&D",
    custom4: null,
    image: "https://www.fikable.com/products/icons/10001.png",
    membership_type_id: 0,
    available_days: null,
    seq: 0,
    is_special: false,
    can_change_price: false,
    create_dt_local: "2020-08-31T17:00:00",
  }));
};

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const products = async(req, res) => {
  await runMiddleware(req, res, cors);
  res.json({
    ok: true,
    products: getProducts(Number(req.query.limit) || 50),
    page: Number(req.query.page),
    total: 20000,
  });
};

export default products;
