"use strict";

const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
}
menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest("header")) setMenu(false);
});

const theme = document.querySelector("#theme");
function setTheme(value) {
  document.documentElement.dataset.theme = value;
  theme.setAttribute("aria-pressed", String(value === "dark"));
}
try { setTheme(localStorage.getItem("hc-apariencia") === "dark" ? "dark" : "light"); }
catch { setTheme("light"); }
theme.addEventListener("click", () => {
  const value = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(value);
  try { localStorage.setItem("hc-apariencia", value); } catch { /* Almacenamiento opcional. */ }
});

const slides = Array.from(document.querySelectorAll(".slide"));
let activeSlide = 0;
document.querySelectorAll("[data-step]").forEach(button => {
  button.addEventListener("click", () => {
    activeSlide = (activeSlide + Number(button.dataset.step) + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== activeSlide; });
    const { cat, title, key } = slides[activeSlide].dataset;
    document.querySelector("#slide-cat").textContent = cat;
    const link = document.querySelector("#slide-title");
    link.textContent = title;
    link.href = "proyectos.html#" + key;
    document.querySelector("#slide-count").textContent =
      String(activeSlide + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
  });
});

const filters = document.querySelectorAll("[data-filter]");
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    let count = 0;
    document.querySelectorAll(".catalog .card").forEach(card => {
      card.hidden = button.dataset.filter !== "Todos" && button.dataset.filter !== card.dataset.category;
      if (!card.hidden) count++;
    });
    document.querySelector("#resultados").textContent = count + (count === 1 ? " proyecto" : " proyectos");
  });
});

const dialogs = Array.from(document.querySelectorAll("dialog"));
function showProjectFromUrl() {
  const desired = document.getElementById("ficha-" + location.hash.slice(1));
  dialogs.forEach(dialog => {
    if (dialog.open && dialog !== desired) dialog.close();
  });
  if (dialogs.includes(desired) && !desired.open) desired.showModal();
}
dialogs.forEach(dialog => {
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (dialog.id === "ficha-" + location.hash.slice(1)) {
      history.replaceState(null, "", location.href.split("#")[0]);
    }
  });
});
if (dialogs.length) {
  window.addEventListener("hashchange", showProjectFromUrl);
  showProjectFromUrl();
}

const form = document.querySelector("#solicitud");
if (form) {
  const params = new URLSearchParams(location.search);
  const service = form.elements.servicio;
  if (Array.from(service.options).some(option => option.value === params.get("servicio"))) {
    service.value = params.get("servicio");
  }
  const reference = params.get("referencia");
  if (reference) form.elements.mensaje.value = "Me interesa una obra similar a " + reference.slice(0, 160) + ".";
  const draft = document.querySelector("#draft");
  form.addEventListener("input", event => {
    event.target.setCustomValidity("");
    draft.hidden = true;
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    for (const field of form.querySelectorAll("[required]")) {
      if (!field.value.trim()) {
        field.setCustomValidity("Completa este campo.");
        field.reportValidity();
        return;
      }
    }
    const data = new FormData(form);
    const value = name => data.get(name).trim();
    const message = [
      "Hola, H&C Constructora. Quisiera solicitar una cotización.",
      "",
      "Servicio: " + value("servicio"),
      "Ubicación de la obra: " + value("ubicacion"),
      ...(value("estado") ? ["Estado del proyecto: " + value("estado")] : []),
      ...(value("telefono") ? ["Teléfono: " + value("telefono")] : []),
      value("mensaje"),
      "",
      value("nombre"),
      value("correo")
    ].join("\n");
    document.querySelector("#message").textContent = message;
    document.querySelector("#whatsapp").href = "https://wa.me/50588888888?text=" + encodeURIComponent(message);
    document.querySelector("#email").href = "mailto:info@hcconstructora.com?subject=" +
      encodeURIComponent("Cotización · " + value("servicio")) + "&body=" + encodeURIComponent(message);
    draft.hidden = false;
    draft.focus();
  });
}
