import 'dotenv/config'
import createServer  from 'server'

const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT) || 5000;
  app.listen(port, () => console.log(`app is listening at port ${port}`))
}

startServer()