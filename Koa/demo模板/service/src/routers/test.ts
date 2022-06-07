import Router from '@koa/router';
import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa';
const router = new Router({
  prefix: '/api'
});

router.get('/test', (ctx:ParameterizedContext<DefaultState, DefaultContext, any>, next:Next) => {
  console.log('测试');
  ctx.body = {
    name: '小哥哥',
    age: 18
  }
});

export default router.routes();
