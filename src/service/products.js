import {Router} from 'express'
import pool from '../utils/db/connect.js'

const productsRouter = Router()


productsRouter.get('/', async(req,res,next) => {
try {
    const result = await pool.query(`SELECT * FROM products;`)
    res.send(result.rows)
} catch (error) {
    res.status(500).send({msg:error.message})
}
})


// "id": 1, //SERVER GENERATED
// "name": "3310",  // NOT NULL
// "description": "somthing longer", // NOT NUL
// "brand": "nokia", // NOT NUL 	  
// "image_url":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", NOT NUL
// "price": 100, // NOT NUL
// "category": "smartphones" // NOT NUL
// "created_at": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
// "updated_at": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
productsRouter.post('/', async(req,res,next) => {
    try {
        const result = await pool.query(`INSERT INTO 
        products(
            product_name,
            product_description,
            category,
            brand,
            price,
            image_url
            )
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *;`,
            [req.body.product_name,
            req.body.product_description,
            req.body.category,
            req.body.brand,
            req.body.price,
            req.body.image_url 
            ]);

        res.send(result.rows)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    })
export default productsRouter