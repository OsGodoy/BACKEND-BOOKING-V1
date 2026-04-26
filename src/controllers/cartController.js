import {
  addCartService,
  clearCartService,
  getCartService,
  removeCartService,
  updateCartService,
} from "../services/cartService.js";

export const getCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const items = await getCartService(userId);

    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const addCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const result = await addCartService(userId, bookId);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const result = await removeCartService(userId, bookId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { quantity } = req.body;

    const result = await updateCartService(userId, bookId, quantity);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const clearCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const items = await clearCartService(userId);

    res.json(items);
  } catch (error) {
    next(error);
  }
};
