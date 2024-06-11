# GET
## URL - /api/campaign/
*Fetches all campaigns.*
### campaignController
* [getCampaign](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/controllers/campaignController.js#L7)
## Returns
* Successful Response
```
	"success": true,
	"message": "Campaign found",
	"status": 200,
	"campaignData": [
		{
			"prod1": {...},
			"prod2": {...},
			"price": 123,
			"_id": "hr9IAf0lMB2qW1kF"
		}
	]
```
## Errors
* If there is no data inside the campaign
```
	"success": false,
	"message": "No campaign found",
	"status": 404
```
<hr><br><br>

# POST
## URL - api/campaign/
*Add new product to campaign.db*<br>

### | Middleware
* [checkUserStrict](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/middleware/authentication.js#L8)
* [users.isAdmin](https://vscode.dev/github/AdreanRodriguez/Airbean-API-individuella/blob/main/middleware/validation.js#L274)
* [campaign](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/middleware/validation.js#L192)
### | campaignController
* [addNewCampaign](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/controllers/campaignController.js#L25)
## Write like this inside `req.body` to add
```
{
    "prod1": "Add the products _id here",
	"prod2": "Add the products _id here",
	"price": 123,
}
```

<br>

## Returns
* Successful Response
```
	"success": true,
	"message": "Campaign created",
	"status": 200,
	"newCampaign": {
		"prod1": {...},
		"prod2": {...},
		"price": 123
	}
```
## Errors

<br>

* If you try to add a product with an _id that does not exist.

```
	"success": false,
	"message": "Product 1, not found",
	"status": 404
```
```
	"success": false,
	"message": "Product 2, not found",
	"status": 404
```
<br>

* If you try to add a product and forget to add price
```
	"success": false,
	"message": "\"price\" is required",
	"status": 400
```
* `The Joi validation`

    prod1: Joi.string().max(16).required(),
    prod2: Joi.string().max(16).required(),
    price: Joi.number().positive().required(),

<br><br>
Prod1 = `The product _id must be a string and no longer than 16 characters, and it is required.`
<br><br> 
Prod2 = `The product _id must be a string and no longer than 16 characters, and it is required.`
<br><br>
Price = `Here you enter the price the campaign should have. It must be a number, it cannot be a negative value, and it is required.`
<br><br>

# DELETE
## URL - api/campaign/
*Remove all campaigns from campaign.db*
<br>

### campaignController
* [removeAllCampaign](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/controllers/campaignController.js#L38)

## Returns
* Successful Response
```
    success: true,
    status: 200,
    message: 'Campaign successfully removed'
```
## Errors
* If there is no data in campaign.db
```
    success: false,
    status: 404,
    message: 'No campaign found'
```