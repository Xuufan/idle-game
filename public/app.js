let resources = 0;
document.getElementById("click-button").addEventListener("click", () => {
  resources += 1;
  updateResourceCounter();
});

// Auto-generate resources every second
setInterval(() => {
  resources += 1;
  updateResourceCounter();
}, 1000);

function updateResourceCounter() {
  document.getElementById("resource-counter").textContent = `Resources: ${resources}`;
}