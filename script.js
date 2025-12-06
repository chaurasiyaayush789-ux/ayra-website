/* Smooth scroll */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const offset = window.scrollY + rect.top - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

/* Footer year update */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* Mobile nav */
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

navToggle?.addEventListener("click", () => {
  navMobile.style.display =
    navMobile.style.display === "flex" ? "none" : "flex";
});

navMobile?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navMobile.style.display = "none";
  });
});

/* Console typing animation */
const consoleOutput = document.getElementById("consoleOutput");

const messages = [
  "you@pc → ayra, open WhatsApp and read my last message",
  "AYRA → Reading...",
  "AYRA → Latest msg from Aayush: “Kal milte h?”",
  "you@pc → reply: haan bro, 4pm",
  "AYRA → Reply sent ✔",
];

let i = 0;
function typeMsg() {
  if (i < messages.length) {
    consoleOutput.innerHTML += messages[i] + "<br/>";
    i++;
    setTimeout(typeMsg, 1300);
  }
}
typeMsg();

/* FORM SUBMIT — Animation + Error handling */
const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form?.addEventListener("submit", async function (e) {
  e.preventDefault();

  statusBox.style.display = "none";
  submitBtn.classList.add("btn-loading");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    submitBtn.classList.remove("btn-loading");

    if (response.ok) {
      window.location.href = "thank-you.html";
    } else {
      statusBox.textContent = "Something went wrong, please try again.";
      statusBox.className = "form-status error";
      statusBox.style.display = "block";
    }
  } catch {
    submitBtn.classList.remove("btn-loading");
    statusBox.textContent = "Network error. Please check your connection.";
    statusBox.className = "form-status error";
    statusBox.style.display = "block";
  }
});
