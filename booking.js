const bookingForm = document.querySelector(".booking-form");
const fallbackLink = document.querySelector(".booking-fallback");
const customerName = bookingForm.elements.namedItem("customerName");
const phone = bookingForm.elements.namedItem("phone");
const work = bookingForm.elements.namedItem("work");
let selectedWork = "";

for (const link of document.querySelectorAll(".price-list [data-work]")) {
  link.addEventListener("click", () => {
    if (work.value.trim() && work.value !== selectedWork) return;
    selectedWork = link.dataset.work;
    work.value = selectedWork;
  });
}

customerName.addEventListener("input", () => customerName.setCustomValidity(""));
phone.addEventListener("input", () => phone.setCustomValidity(""));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = customerName.value.trim();
  const phoneValue = phone.value.trim();
  if (!nameValue) {
    customerName.setCustomValidity("Укажите ваше имя.");
    customerName.reportValidity();
    return;
  }

  const phoneDigits = phoneValue.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(phoneValue) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    phone.setCustomValidity("Проверьте номер телефона. Например, +7 (900) 123-45-67.");
    phone.reportValidity();
    return;
  }

  const message = [
    "Здравствуйте! Хочу записаться в «Абсолют Моторс».",
    "Имя: " + nameValue,
    "Телефон: " + phoneValue,
  ];
  const workValue = work.value.trim();
  if (workValue) message.push("Что нужно сделать: " + workValue);

  const destination = new URL(fallbackLink.href);
  destination.searchParams.set("text", message.join("\n"));
  window.location.assign(destination.href);
});

bookingForm.hidden = false;
