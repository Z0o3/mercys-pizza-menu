(function () {
  var M = window.MENU;
  var money = function (n) { return "$" + n; };
  var wa = function (text) { return "https://wa.me/" + M.whatsapp + "?text=" + encodeURIComponent(text); };

  /* ---------- Ilustraciones de respaldo (cuando aún no hay foto) ---------- */
  var TONES = {
    natural:   ["#E8B04B", "#3E7D32"],
    jamon:     ["#F2A0A0", "#E58A8A"],
    pepperoni: ["#B3261E", "#8E1B14"],
    cebolla:   ["#F3EAF7", "#D9C2E3"],
    champinon: ["#EADCC5", "#CBB48F"],
    tocino:    ["#B5442E", "#E7B89A"],
    mix:       ["#B3261E", "#3E7D32", "#F2A0A0", "#EADCC5"],
    carne:     ["#8E3B27", "#F2A0A0", "#3E7D32"],
    hawaiana:  ["#F6D44B", "#F2A0A0"],
    atun:      ["#C9B8A8", "#E5D7C8", "#3E7D32"],
    veg:       ["#3E8E41", "#E53935", "#EADCC5", "#F6D44B"],
    molida:    ["#6B3E26", "#3E7D32", "#F6D44B"],
    pastor:    ["#E6892E", "#C45E1C", "#F6D44B"],
    camaron:   ["#F28B50", "#E5D7C8", "#E53935"]
  };
  var DOTS = [[50,28],[68,38],[70,58],[55,72],[36,66],[30,46],[50,50],[42,36],[60,52],[44,60]];

  function svgUri(body) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FBEFD5"/>' + body + "</svg>");
  }
  function art(kind, tone) {
    var t = TONES[tone] || TONES.natural, b = "";
    if (kind === "pizza") {
      b = '<circle cx="50" cy="50" r="46" fill="#D9964B"/><circle cx="50" cy="50" r="41" fill="#C8362B"/><circle cx="50" cy="50" r="38" fill="#F7D57E"/>';
      DOTS.forEach(function (p, i) {
        b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 === 0 ? 6.5 : 5) + '" fill="' + t[i % t.length] + '"/>';
      });
    } else if (kind === "pasta") {
      var sauce = tone === "bolonesa" ? "#C8362B" : "#F7D57E";
      b = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#D8CBB0" stroke-width="2"/><circle cx="50" cy="50" r="34" fill="#F4E7C6"/>' +
          '<path d="M28 52C28 30 72 30 72 52C72 68 34 68 36 52C38 40 62 40 60 52" stroke="#E9C46A" stroke-width="6" fill="none" stroke-linecap="round"/>' +
          '<circle cx="50" cy="46" r="9" fill="' + sauce + '"/><circle cx="44" cy="44" r="3" fill="#8E3B27"/><circle cx="56" cy="48" r="3" fill="#3E7D32"/>';
    } else if (kind === "salad") {
      b = '<circle cx="50" cy="50" r="44" fill="#fff" stroke="#D8CBB0" stroke-width="2"/><circle cx="50" cy="50" r="36" fill="#DDE8D2"/>' +
          '<ellipse cx="38" cy="42" rx="12" ry="7" fill="#4F9A4A" transform="rotate(-30 38 42)"/><ellipse cx="62" cy="44" rx="12" ry="7" fill="#3E7D32" transform="rotate(30 62 44)"/>' +
          '<ellipse cx="50" cy="62" rx="14" ry="7" fill="#6DB35E"/><circle cx="44" cy="54" r="5" fill="#E53935"/><circle cx="60" cy="58" r="4.5" fill="#E53935"/>' +
          (tone === "atun" ? '<circle cx="52" cy="48" r="5" fill="#C9B8A8"/><circle cx="40" cy="64" r="4" fill="#E5D7C8"/>' : '<circle cx="52" cy="48" r="4" fill="#F6D44B"/>');
    }
    return svgUri(b);
  }

  /* ---------- Render ---------- */
  function card(si, ii, sec, it) {
    var multi = it.p.length > 1;
    var chips = multi ? '<div class="sizes" role="group" aria-label="Tamaño de ' + it.name + '">' +
      sec.sizes.map(function (s, i) {
        return '<button type="button" class="size" data-i="' + i + '" aria-pressed="' + (i === 0) + '"><span class="lbl">' + s + '</span><span class="pr">' + money(it.p[i]) + "</span></button>";
      }).join("") + "</div>" : "";
    return '<li class="card" data-s="' + si + '" data-i="' + ii + '">' +
      '<div class="top"><img class="thumb" src="images/' + it.img + '" alt="' + it.name + '" width="96" height="96" loading="lazy" data-kind="' + sec.kind + '" data-tone="' + (it.tone || "") + '">' +
      '<div class="txt"><h3>' + it.name + (it.season ? ' <span class="badge">Solo temporada</span>' : "") + "</h3>" +
      (it.desc ? "<p>" + it.desc + "</p>" : "") + "</div></div>" + chips +
      '<a class="order" href="' + wa(message(sec, it, 0)) + '" target="_blank" rel="noopener">Pedir por WhatsApp</a></li>';
  }
  function row(it) {
    return '<li class="row"><span class="n">' + it.name + '</span><span class="dots" aria-hidden="true"></span><span class="p">' + money(it.p[0]) + "</span></li>";
  }
  function message(sec, it, i) {
    return sec.msg.replace("{name}", it.name).replace("{size}", (sec.sizes ? sec.sizes[i] : "").toLowerCase());
  }

  var html = M.sections.map(function (sec, si) {
    var body = sec.layout === "list"
      ? '<ul class="rows">' + sec.items.map(row).join("") + "</ul>"
      : '<ul class="cards">' + sec.items.map(function (it, ii) { return card(si, ii, sec, it); }).join("") + "</ul>";
    return '<section class="sec" id="' + sec.id + '"><div class="sec-head"><h2>' + sec.title + "</h2>" +
      (sec.note ? '<span class="note">' + sec.note + "</span>" : "") + "</div>" + body + "</section>";
  }).join("");
  document.getElementById("menu").innerHTML = html;

  /* ---------- Fotos con respaldo ---------- */
  document.querySelectorAll("img.thumb").forEach(function (img) {
    function fb() { img.src = art(img.dataset.kind, img.dataset.tone); }
    img.addEventListener("error", fb, { once: true });
    if (img.complete && img.naturalWidth === 0) fb();
  });
  var logo = document.querySelector(".logo");
  if (logo) logo.addEventListener("error", function () { logo.style.display = "none"; });

  /* ---------- Tamaño elegido => mensaje de WhatsApp ---------- */
  document.getElementById("menu").addEventListener("click", function (e) {
    var btn = e.target.closest("button.size");
    if (!btn) return;
    var c = btn.closest(".card"), sec = M.sections[c.dataset.s], it = sec.items[c.dataset.i], i = +btn.dataset.i;
    c.querySelectorAll("button.size").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
    c.querySelector("a.order").href = wa(message(sec, it, i));
  });

  /* ---------- WhatsApp general ---------- */
  document.getElementById("wa-float").href = wa(M.hello);
  var f = document.getElementById("footer-wa");
  f.href = wa(M.hello); f.textContent = M.whatsappDisplay; f.target = "_blank"; f.rel = "noopener";
})();
