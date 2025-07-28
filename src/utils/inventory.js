import { products } from "src/data/products";

// Initialize local inventory in localStorage
export const initializeInventory = () => {
  const saved = localStorage.getItem("productInventory");
  if (!saved) {
    const inventoryMap = {};
    products.forEach((p) => {
      inventoryMap[p.id] = {
        inventory: p.inventory,
        status: p.status || "IN STOCK"
      };
    });
    localStorage.setItem("productInventory", JSON.stringify(inventoryMap));
  }
};

export const getInventory = () => {
  return JSON.parse(localStorage.getItem("productInventory")) || {};
};

export const updateInventory = (productId, size, quantity = 1) => {
  const inventoryMap = getInventory();

  if (inventoryMap[productId]) {
    const currentStock = inventoryMap[productId].inventory[size];
    inventoryMap[productId].inventory[size] = Math.max(0, currentStock - quantity);

    // Check if all sizes are out of stock
    const allOut = Object.values(inventoryMap[productId].inventory).every((qty) => qty <= 0);
    inventoryMap[productId].status = allOut ? "SOLD OUT" : "IN STOCK";

    localStorage.setItem("productInventory", JSON.stringify(inventoryMap));
  }
};
