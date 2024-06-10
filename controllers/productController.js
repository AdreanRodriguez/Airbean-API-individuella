import { productDb } from '../models/productModel.js'


export default class ProductController {

    // HÄMTA ALLA PRODUKTER
    // URL =  api/products
    getAllProducts = async (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Products found.',
            status: 200,
            products: req.products
        });
    }

    // HÄMTA ENSKILD PRODUKT PÅ ID
    // URL =  api/products/:productId
    getProduct = async (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Product found.',
            status: 200,
            product: req.product
        });
    }

    // LÄGG TILL ENSKILD PRODUKT
    // URL = api/products
    addNewProduct = async (req, res, next) => {
        try {
            let newProduct = req.body;
            const products = await productDb.find({}).sort({ id: 1 });
            const existingProduct = await productDb.findOne({ title: newProduct.title });
            let createdProductId;

            if (products.length === 0) {
                // Om det inte finns några produkter, börja med ID 1.
                createdProductId = 1;
            } else {
                // Lägger till id på den nya produkten med det sista id:et i arrayen plus 1.
                const lastProduct = products[products.length - 1];
                createdProductId = lastProduct.id + 1;
            }
            // Om det finns en produkt med samma titel så går det inte att lägga till i databasen.
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: 'Product with this title already exists'
                });
            }

            // Störde mig på att id inte hamnade högst upp i Insomnia.
            newProduct = {
                id: createdProductId,
                ...newProduct
            }

            // Sätt in den nya produkten i databasen
            const createdProduct = await productDb.insert(newProduct);

            const productCreatedAt = new Date().toLocaleString();
            res.status(200).json({
                success: true,
                status: 200,
                message: 'Product added',
                productCreatedAt: productCreatedAt,
                product: createdProduct
            });
        } catch (error) {
            next(error);
        }
    }

    // TA BORT ENSKILD PRODUKT PÅ ID
    // URL = api/products/:productId
    removeProduct = async (req, res) => {
        const { productId } = req.params;
        const products = productDb;

        if (!productId) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Product not found or wrong id'
            });
        }

        await products.removeOne({ _id: productId });

        const productRemovedAt = new Date().toLocaleString();
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Product removed',
            productRemovedAt: productRemovedAt,
            product: req.product
        });

    }

    // MODIFIERA ENSKILD PRODUKT PÅ ID
    // URL = api/products/:productId
    modifyProduct = async (req, res) => {
        const { productId } = req.params;
        const modifiedBodyData = req.body;
        const validKeys = ['title', 'desc', 'price', 'estimatedTimeInMinutes'];

        const invalidKeys = Object.keys(modifiedBodyData).filter(theValidKeys => !validKeys.includes(theValidKeys));

        if (invalidKeys.length > 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: `Invalid keys found: ${invalidKeys.join(', ')}`,
                useOnly: validKeys
            })
        }

        const productToModify = await productDb.findOne({ _id: productId })

        if (!productToModify) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'No product found to modify'
            })
        }

        const updatedProduct = await productDb.updateOne(
            { _id: productId },
            { $set: modifiedBodyData },
            { returnUpdatedDocs: true }
        )

        const modifiedAt = new Date().toLocaleString()
        res.status(200).json({
            success: true,
            status: 200,
            message: 'The product is now modified',
            modifiedAt: modifiedAt,
            modifyProduct: updatedProduct
        })
    }
}
