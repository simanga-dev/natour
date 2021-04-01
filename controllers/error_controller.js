const sendErroDev = (err , res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
      erro: err,
    message: err.message,
      stack: err.stack
  });

}

const sendErroProd = (err, res) => {
    if (err.isOperational) {

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.erro("ERROR", err)

        res.status(500).json({
            status: 'error',
            message:  "Something went wrong!"
        })
    }

}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'erro';

    if(process.env.NODE_ENV === 'development') {
        sendErroDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErroProd(err, res)
    }


};
