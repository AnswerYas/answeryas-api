class ApiError extends Error {
  constructor(code = 400, message = 'internal:unknown_error') {
    super();
    this.code = code;
    this.message = message;
  }
}

function restify(pathPrefix) {
  pathPrefix = pathPrefix || '/api/';
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(pathPrefix)) {
      console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
      ctx.rest = data => {
        ctx.response.type = 'application/json';
        ctx.response.body = data;
      };
      try {
        await next();
      } catch (e) {
        console.log('Process API error...');
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.response.body = {
          code: e.code || 'internal:unknown_error',
          message: e.message || '',
        };
      }
    } else {
      await next();
    }
  };
}

module.exports = {
  ApiError,
  restify,
};
