import { Router } from 'express';
import fetch from 'node-fetch';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const router = Router();

router.post('/search', async (req, res) => {
  try {
    const { queryText } = req.body;
    
    // Hacer la llamada a la API de DummyJSON
    const response = await fetch(`https://dummyjson.com/products/search?q=${queryText}`);
    const data = await response.json();

    // Estructurar la respuesta para DialogFlow CX
    const webhookResponse = {
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: [`Aquí tienes algunos productos que encontré:`]
            }
          }
        ]
      },
      sessionInfo: {
        parameters: {
          products: {
            listValue: {
              values: data.products.map((product: Product) => ({
                structValue: {
                  fields: {
                    id: { numberValue: product.id },
                    title: { stringValue: product.title },
                    description: { stringValue: product.description },
                    price: { numberValue: product.price },
                    brand: { stringValue: product.brand },
                    category: { stringValue: product.category },
                    thumbnail: { stringValue: product.thumbnail }
                  }
                }
              }))
            }
          }
        }
      }
    };

    res.json(webhookResponse);
  } catch (error) {
    console.error('Error en el webhook de búsqueda de productos:', error);
    res.status(500).json({
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: ['Lo siento, hubo un error al buscar los productos.']
            }
          }
        ]
      }
    });
  }
});

export default router; 