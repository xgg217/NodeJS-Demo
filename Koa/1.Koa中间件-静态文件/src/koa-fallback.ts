import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';

const fallback = async function fallback(cxt:ParameterizedContext<DefaultState, DefaultContext, any>, next:Next) {
  // ctx.path:/a ctx.path: /index.html
  if((cxt.method === 'GET') &&
    (cxt.headers.accept?.includes('text/html')) &&
    !cxt.path.includes('.')
  ) {
    // 请求非静态资源
    cxt.path ='/index.html';
  }
  // 请求头的 Accept 需要包含 text/html
  
  console.log(cxt.headers.accept?.includes('text/html'));
  console.log(cxt.path.includes('.'));

  await next();
};


export default fallback;