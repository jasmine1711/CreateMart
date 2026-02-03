import { create } from "zustand";

// ✅ ADDED: API base URL from Vercel env (Render backend)
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

    // ✅ UPDATED: use Render backend URL instead of /api/products
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    // ✅ UPDATED: backend returns product object directly (not data.data)
    set((state) => ({ products: [...state.products, data] }));

    return { success: true, message: "Product created successfully" };
  },

  // Fetch all products
  fetchProducts: async () => {
    // ✅ UPDATED: use Render backend URL
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();

    // ✅ UPDATED: backend returns ARRAY, so set directly
    set({ products: data });
  },

  // Delete product
  deleteProduct: async (pid) => {
    // ✅ UPDATED: use Render backend URL
    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: "Product deleted successfully" };
  },

  // Update product
  updateProduct: async (pid, updatedData) => {
    // ✅ UPDATED: use Render backend URL
    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
