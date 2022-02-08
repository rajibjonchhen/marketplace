import express from 'express'
import pool from './utils/db/connect.js'
import productsRouter from './service/products.js'

const server = express()

const {PORT =5001} = process.env
const result = await pool.query("SELECT NOW();")

server.use(express.json())
server.use('/products',productsRouter)
server.listen(PORT, ()=> {
    console.log("server has is running ",PORT)
})

server.on("error", (error)=> {
    console.log("server has stopped ",error)
})