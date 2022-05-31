import { DateTime } from "../node_modules/luxon/src/luxon.js";
const dateSection = document.querySelector('.date');

function time() {
  dateSection.textContent = DateTime.now().toLocaleString({
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default siteTime;