import express from 'express'
import pool from './utils/db/connect.js'

const server = express()

const {PORT =5001} = process.env
const result = await pool.query("SELECT NOW();")

server.listen(PORT, ()=> {
    console.log("server has is running ",PORT)
})

server.on("error", (error)=> {
    console.log("server has stopped ",error)
})