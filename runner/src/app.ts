import * as Koa from 'koa'

import * as cors from '@koa/cors'

import { routes } from './routes'

export const app = new Koa()

/**
 * Обработка ошибок
 */
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      code: 500,
      error: e
    }
  }
})

/**
 * CORS
 */
app.use(
  cors({
    origin(ctx) {
      const origin = ctx.get('Origin')

      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return origin
      }

      return 'https://wellsouta.github.io/alem-cup-playground'
    }
  })
)

/**
 * Маршруты
 */
app.use(routes)
