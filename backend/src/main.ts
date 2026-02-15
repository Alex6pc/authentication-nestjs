import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
async function bootstrap() {
  console.log('[1/7] Starting bootstrap...')
  try {
    console.log('[2/7] Creating NestFactory...')
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    })
    console.log('[3/7] App created successfully!')
    
    console.log('[4/7] Setting up middleware...')
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true
    })
    app.use(cookieParser())
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    
    const port = process.env.PORT || 3002
    console.log(`[5/7] Listening on port ${port}...`)
    await app.listen(port)
    console.log(`[6/7] Server started!`)
    console.log(`[7/7] ✅ Application is running on: http://localhost:${port}`)
    console.log(`      GraphQL Playground: http://localhost:${port}/graphql`)
  } catch (error) {
    console.error('❌ Bootstrap failed:', error)
    throw error
  }
}

console.log('=== Starting NestJS Application ===')
bootstrap().catch(err => {
  console.error('💥 Fatal error during bootstrap:', err)
  console.error('Stack:', err.stack)
  process.exit(1)
})