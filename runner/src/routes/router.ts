import * as Router from '@koa/router'

export const router = new Router()
export const routes = router.routes()

router.get('/', (ctx) => {
  ctx.body = 'ok'
})
