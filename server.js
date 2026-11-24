require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

const FOTO_CAFE = 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_640.jpg';
const FOTO_ESPRESSO = 'https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_640.jpg';
const FOTO_POSTRE = 'https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_640.jpg';
const FOTO_PAN = 'https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438_640.jpg';

const productos = [
    { id: 1, name: 'Coffee latte', category: 'cafe', price: 48, description: 'Espresso suave con abundante leche vaporizada.', ingredients: 'Espresso doble, leche entera vaporizada y ligera capa de espuma.', query: 'Coffee latte', fallback: FOTO_CAFE },
    { id: 2, name: 'Espresso coffee', category: 'cafe', price: 32, description: 'Shot concentrado e intenso con buen cuerpo.', ingredients: 'Granos de café molidos finos extraídos a presión con agua caliente.', query: 'Espresso coffee', fallback: FOTO_ESPRESSO },
    { id: 3, name: 'Cappuccino', category: 'cafe', price: 46, description: 'Equilibrio entre espresso, leche vaporizada y espuma.', ingredients: 'Espresso, leche vaporizada y espuma cremosa al estilo clásico.', query: 'Cappuccino', fallback: FOTO_ESPRESSO },
    { id: 4, name: 'Iced coffee', category: 'frios', price: 45, description: 'Café refrescante servido con hielo.', ingredients: 'Café infusionado en frío o espresso enfriado, hielos y toque de leche.', query: 'Iced coffee', fallback: FOTO_CAFE },
    { id: 5, name: 'Frappuccino', category: 'frios', price: 58, description: 'Bebida fría licuada con hielo y café.', ingredients: 'Café, hielo triturado, leche y base cremosa licuada.', query: 'Frappuccino', fallback: FOTO_ESPRESSO },
    { id: 6, name: 'Milkshake', category: 'frios', price: 55, description: 'Malteada fría y cremosa.', ingredients: 'Helado cremoso, leche fría y saborizante al gusto.', query: 'Milkshake', fallback: FOTO_POSTRE },
    { id: 7, name: 'Chocolate cake', category: 'postres', price: 52, description: 'Rebanada de pastel de chocolate.', ingredients: 'Bizcocho de cacao, harina, huevo, azúcar y cobertura de chocolate.', query: 'Chocolate cake', fallback: FOTO_POSTRE },
    { id: 8, name: 'Cheesecake', category: 'postres', price: 54, description: 'Pastel de queso suave y cremoso.', ingredients: 'Queso crema, base de galleta molida, huevo y vainilla.', query: 'Cheesecake', fallback: FOTO_POSTRE },
    { id: 9, name: 'Brownies', category: 'postres', price: 38, description: 'Brownie de chocolate denso y suave.', ingredients: 'Chocolate oscuro, mantequilla, azúcar, huevo y poca harina.', query: 'Brownies', fallback: FOTO_POSTRE },
    { id: 10, name: 'Croissant', category: 'pan', price: 36, description: 'Pan hojaldrado recién horneado.', ingredients: 'Masa laminada de harina de trigo, levadura y mantequilla.', query: 'Croissant', fallback: FOTO_PAN },
    { id: 11, name: 'Muffins', category: 'pan', price: 34, description: 'Panecillo esponjoso para acompañar.', ingredients: 'Harina, huevo, aceite o mantequilla, azúcar y toque dulce.', query: 'Muffins', fallback: FOTO_PAN },
    { id: 12, name: 'Donuts', category: 'pan', price: 28, description: 'Dona dulce y esponjosa.', ingredients: 'Masa fermentada dulce, levadura y cobertura o glaseado.', query: 'Donuts', fallback: FOTO_POSTRE },
    { id: 13, name: 'Sandwich', category: 'salados', price: 62, description: 'Sándwich preparado al momento.', ingredients: 'Pan de caja o baguette, proteína, queso, vegetales y aderezo.', query: 'Sandwich', fallback: FOTO_PAN }
];

const cachePixabay = {};

function buscarPixabay(query) {
    const clave = (query || '').trim().toLowerCase();
    if (!clave) return Promise.resolve(null);
    if (cachePixabay[clave]) return Promise.resolve(cachePixabay[clave]);

    const key = process.env.PIXABAY_API_KEY;
    if (!key) return Promise.resolve(null);

    const params = new URLSearchParams({
        key: key,
        q: query,
        lang: 'en',
        image_type: 'photo',
        category: 'food',
        safesearch: 'true',
        per_page: '3'
    });

    return fetch(`https://pixabay.com/api/?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            const foto = (data.hits || []).find(img => !img.type || img.type === 'photo');
            if (!foto) return null;

            const resultado = {
                card: foto.webformatURL || foto.largeImageURL,
                large: foto.largeImageURL || foto.webformatURL
            };
            cachePixabay[clave] = resultado;
            return resultado;
        })
        .catch(() => null);
}

app.get('/api/imagenes', (req, res) => {
    const query = (req.query.query || '').trim();
    if (!query) return res.status(400).json({ error: 'Falta query', images: [] });

    buscarPixabay(query)
        .then(img => res.json({ query, images: img ? [img] : [] }))
        .catch(err => res.status(500).json({ error: err.message, images: [] }));
});

app.get('/api/productos', (req, res) => {
    Promise.all(
        productos.map(p =>
            buscarPixabay(p.query).then(img => ({
                ...p,
                card: img ? img.card : p.fallback,
                large: img ? img.large : p.fallback
            }))
        )
    )
        .then(lista => res.json(lista))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});