const contenedor = document.getElementById('productos');
const buscador = document.getElementById('buscador');

const IMAGEN_RESPALDO = '../imagenes/coffee-latte.jpg';

const productos = [
    {
        name: 'Coffee latte',
        category: 'cafe',
        price: 48,
        description: 'Bebida caliente suave y cremosa, ideal para empezar el día.',
        hechoDe: 'Shot de espresso, leche entera vaporizada y una capa ligera de espuma.',
        img: '../icons/coffee-latte.svg'
    },
    {
        name: 'Espresso coffee',
        category: 'cafe',
        price: 32,
        description: 'Café corto e intenso con sabor concentrado.',
        hechoDe: 'Granos de café molidos finos extraídos con agua caliente a presión.',
        img: '../icons/espresso-coffee.svg'
    },
    {
        name: 'Cappuccino',
        category: 'cafe',
        price: 46,
        description: 'Clásico de cafetería con balance entre café y espuma de leche.',
        hechoDe: 'Espresso, leche vaporizada y espuma densa y cremosa.',
        img: '../icons/cappuccino.svg'
    },
    {
        name: 'Iced coffee',
        category: 'frios',
        price: 45,
        description: 'Opción fría y refrescante para días calurosos.',
        hechoDe: 'Café frío o espresso con hielos y un toque de leche.',
        img: '../icons/iced-coffee.svg'
    },
    {
        name: 'Frappuccino',
        category: 'frios',
        price: 58,
        description: 'Bebida fría licuada con textura espesa tipo granizado.',
        hechoDe: 'Café, hielo triturado, leche y base cremosa licuada.',
        img: '../icons/frappuccino.svg'
    },
    {
        name: 'Milkshake',
        category: 'frios',
        price: 55,
        description: 'Bebida dulce, fría y muy cremosa.',
        hechoDe: 'Helado cremoso, leche fría y saborizante al gusto.',
        img: '../icons/milkshake.svg'
    },
    {
        name: 'Chocolate cake',
        category: 'postres',
        price: 52,
        description: 'Rebanada dulce con sabor marcado a cacao.',
        hechoDe: 'Bizcocho de cacao, harina, huevo, azúcar y cobertura de chocolate.',
        img: '../icons/chocolate-cake.svg'
    },
    {
        name: 'Cheesecake',
        category: 'postres',
        price: 54,
        description: 'Postre suave y cremoso con base crujiente.',
        hechoDe: 'Queso crema, base de galleta molida, huevo y vainilla.',
        img: '../icons/cheesecake.svg'
    },
    {
        name: 'Brownies',
        category: 'postres',
        price: 38,
        description: 'Porción compacta y suave con intenso sabor a chocolate.',
        hechoDe: 'Chocolate oscuro, mantequilla, azúcar, huevo y poca harina.',
        img: '../icons/brownies.svg'
    },
    {
        name: 'Croissant',
        category: 'pan',
        price: 36,
        description: 'Pan ligero por dentro y con capas doradas por fuera.',
        hechoDe: 'Masa hojaldrada de harina de trigo, mantequilla en capas y levadura.',
        img: '../icons/croissant.svg'
    },
    {
        name: 'Muffins',
        category: 'pan',
        price: 34,
        description: 'Panecillo esponjoso ideal para acompañar café.',
        hechoDe: 'Harina, huevo, mantequilla o aceite, azúcar y polvo para hornear.',
        img: '../icons/muffins.svg'
    },
    {
        name: 'Donuts',
        category: 'pan',
        price: 28,
        description: 'Pan dulce suave con acabado glaseado o azucarado.',
        hechoDe: 'Masa fermentada dulce, levadura y glaseado o cobertura.',
        img: '../icons/donuts.svg'
    },
    {
        name: 'Sandwich',
        category: 'salados',
        price: 62,
        description: 'Opción salada completa para desayunar o comer.',
        hechoDe: 'Pan, proteína, queso, vegetales frescos y aderezo.',
        img: '../icons/sandwich.svg'
    }
];

let filtroActual = 'todos';

const modal = document.createElement('div');
modal.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(12, 8, 6, 0.82); backdrop-filter:blur(4px); z-index:99999; justify-content:center; align-items:center; padding:18px; box-sizing:border-box;';
document.body.appendChild(modal);

function cerrarModal() {
    modal.style.display = 'none';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        cerrarModal();
    }
});

function abrirModal(item) {
    modal.innerHTML = `
        <div style="background:linear-gradient(180deg, #2b211c 0%, #1f1714 100%); color:#ffffff; border:1px solid rgba(212, 163, 115, 0.45); border-radius:18px; max-width:460px; width:100%; padding:20px; box-sizing:border-box; font-family:inherit; max-height:90vh; overflow-y:auto; box-shadow:0 24px 60px rgba(0, 0, 0, 0.65);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:14px;">
                <div>
                    <span style="display:inline-block; background:rgba(166, 124, 82, 0.22); color:#e6be8a; border:1px solid rgba(212, 163, 115, 0.35); border-radius:999px; padding:3px 10px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">
                        ${item.category}
                    </span>
                    <h2 style="margin:0; font-size:22px; font-weight:700; color:#fff8f0; line-height:1.2;">${item.name}</h2>
                </div>
                <button id="mCerrar" type="button" aria-label="Cerrar" style="background:#3a2c24; color:#f5e9dc; border:1px solid rgba(255,255,255,0.1); border-radius:10px; width:36px; height:36px; flex-shrink:0; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:background 0.2s ease;">✕</button>
            </div>

            <div style="background:linear-gradient(145deg, #b6895b, #8d633b); border-radius:14px; padding:16px; margin-bottom:16px; display:flex; justify-content:center; align-items:center; min-height:155px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.22);">
                <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='${IMAGEN_RESPALDO}';" style="max-width:100%; max-height:135px; width:auto; height:auto; object-fit:contain; display:block; filter:drop-shadow(0 8px 14px rgba(0,0,0,0.28));">
            </div>

            <p style="margin:0 0 14px 0; color:#efe3d6; font-size:14.5px; line-height:1.55;">
                ${item.description}
            </p>

            <div style="background:rgba(255, 255, 255, 0.04); border:1px solid rgba(255, 255, 255, 0.08); border-radius:12px; padding:12px 14px; margin-bottom:16px;">
                <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#e6be8a; margin-bottom:4px;">
                    De qué está hecho
                </div>
                <p style="margin:0; color:#ffffff; font-size:14px; line-height:1.5;">
                    ${item.hechoDe}
                </p>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding-top:12px; border-top:1px solid rgba(255, 255, 255, 0.1);">
                <div>
                    <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:#cbbba8;">Precio</div>
                    <div style="color:#ffd57e; font-size:21px; font-weight:800; line-height:1.15;">$${item.price} <span style="font-size:12px; font-weight:600;">MXN</span></div>
                </div>
                <button id="mCerrarSec" type="button" style="background:#a67c52; color:#1b130f; border:none; border-radius:10px; padding:9px 16px; cursor:pointer; font-size:13.5px; font-weight:700;">
                    Listo
                </button>
            </div>
        </div>
    `;

    const btnCerrar = document.getElementById('mCerrar');
    const btnCerrarSec = document.getElementById('mCerrarSec');

    btnCerrar.addEventListener('click', cerrarModal);
    btnCerrarSec.addEventListener('click', cerrarModal);

    btnCerrar.addEventListener('mouseenter', () => {
        btnCerrar.style.background = '#533f33';
    });
    btnCerrar.addEventListener('mouseleave', () => {
        btnCerrar.style.background = '#3a2c24';
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
                <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='${IMAGEN_RESPALDO}';">
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