// Simple cart helper using localStorage and custom window events for reactive updates

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      originalPrice: product.originalPrice,
      quantity
    });
  }

  saveCart(cart);
};

export const updateCartQuantity = (productId, quantity) => {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => {
  saveCart([]);
};
