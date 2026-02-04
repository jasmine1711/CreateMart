import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Create product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const result = await res.json();

    // ✅ push ONLY the product object
    set((state) => ({
      products: [...state.products, result.data],
    }));

    return { success: true, message: "Product created successfully" };
  },

  // Fetch all products
  fetchProducts: async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const result = await res.json();

    // ✅ store ONLY the array
    set({ products: result.data });
  },

  // Delete product
  deleteProduct: async (pid) => {
    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (!result.success)
      return { success: false, message: result.message };

    set((state) => ({
      products: state.products.filter((p) => p._id !== pid),
    }));

    return { success: true, message: "Product deleted successfully" };
  },

  // Update product
  updateProduct: async (pid, updatedData) => {
    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await res.json();
    if (!result.success)
      return { success: false, message: result.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? result.data : product
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
