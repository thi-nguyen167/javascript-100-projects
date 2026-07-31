"use strict";

const btnRandom = document.getElementById("random");
const displayColor = document.getElementById("displayColor");
const colorValueText = document.getElementById("color-value");
const colorList = document.getElementById("color-list");

const copyBtn = document.getElementById("copy-btn");

let storedData = JSON.parse(localStorage.getItem("colors"));
let generatedColors = Array.isArray(storedData) ? storedData : [];

// Random Hex
const generateHexCode = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

const getContrastColor = (hexCode) => {
  const hex = hexCode.replace("#", "");

  // HEX Code to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

const getRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes === 1) return "1 minute ago";
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return "1 hour ago";
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  return "A while ago";
};

const displayColorUI = (hexCode) => {
  displayColor.style.background = hexCode;

  colorValueText.textContent = hexCode;

  // Contrast Color
  const textColor = getContrastColor(hexCode);

  colorValueText.style.color = textColor;

  const smallTexts = displayColor.querySelectorAll("span:not(#color-value)");
  smallTexts.forEach((span) => {
    span.style.color = textColor;
  });
};

const renderColorList = (data) => {
  localStorage.setItem("colors", JSON.stringify(data));

  colorList.innerHTML = data
    .slice(0, 5)
    .map((item) => {
      return `
        <li class="flex flex-row items-center gap-4 group cursor-pointer hover:bg-surface-variant/30 p-2 -ml-2 rounded-lg transition-colors">
            <div style="background-color: ${item.hex};" class="w-12 h-12 rounded-lg shadow-sm border border-outline-variant/30 flex-shrink-0"></div>
            <div class="flex flex-col justify-center">
                <span class="text-primary font-bold text-sm uppercase">${item.hex}</span>
                <span class="text-outline uppercase tracking-widest text-[9px] mt-1">${getRelativeTime(item.timestamp)}</span>
            </div>
        </li>
      `;
    })
    .join("");
};

btnRandom.addEventListener("click", () => {
  const newHex = generateHexCode();

  displayColorUI(newHex);

  generatedColors.unshift({
    hex: newHex,
    timestamp: new Date().toISOString(),
  });

  if (generatedColors.length > 5) {
    generatedColors.pop();
  }

  renderColorList(generatedColors);
});

copyBtn.addEventListener("click", async () => {
  const currentHex = colorValueText.textContent;

  try {
    await navigator.clipboard.writeText(currentHex);

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("text-primary", "border-primary");

    setTimeout(() => {
      copyBtn.textContent = "Click to copy";
      copyBtn.classList.remove("text-primary", "border-primary");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    copyBtn.textContent = "Failed!";

    setTimeout(() => {
      copyBtn.textContent = "Click to copy";
    }, 2000);
  }
});

const init = () => {
  if (generatedColors.length > 0) {
    displayColorUI(generatedColors[0].hex);
    renderColorList(generatedColors);

    setInterval(() => {
      renderColorList(generatedColors);
    }, 60000);
  } else {
    displayColorUI(generateHexCode());
  }
};

init();
