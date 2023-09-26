import express from 'express'

import { Router, Request, Response } from 'express';
import { HandleFileController } from './controllers/handle-file-controller';

const app = express();

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'move file microservice' })
})

const handleFileController = new HandleFileController()

route.post('/move-file', handleFileController.moveFile)

route.post('/get-file', handleFileController.getFile)

app.use(route)

const port = process.env.PORT || 3333

const host = process.env.HOST || '127.0.0.1'


app.listen({ port, host }, () => console.log(`server running on port ${port}`))