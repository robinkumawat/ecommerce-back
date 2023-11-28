import express from "express"
import ProductModle from "./DB/ProductModel.js"
import multer from "multer"
import path from "path"

const ProductRouter = express.Router()

ProductRouter.get("/", async (req, res) => {
  const existinProducts = await ProductModle.find()
  console.log(existinProducts);
  res.json(existinProducts)
})

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    const filename = req.body.name + ext;
    callback(null, filename);
  },
})
const upload = multer({ storage: storage });

ProductRouter.post("/add", upload.single("photo"),  async (req, res) => {
  console.log(req.body)
  const { name, price, category, company } = req.body;
  const photo = req.file;
  const ProductToAdd = new ProductModle({ name, price, category, company, photo })
  let result = await ProductToAdd.save()
  res.json(result)
})

ProductRouter.post("/add", async (req, res) => {
  const productToRegister = new ProductModle(req.body)
  let result = await productToRegister.save()
  res.json(result)
})

export default ProductRouter