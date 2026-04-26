export const handleErrors = (err, req, res, next) => {
  if (err.isOperational) {
    // errores esperados (como token expirado)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // errores reales (bugs)
  console.error("-- ERROR INESPERADO: --", err);

  return res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
