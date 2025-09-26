// In /api/products.js

// You'll need to connect to your database, similar to how you do in server.js
// import mongoose from 'mongoose';
// import Product from '../backend/models/productModel'; // Adjust path to your model

export default async function handler(request, response) {
  // await mongoose.connect(process.env.MONGODB_URI); // Connect to DB

  // Handle a POST request (to create a product)
  if (request.method === 'POST') {
    try {
      // Your logic to create a product from the request body
      const newProductData = request.body;
      // const product = await Product.create(newProductData);

      // For now, let's send back a success message and the data
      console.log("Creating product with data:", newProductData);
      response.status(201).json({ message: "Product created successfully!", data: newProductData });

    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
  // Handle a GET request (to fetch all products)
  else if (request.method === 'GET') {
    try {
      // Your logic to find all products
      // const products = await Product.find({});
      const products = [{ id: 1, name: "Sample Product" }]; // Example data

      response.status(200).json(products);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
  // Handle other methods
  else {
    response.status(405).json({ message: "Method Not Allowed" });
  }
}