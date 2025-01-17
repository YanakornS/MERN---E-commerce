const ProductModel = require("../Models/products.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */

  //File upload
  try {
    // ตรวจสอบการอัปโหลดรูปภาพ
    if (!req.file || !req.file.firebaseUrl) {
      return res
        .status(400)
        .json({ message: "Image is required or upload failed" });
    }
    const firebaseUrl = req.file.firebaseUrl;

    // ตรวจสอบฟิลด์ใน req.body
    const { name, description, category, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // สร้างสินค้าใหม่
    const productDoc = await ProductModel.create({
      name,
      description,
      category,
      price,
      image: firebaseUrl,
    });

    if (!productDoc) {
      return res.status(400).json({ message: "Failed to create product" });
    }

    res.status(201).json(productDoc); // ส่งข้อมูลสินค้าใหม่กลับไป
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "An error occurred while creating the product",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "An error occurred while fetching products",
    });
  }
};
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product notfound",
      });
      return;
    }
    res.json(productDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting product Details",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  // ตรวจสอบว่ามีการส่ง `id` มาหรือไม่
  if (!id) {
    return res.status(400).json({ message: "Product ID is not provided" });
  }

  try {
    // ค้นหาสินค้าตาม ID
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ตรวจสอบ authorId (เฉพาะกรณีที่มีระบบผู้ใช้ที่เกี่ยวข้อง)
    const authorId = req.userId; // ต้องแน่ใจว่าคุณมี middleware `verifyToken` เพื่อดึง `userId`
    if (authorId && authorId !== productDoc.author.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this product",
      });
    }

    // ตรวจสอบค่าที่ส่งมาใน `req.body`
    const { name, description, category, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // อัปเดตข้อมูลในเอกสาร
    productDoc.name = name;
    productDoc.description = description;
    productDoc.category = category;
    productDoc.price = price;

    // อัปเดตรูปภาพ (ถ้ามีไฟล์ใหม่)
    if (req.file) {
      productDoc.image = req.file.firebaseUrl; // ใช้ URL รูปจาก Firebase
    }

    // บันทึกการเปลี่ยนแปลง
    await productDoc.save();

    // ส่ง response กลับพร้อมข้อมูลที่อัปเดต
    res.status(200).json(productDoc);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "An error occurred while updating the product",
    });
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  //const authorId = req.userId;
  try {
    const productDoc = await ProductModel.findById(id);

    if (!productDoc) {
      return res.status(404).send({
        message: "Product not found",
      });
    }

    // if (authorId !== productDoc.author.toString()) {
    //   return res.status(403).send({
    //     message: "You are not authorized to delete this product",
    //   });
    // }

    await ProductModel.findByIdAndDelete(id);

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: error.message || "An error occurred while deleting the product",
    });
  }
};

exports.getProductByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.find({ author: id }).populate(
      "author",
      ["username"]
    );
    if (!productDoc) {
      res.status(404).send({
        message: "Product notfound",
      });
      return;
    }
    res.json(productDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting product by author",
    });
  }
};
