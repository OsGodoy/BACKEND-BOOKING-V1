import { getBookById } from "../repositories/bookRepository.js";
import {
  clearCartItems,
  createCart,
  createCartItem,
  deleteCartItem,
  findCartByUserId,
  findCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../repositories/cartRepository.js";
import { AppError } from "../utils/AppError.js";

const getOrCreateCart = async (userId) => {
  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
};

export const getCartService = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const items = await getCartItems(cart.id);

  return {
    items,
    total: items.reduce(
      (acc, item) => acc + item.quantity * item.price_snapshot,
      0,
    ),
  };
};

export const addCartService = async (userId, bookId) => {
  const cart = await getOrCreateCart(userId);

  const existingItem = await findCartItem(cart.id, bookId);

  if (existingItem) {
    return await updateCartItemQuantity(
      existingItem.id,
      existingItem.quantity + 1,
    );
  }

  const book = await getBookById(bookId);

  if (!book) {
    throw new AppError("El libro no existe", 404);
  }

  if (book.stock <= 0) {
    throw new AppError("Sin stock", 409);
  }

  return await createCartItem({
    cartId: cart.id,
    bookId,
    quantity: 1,
    priceSnapshot: book.price,
  });
};

export const updateCartService = async (userId, bookId, quantity) => {
  const cart = await getOrCreateCart(userId);

  const item = await findCartItem(cart.id, bookId);

  if (!item) {
    throw new AppError("Libro no encontrado", 404);
  }

  if (quantity <= 0) {
    await deleteCartItem(item.id);
    return { message: "ITEM_REMOVED" };
  }

  const book = await getBookById(bookId);

  if (!book || book.deleted_at) {
    throw new AppError("El libro no existe", 404);
  }

  if (quantity > book.stock) {
    throw new AppError("Sin stock", 409);
  }

  return await updateCartItemQuantity(item.id, quantity);
};

export const removeCartService = async (userId, bookId) => {
  const cart = await getOrCreateCart(userId);

  const item = await findCartItem(cart.id, bookId);

  if (!item) {
    throw new AppError("Libro no encontrado", 404);
  }

  await deleteCartItem(item.id);

  return { message: "ITEM_REMOVED" };
};

export const clearCartService = async (userId) => {
  const cart = await getOrCreateCart(userId);

  await clearCartItems(cart.id);

  return { message: "CART_CLEARED" };
};
