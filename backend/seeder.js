const { Product, Order, User } = require("./models");
const { products, users } = require("./data");
const color = require("colors");
const connectDB = require("./db/connect");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    const allUser = await User.insertMany(users);
    const adminUser = allUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("imported successfully".inverse.green);
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('delete all the data'.green)
    process.exit();
  } catch (error) {
    console.log(`${error.message}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
