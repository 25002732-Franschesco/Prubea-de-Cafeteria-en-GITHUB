const contenedor = document.getElementById('productos');
const buscador = document.getElementById('buscador');

const FOTO_CAFE = 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_640.jpg';
const FOTO_ESPRESSO = 'https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_640.jpg';
const FOTO_POSTRE = 'https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_640.jpg';
const FOTO_PAN = 'https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438_640.jpg';

const productos = [
    {
        name: 'Coffee latte',
        category: 'cafe',
        price: 48,
        description: 'Bebida caliente suave y cremosa, ideal para empezar el día.',
        hechoDe: 'Shot de espresso, leche entera vaporizada y una capa ligera de espuma.',
        img: FOTO_CAFE
    },
    {
        name: 'Espresso coffee',
        category: 'cafe',
        price: 32,
        description: 'Café corto e intenso con sabor concentrado.',
        hechoDe: 'Granos de café molidos finos extraídos con agua caliente a presión.',
        img: FOTO_ESPRESSO
    },
    {
        name: 'Cappuccino',
        category: 'cafe',
        price: 46,
        description: 'Clásico de cafetería con balance entre café y espuma de leche.',
        hechoDe: 'Espresso, leche vaporizada y espuma densa y cremosa.',
        img: FOTO_ESPRESSO
    },
    {
        name: 'Iced coffee',
        category: 'frios',
        price: 45,
        description: 'Opción fría y refrescante para días calurosos.',
        hechoDe: 'Café frío o espresso con hielos y un toque de leche.',
        img: FOTO_CAFE
    },
    {
        name: 'Frappuccino',
        category: 'frios',
        price: 58,
        description: 'Bebida fría licuada con textura espesa tipo granizado.',
        hechoDe: 'Café, hielo triturado, leche y base cremosa licuada.',
        img: FOTO_ESPRESSO
    },
    {
        name: 'Milkshake',
        category: 'frios',
        price: 55,
        description: 'Bebida dulce, fría y muy cremosa.',
        hechoDe: 'Helado cremoso, leche fría y saborizante al gusto.',
        img: FOTO_POSTRE
    },
    {
        name: 'Chocolate cake',
        category: 'postres',
        price: 52,
        description: 'Rebanada dulce con sabor marcado a cacao.',
        hechoDe: 'Bizcocho de cacao, harina, huevo, azúcar y cobertura de chocolate.',
        img: FOTO_POSTRE
    },
    {
        name: 'Cheesecake',
        category: 'postres',
        price: 54,
        description: 'Postre suave y cremoso con base crujiente.',
        hechoDe: 'Queso crema, base de galleta molida, huevo y vainilla.',
        img: FOTO_POSTRE
    },
    {
        name: 'Brownies',
        category: 'postres',
        price: 38,
        description: 'Porción compacta y suave con intenso sabor a chocolate.',
        hechoDe: 'Chocolate oscuro, mantequilla, azúcar, huevo y poca harina.',
        img: FOTO_POSTRE
    },
    {
        name: 'Croissant',
        category: 'pan',
        price: 36,
        description: 'Pan ligero por dentro y con capas doradas por fuera.',
        hechoDe: 'Masa hojaldrada de harina de trigo, mantequilla en capas y levadura.',
        img: FOTO_PAN
    },
    {
        name: 'Muffins',
        category: 'pan',
        price: 34,
        description: 'Panecillo esponjoso ideal para acompañar café.',
        hechoDe: 'Harina, huevo, mantequilla o aceite, azúcar y polvo para hornear.',
        img: FOTO_PAN
    },
    {
        name: 'Donuts',
        category: 'pan',
        price: 28,
        description: 'Pan dulce suave con acabado glaseado o azucarado.',
        hechoDe: 'Masa fermentada dulce, levadura y glaseado o cobertura.',
        img: FOTO_POSTRE
    },
    {
        name: 'Sandwich',
        category: 'salados',
        price: 62,
        description: 'Opción salada completa para desayunar o comer.',
        hechoDe: 'Pan, proteína, queso, vegetales frescos y aderezo.',
        img: FOTO_PAN
    }
];

let filtroActual = 'todos';

const modal = document.createElement('div');
modal.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:99999; justify-content:center; align-items:center; padding:16px; box-sizing:border-box;';
document.body.appendChild(modal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

function abrirModal(item) {
    modal.innerHTML = `
        <div style="background:#241c18; color:#ffffff; border:2px solid #a67c52; border-radius:14px; max-width:440px; width:100%; padding:18px; box-sizing:border-box; font-family:sans-serif; max-height:90vh; overflow-y:auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px;">
                <h2 style="margin:0; font-size:20px; color:#ffffff;">${item.name}</h2>
                <button id="mCerrar" type="button" style="background:#4a3728; color:#ffffff; border:none; border-radius:8px; padding:6px 12px; cursor:pointer; font-size:16px;">✕</button>
            </div>
            <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='${FOTO_CAFE}';" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom:12px; display:block;">
            <p style="margin:0 0 10px 0; color:#f0e6dc; line-height:1.45;">${item.description}</p>
            <p style="margin:0 0 10px 0; color:#ffffff; line-height:1.45;"><strong>De qué está hecho:</strong> ${item.hechoDe}</p>
            <p style="margin:0 0 6px 0; color:#ffd57e; font-size:16px;"><strong>Precio:</strong> $${item.price} MXN</p>
            <p style="margin:0; color:#cbbba8; font-size:14px;"><strong>Categoría:</strong> ${item.category}</p>
        </div>
    `;

    document.getElementById('mCerrar').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.style.display = 'flex';
}

function pintarTarjetas(items) {
    if (!contenedor) return;

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No hay resultados.</p>';
        return;
    }

    contenedor.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'producto';
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="imagen-producto">
                <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='${FOTO_CAFE}';" style="width:100%; height:100%; object-fit:cover; border-radius:0.4rem;">
            </div>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p><strong>$${item.price}</strong></p>
            <a href="#" class="ver-detalles">Más detalles</a>
        `;

        card.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal(item);
        });

        contenedor.appendChild(card);
    });
}

function filtrarCatalogo() {
    const texto = buscador ? buscador.value.trim().toLowerCase() : '';

    const filtrados = productos.filter(item => {
        const okCat = filtroActual === 'todos' || item.category === filtroActual;
        const okTxt =
            texto === '' ||
            item.name.toLowerCase().includes(texto) ||
            item.description.toLowerCase().includes(texto) ||
            item.hechoDe.toLowerCase().includes(texto);
        return okCat && okTxt;
    });

    pintarTarjetas(filtrados);
}

if (buscador) {
    buscador.addEventListener('input', filtrarCatalogo);
}

document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        filtroActual = btn.dataset.filter;
        filtrarCatalogo();
    });
});

filtrarCatalogo();