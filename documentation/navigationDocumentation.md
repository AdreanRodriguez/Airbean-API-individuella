# GET - /api/navigation
Hämtar alla navigeringsobjekt.
### | middleware
* [navigation](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/middleware/validation.js#L306)
### | navigationController
* [getAll](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/controllers/navigationController.js#L4)

# Returns
* Successful Response
```
    success: true,
    message: 'navigation items found.',
    status: 200,
    navigationItems: [...]
```
# Errors
* Unauthorized Access
```
    error.message = `Bad credentials: No info found for about page.`;
    error.status = 400;
    return next(error);
```
<br><br>

# GET - /api/navigation/setup
Ställer in standardnavigeringsobjekt om inga finns.

### | middleware
* [navigation](https://github.com/AdreanRodriguez/Airbean-API-individuella/blob/main/middleware/validation.js#L306)

# Returns
* Successful Response
```
    success: true,
    message: 'navigation items found.',
    status: 200,
    navigationItems: [...]
```