/**
 * Submit form
 */
const form = document.querySelector("form")!;

const submitBtn = document.getElementById("submitBtn")!;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  console.log("Dados enviados:", data);

  fetch("http://localhost:3000/disposal-points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(
    async (value) => console.log(await value.json()),
    () => console.error("Error!"),
  );
});
