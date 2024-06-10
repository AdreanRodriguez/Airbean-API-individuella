# GET - /api/products
*Fetches all products.*
## Returns
* Successful Response
```
    success: true,
    message: 'Products found.',
    status: 200,
    products: [...]
```
## Errors
* Internal Server Error
```
    success: false,
    message: 'Internal server error.',
    status: 500
```
<hr><br><br>

# GET - /api/products/:productId
*Fetches a specific product by its ID.*
## Returns
* Successful Response
```
    success: true,
    message: 'Product found.',
    status: 200,
    product: {...}
```
# Errors
* Product Not Found
```
    success: false,
    message: 'Product not found.',
    status: 404
```
<hr><br><br>

# POST - api/products/
*Add new product to product.db*<br>
>**You are only authorized to add a product if you are an admin. If so, in Insomnia don't forget to add Authorization in Headers with your Token**

* Write like this inside `req.body`
```
{
    "title": "Add new product title here",
	"desc": "Add description here",
	"price": 123,
	"estimatedTimeInMinutes": 0.2
}
```
<br>

# Returns
* Successful Response
```
    success: true,
    status: 200,
    message: 'Product added',
    productCreatedAt: productCreatedAt,
    product: createdProduct
```
# Errors
* If you are **not** admin, you are not authorized to add a product.
```
	"success": false,
	"message": "Unauthorized access: You need a Token",
	"status": 400
```
<br>

* If you try to add a product whose title already exists.

```
    success: false,
    status: 400,
    message: 'Product with this title already exists'
```
* `The Joi validation`

    title: Joi.string().max(30).required(),<br>
    desc: Joi.string().required(),<br>
    price: Joi.number().positive().required(),<br>
    estimatedTimeInMinutes: Joi.number().positive().required(),

<br><br>
Title = `The title must be a string and no longer than 30 characters, and it is required.`
<br><br>
Desc = `Short for description, this is where you enter the product description. It is a required string.`
<br><br>
Price = `Here you enter the price the product should have. It must be a number, it cannot be a negative value, and it is required.`
<br><br>
estimatedTimeInMinutes = `The time it takes to make the product. It must be a positive number because it is required.`
<br><br>