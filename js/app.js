(function () {
  var M = window.MENU, KEY = "mercys-cart-v2";
  var money = function (n) { return "$" + n.toLocaleString("es-MX"); };
  var wa = function (t) { return "https://wa.me/" + M.whatsapp + "?text=" + encodeURIComponent(t); };
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Ilustraciones de respaldo (hasta que pongas fotos) ---------- */
  var TONES = {
    natural: ["#E8B04B", "#B5442E"], jamon: ["#F2A0A0", "#E58A8A"], pepperoni: ["#B3261E", "#8E1B14"],
    cebolla: ["#F3EAF7", "#D9C2E3"], champinon: ["#EADCC5", "#CBB48F"], tocino: ["#B5442E", "#E7B89A"],
    mix: ["#B3261E", "#E7A230", "#F2A0A0", "#EADCC5"], carne: ["#8E3B27", "#F2A0A0", "#E7A230"],
    hawaiana: ["#F6D44B", "#F2A0A0"], atun: ["#C9B8A8", "#E5D7C8", "#B5442E"],
    veg: ["#E53935", "#EADCC5", "#F6D44B", "#D9C2E3"], molida: ["#6B3E26", "#C8202F", "#F6D44B"],
    pastor: ["#E6892E", "#C45E1C", "#F6D44B"], camaron: ["#F28B50", "#E5D7C8", "#E53935"]
  };
  var DOTS = [[28,28],[50,26],[72,30],[30,50],[52,50],[72,52],[28,72],[50,74],[72,72],[40,38],[62,62],[40,62]];
  function svgUri(body) {
    return "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#F6EAD2"/>' + body + "</svg>");
  }
  function art(kind, tone, shape) {
    var t = TONES[tone] || TONES.natural, b = "";
    if (kind === "pizza") {            /* pizza cuadrada */
      b = shape === "round"
          ? '<circle cx="50" cy="50" r="46" fill="#D9964B"/><circle cx="50" cy="50" r="41" fill="#C8362B"/><circle cx="50" cy="50" r="38" fill="#F7D57E"/>'
          : '<rect x="6" y="6" width="88" height="88" rx="9" fill="#D9964B"/><rect x="12" y="12" width="76" height="76" rx="6" fill="#C8362B"/><rect x="15" y="15" width="70" height="70" rx="4" fill="#F7D57E"/>';
      DOTS.forEach(function (p, i) { b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 === 0 ? 6.5 : 5.2) + '" fill="' + t[i % t.length] + '"/>'; });
      if (shape === "round") b += '<path d="M50 12V88M17 31L83 69M83 31L17 69" stroke="#9E1522" stroke-width="1.4" opacity=".55"/>';
    } else if (kind === "pasta") {
      var sauce = tone === "bolonesa" ? "#C8362B" : "#F7D57E";
      b = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#D8CBB0" stroke-width="2"/><circle cx="50" cy="50" r="34" fill="#F4E7C6"/>' +
          '<path d="M28 52C28 30 72 30 72 52C72 68 34 68 36 52C38 40 62 40 60 52" stroke="#E9C46A" stroke-width="6" fill="none" stroke-linecap="round"/>' +
          '<circle cx="50" cy="46" r="9" fill="' + sauce + '"/><circle cx="44" cy="44" r="3" fill="#8E3B27"/><circle cx="56" cy="48" r="3" fill="#E7A230"/>';
    } else if (kind === "salad") {
      b = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#D8CBB0" stroke-width="2"/><circle cx="50" cy="50" r="36" fill="#F4E7C6"/>' +
          '<ellipse cx="38" cy="42" rx="12" ry="7" fill="#E9D58A" transform="rotate(-30 38 42)"/><ellipse cx="62" cy="44" rx="12" ry="7" fill="#D9B84A" transform="rotate(30 62 44)"/>' +
          '<ellipse cx="50" cy="62" rx="14" ry="7" fill="#F0E3A0"/><circle cx="44" cy="54" r="5" fill="#E53935"/><circle cx="60" cy="58" r="4.5" fill="#E53935"/>' +
          (tone === "atun" ? '<circle cx="52" cy="48" r="5" fill="#C9B8A8"/><circle cx="40" cy="64" r="4" fill="#E5D7C8"/>' : '<circle cx="52" cy="48" r="4" fill="#F6D44B"/>');
    }
    return svgUri(b);
  }

  /* ---------- Carrito (clave "sección:platillo:tamaño" => cantidad) ---------- */
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cart = {}; }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  function info(k) {
    var p = k.split(":"), sec = M.sections[p[0]], it = sec && sec.items[p[1]], zi = +p[2];
    if (!it || it.p[zi] == null) return null;
    return { key: k, sec: sec, it: it, price: it.p[zi], qty: cart[k],
      name: (sec.prefix || "") + it.name, label: sec.sizes ? sec.sizes[zi] : "" };
  }
  Object.keys(cart).forEach(function (k) { if (!info(k) || !(cart[k] > 0)) delete cart[k]; });
  function lines() { return Object.keys(cart).map(info).filter(Boolean); }
  function totals() {
    var n = 0, sum = 0;
    lines().forEach(function (l) { n += l.qty; sum += l.qty * l.price; });
    return { n: n, sum: sum };
  }

  /* ---------- Menú ---------- */
  function card(si, ii, sec, it) {
    var chips = "";
    if (it.p.length > 1) {
      var def = sec.def || 0;
      chips = '<div class="sizes n' + sec.sizes.length + '" role="group" aria-label="Tamaño de ' + it.name + '">' + sec.sizes.map(function (s, i) {
        var d = sec.details && sec.details[i];
        var pc = d ? '<span class="pc">' + d.n + (d.shape === "round" ? " reb." : " porc.") + "</span>" : "";
        return '<button type="button" class="size" data-i="' + i + '" aria-pressed="' + (i === def) + '"><span class="lbl">' + s + '</span><span class="pr">' + money(it.p[i]) + "</span>" + pc + "</button>";
      }).join("") + '</div><p class="sizeinfo" hidden></p>';
    }
    return '<li class="card" data-s="' + si + '" data-i="' + ii + '">' +
        '<div class="top"><img class="thumb" src="images/' + it.img + '" alt="' + it.name + '" width="96" height="96" loading="lazy" data-kind="' + sec.kind + '" data-tone="' + (it.tone || "") + '">' +
        '<div class="txt"><h3>' + it.name + "</h3>" + (it.season ? '<span class="badge">Solo temporada</span>' : "") +
        (it.desc ? "<p>" + it.desc + "</p>" : "") + "</div></div>" + chips +
        '<button type="button" class="add"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg><span>Agregar al pedido</span></button></li>';
  }
  function row(si, ii, it) {
    return '<li class="row"><span class="n">' + it.name + '</span><span class="dots" aria-hidden="true"></span><span class="p">' + money(it.p[0]) +
        '</span><button type="button" class="plus" data-s="' + si + '" data-i="' + ii + '" aria-label="Agregar ' + it.name + ' al pedido">+</button></li>';
  }
  $("menu").innerHTML = M.sections.map(function (sec, si) {
    var body = sec.layout === "list"
        ? '<ul class="rows">' + sec.items.map(function (it, ii) { return row(si, ii, it); }).join("") + "</ul>"
        : '<ul class="cards">' + sec.items.map(function (it, ii) { return card(si, ii, sec, it); }).join("") + "</ul>";
    return '<section class="sec" id="' + sec.id + '"><div class="sec-head"><h2>' + sec.title + "</h2>" +
        (sec.note ? '<span class="note">' + sec.note + "</span>" : "") + "</div>" + body + "</section>";
  }).join("");

  function setThumb(card, i) {
    var sec = M.sections[card.dataset.s], it = sec.items[card.dataset.i], img = card.querySelector("img.thumb");
    var d = sec.details && sec.details[i], shape = d ? d.shape : "square";
    var file = shape === "round" ? (it.imgRound || "personal-" + it.img) : it.img;
    img.classList.toggle("round", shape === "round");
    img.onerror = function () { img.onerror = null; img.src = art(img.dataset.kind, img.dataset.tone, shape); };
    img.src = "images/" + file;
  }
  function setInfo(card, i) {
    var sec = M.sections[card.dataset.s], d = sec.details && sec.details[i], el = card.querySelector(".sizeinfo");
    if (!el) return;
    if (!d) { el.hidden = true; return; }
    el.textContent = sec.sizes[i] + ": " + (d.shape === "round" ? "redonda" : "cuadrada") + (d.cm ? ", " + d.cm : "") + ", " + d.n + (d.shape === "round" ? " rebanadas" : " porciones");
    el.hidden = false;
  }
  document.querySelectorAll(".card").forEach(function (c) {
    var sel = c.querySelector("button.size[aria-pressed='true']"), i = sel ? +sel.dataset.i : 0;
    setThumb(c, i); setInfo(c, i);
  });
  var logo = document.querySelector(".logo");
  logo.addEventListener("error", function () { logo.style.display = "none"; });

  /* ---------- Dock ---------- */
  function renderDock(bump) {
    var t = totals();
    $("cart-count").textContent = t.n;
    $("cart-sum").textContent = money(t.sum);
    $("cart-open").classList.toggle("has", t.n > 0);
    if (bump) { var b = $("cart-open"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }
  function add(key, label) {
    cart[key] = (cart[key] || 0) + 1; persist(); renderDock(true);
    var i = info(key); $("live").textContent = i.name + (i.label ? " (" + i.label + ")" : "") + " agregado. Total " + money(totals().sum);
  }

  $("menu").addEventListener("click", function (e) {
    var chip = e.target.closest("button.size"), addBtn = e.target.closest("button.add"), plus = e.target.closest("button.plus");
    if (chip) {
      var cd = chip.closest(".card");
      cd.querySelectorAll("button.size").forEach(function (b) { b.setAttribute("aria-pressed", b === chip); });
      setThumb(cd, +chip.dataset.i); setInfo(cd, +chip.dataset.i);
    } else if (addBtn) {
      var c = addBtn.closest(".card"), sel = c.querySelector("button.size[aria-pressed='true']");
      add(c.dataset.s + ":" + c.dataset.i + ":" + (sel ? sel.dataset.i : 0));
      var sp = addBtn.querySelector("span"); sp.textContent = "Agregada";
      addBtn.classList.add("done");
      setTimeout(function () { sp.textContent = "Agregar al pedido"; addBtn.classList.remove("done"); }, 1100);
    } else if (plus) {
      add(plus.dataset.s + ":" + plus.dataset.i + ":0");
      plus.classList.add("done"); setTimeout(function () { plus.classList.remove("done"); }, 700);
    }
  });

  /* ---------- Ventana del pedido ---------- */
  var dlg = $("cart-dialog");
  function mode() { return document.querySelector("input[name=mode]:checked").value; }
  function message() {
    var t = totals(), m = mode(), L = ["Hola, quiero hacer un pedido en Mercy's Pizza:", ""];
    lines().forEach(function (l) {
      L.push("- " + l.qty + " x " + l.name + (l.label ? " (" + l.label + ")" : "") + ": " + money(l.qty * l.price));
    });
    L.push("", "Total a pagar: " + money(t.sum) + " (pago al " + (m === "domicilio" ? "recibir el pedido" : "recoger") + ")", "");
    L.push(m === "domicilio" ? "Entrega: a domicilio" : "Entrega: paso a recoger");
    if ($("f-name").value.trim()) L.push("A nombre de: " + $("f-name").value.trim());
    if (m === "domicilio" && $("f-addr").value.trim()) L.push("Dirección: " + $("f-addr").value.trim());
    if ($("f-notes").value.trim()) L.push("Notas: " + $("f-notes").value.trim());
    return L.join("\n");
  }
  function renderCart() {
    var ls = lines(), t = totals();
    $("cart-empty").hidden = ls.length > 0; $("cart-full").hidden = ls.length === 0;
    $("cart-lines").innerHTML = ls.map(function (l) {
      return '<li class="line"><div class="ln"><strong>' + l.name + "</strong>" + (l.label ? "<span>" + l.label + " &middot; " + money(l.price) + "</span>" : "<span>" + money(l.price) + "</span>") + "</div>" +
          '<div class="qty"><button type="button" data-act="dec" data-k="' + l.key + '" aria-label="Quitar uno de ' + l.name + '">&minus;</button><span aria-live="polite">' + l.qty +
          '</span><button type="button" data-act="inc" data-k="' + l.key + '" aria-label="Agregar uno de ' + l.name + '">+</button></div>' +
          '<span class="lt">' + money(l.qty * l.price) + "</span></li>";
    }).join("");
    $("cart-total").textContent = money(t.sum);
    $("addr-wrap").hidden = mode() !== "domicilio";
    $("cart-send").href = wa(message());
    renderDock();
  }
  $("cart-open").addEventListener("click", function () {
    renderCart(); $("cart-err").hidden = true;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  });
  $("cart-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  $("cart-lines").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-act]"); if (!b) return;
    var k = b.dataset.k; cart[k] = (cart[k] || 0) + (b.dataset.act === "inc" ? 1 : -1);
    if (cart[k] <= 0) delete cart[k];
    persist(); renderCart();
  });
  ["input", "change"].forEach(function (ev) {
    ["f-name", "f-addr", "f-notes"].forEach(function (id) { $(id).addEventListener(ev, function () { $("cart-err").hidden = true; renderCart(); }); });
  });
  document.querySelectorAll("input[name=mode]").forEach(function (r) { r.addEventListener("change", renderCart); });
  $("cart-clear").addEventListener("click", function () { cart = {}; persist(); renderCart(); });
  $("cart-send").addEventListener("click", function (e) {
    var err = "", focus = null;
    if (!$("f-name").value.trim()) { err = "Escribe tu nombre para que sepamos a quién entregar el pedido."; focus = $("f-name"); }
    else if (mode() === "domicilio" && !$("f-addr").value.trim()) { err = "Escribe la dirección de entrega."; focus = $("f-addr"); }
    if (err) { e.preventDefault(); $("cart-err").textContent = err; $("cart-err").hidden = false; focus.focus(); }
    else $("cart-err").hidden = true;
  });

  /* ---------- WhatsApp general ---------- */
  $("wa-float").href = wa(M.hello);
  var f = $("footer-wa"); f.href = wa(M.hello); f.textContent = M.whatsappDisplay; f.target = "_blank"; f.rel = "noopener";
  renderDock();
})();