/* =====================================================================
   DATOS DEL MENÚ — aquí cambias precios, nombres y el número de WhatsApp.
   Número en formato internacional sin "+" ni espacios (52 + 10 dígitos).
   Fotos: pon el archivo en /images con el nombre indicado en "img".
   Si la foto no existe, se muestra una ilustración de respaldo.
   ===================================================================== */
window.MENU = {
  whatsapp: "524111013641",
  whatsappDisplay: "411 101 3641",
  hello: "Hola, me gustaría hacer un pedido.",

  sections: [
    {
      id: "pizzas", title: "Pizzas", note: "Cinco tamaños", kind: "pizza", layout: "cards",
      sizes: ["Chica", "Mediana", "Grande", "Familiar", "Giganta"],
      msg: "Hola, me gustaría pedir una pizza {name}, tamaño {size}.",
      items: [
        { name: "Natural", desc: "Salsa italiana, queso y especias", p: [115,160,180,200,290], img: "natural.jpg", tone: "natural" },
        { name: "Jamón de pierna", desc: "", p: [115,160,160,200,290], img: "jamon-de-pierna.jpg", tone: "jamon" },
        { name: "Salami italiano", desc: "", p: [115,160,160,200,290], img: "salami-italiano.jpg", tone: "pepperoni" },
        { name: "Cebollas españolas", desc: "", p: [115,160,160,200,290], img: "cebollas-espanolas.jpg", tone: "cebolla" },
        { name: "Champiñones al ajillo", desc: "O solos", p: [115,160,180,200,290], img: "champinones-al-ajillo.jpg", tone: "champinon" },
        { name: "Tocino y cebolla", desc: "", p: [115,160,180,200,290], img: "tocino-y-cebolla.jpg", tone: "tocino" },
        { name: "Pepperoni", desc: "", p: [115,160,180,200,290], img: "pepperoni.jpg", tone: "pepperoni" },
        { name: "Mercy's Especial", desc: "Un poco de todo", p: [115,160,180,200,290], img: "mercys-especial.jpg", tone: "mix" },
        { name: "Carnes frías selectas", desc: "Jamón, salami, salchicha y chorizo", p: [115,160,180,200,290], img: "carnes-frias.jpg", tone: "carne" },
        { name: "Hawaiana", desc: "Jamón con piña", p: [115,160,180,200,290], img: "hawaiana.jpg", tone: "hawaiana" },
        { name: "Cuaresma", desc: "Champiñón, atún y cebolla", p: [115,160,180,200,290], img: "cuaresma.jpg", tone: "atun" },
        { name: "Vegetariana", desc: "Champiñón, pimiento, cebolla y lechuga", p: [115,160,180,200,290], img: "vegetariana.jpg", tone: "veg" },
        { name: "Ranchera", desc: "Jamón, chorizo, cebolla, jitomate y jalapeño", p: [115,160,180,200,290], img: "ranchera.jpg", tone: "carne" },
        { name: "Exótica", desc: "Combinación de 3 quesos, carne molida y jalapeños", p: [115,160,180,200,290], img: "exotica.jpg", tone: "molida" },
        { name: "Caprichosa", desc: "Salami, tocino, pimiento, jitomate y orégano", p: [115,160,180,200,290], img: "caprichosa.jpg", tone: "mix" },
        { name: "Al pastor", desc: "Carne al pastor con o sin piña", p: [115,160,180,200,290], img: "al-pastor.jpg", tone: "pastor" },
        { name: "Especial de atún", desc: "Atún, jitomate y jalapeños", p: [115,160,180,200,290], img: "especial-de-atun.jpg", tone: "atun" },
        { name: "Camarones", desc: "Solos o con champiñones", p: [140,175,180,200,290], img: "camarones.jpg", tone: "camaron", season: true },
        { name: "Marinera", desc: "Camarones, atún, pimiento y cebolla", p: [155,185,210,220,355], img: "marinera.jpg", tone: "camaron", season: true }
      ]
    },
    {
      id: "spaghetti", title: "Spaghetti", note: "Orden o media orden", kind: "pasta", layout: "cards",
      sizes: ["Orden", "½ Orden"],
      msg: "Hola, me gustaría pedir spaghetti {name}, {size}.",
      items: [
        { name: "Blanco", desc: "Jamón y queso", p: [100,60], img: "spaghetti-blanco.jpg", tone: "blanco" },
        { name: "Boloñesa", desc: "Carne molida", p: [100,60], img: "spaghetti-bolonesa.jpg", tone: "bolonesa" }
      ]
    },
    {
      id: "ensaladas", title: "Ensaladas", note: "Orden o media orden", kind: "salad", layout: "cards",
      sizes: ["Orden", "½ Orden"],
      msg: "Hola, me gustaría pedir la ensalada {name}, {size}.",
      items: [
        /* VERIFICAR PRECIOS: en la foto del menú se cortan ("$10…" y "$6…"). Se asumió $100 y $60. */
        { name: "Mercy's", desc: "De la casa", p: [100,60], img: "ensalada-mercys.jpg", tone: "casa" },
        { name: "De atún", desc: "Atún, mayonesa y verduras", p: [100,60], img: "ensalada-atun.jpg", tone: "atun" }
      ]
    },
    {
      id: "bebidas", title: "Bebidas", note: "", kind: "drink", layout: "list",
      items: [
        { name: "Refresco 600 ml", p: [32] },
        { name: "Fuze Tea", p: [35] },
        { name: "Agua natural 600 ml", p: [20] },
        { name: "Agua fresca", p: [25] },
        { name: "Refresco de 2 litros", p: [50] }
      ]
    }
  ]
};
