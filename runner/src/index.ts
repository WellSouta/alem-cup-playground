// Улавливаем необработанные исключения чтобы не допустить внезапное падение процесса
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err)
})

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err)
})

/**
 * 1. Импортируем и инициализируем конфиги
 * 2. Импортируем сервер, подгрузив все остальные модули
 * 3. Запускаем сервер и выводим его адрес
 *
 * Каждый шаг может провалиться с ошибкой
 * поэтому необходимо вывести эту ошибку пользователю
 * и закрыть приложение через 10 секунд, чтобы он успел понять и среагировать
 */
import('./config')
  .then(({ init }) => init())
  .then(() => import('./app'))
  .then(async ({ app }) => {
    const server = app.listen(36691, 'localhost', () => {
      const addr = server.address()

      if (addr && typeof addr !== 'string') {
        console.log(`📡 Please use this port: ${addr.port}`)
      } else {
        console.log(`📡 Please use this address: ${addr}`)
      }

      console.log('🚀 Server is ready!')
    })
  })
  .catch((err) => {
    console.error('💢 Error:', err)
    console.log('💤 App is closing in 10 seconds...')

    setTimeout(() => process.exit(1), 10000)
  })
