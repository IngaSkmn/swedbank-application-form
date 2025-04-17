const steps = document.querySelectorAll(".form-step");
const summary = document.getElementById("summary-content");
const stepLabels = document.querySelectorAll(".step-label");

const slider = document.getElementById("credit-limit");
const sliderInput = document.getElementById("credit-limit-input");
const display = document.getElementById("credit-limit-display");

function updateCreditLimitDisplay(value) {
  display.textContent = `€${value}`;
}

const initialValue = 1500;
slider.value = initialValue;
sliderInput.value = initialValue;
updateCreditLimitDisplay(initialValue);

slider.addEventListener("input", (e) => {
  const value = e.target.value;
  sliderInput.value = value;
  updateCreditLimitDisplay(value);
});

sliderInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value);
  if (isNaN(value)) return;

  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  if (value < min) value = min;
  if (value > max) value = max;

  slider.value = value;
  updateCreditLimitDisplay(value);
});

let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
    stepLabels[i].classList.toggle("active", i === index);
  });
}

function validateStep(index) {
  const step = steps[index];
  const inputs = step.querySelectorAll("input, select, textarea");
  let valid = true;

  step
    .querySelectorAll(".error-message")
    .forEach((e) => (e.style.display = "none"));

  const processedGroups = new Set();

  inputs.forEach((input) => {
    const error = step.querySelector(`#error-${input.name || input.id}`);
    if (!error) return;

    const isRadioOrCheckbox =
      input.type === "radio" || input.type === "checkbox";

    if (isRadioOrCheckbox && input.name && !processedGroups.has(input.name)) {
      const group = step.querySelectorAll(`[name="${input.name}"]`);
      const checked = [...group].some((el) => el.checked);
      if (!checked) {
        error.style.display = "block";
        valid = false;
      }
      processedGroups.add(input.name);
      return;
    }

    if (
      !input.value.trim() ||
      (input.type === "number" &&
        ((input.min && +input.value < +input.min) ||
          (input.max && +input.value > +input.max)))
    ) {
      error.style.display = "block";
      valid = false;
    }
  });

  return valid;
}

function collectSummary() {
  const allInputs = document.querySelectorAll("input, select, textarea");
  const summaryMap = new Map();

  const creditLimitValue = document.getElementById("credit-limit-input").value;
  summaryMap.set("Credit limit*", creditLimitValue);

  allInputs.forEach((input) => {
    if (input.id === "credit-limit" || input.id === "credit-limit-input")
      return;

    if ((input.type === "radio" || input.type === "checkbox") && !input.checked)
      return;

    let fieldLabel =
      input.closest("label")?.textContent?.trim() ||
      document.querySelector(`label[for='${input.id}']`)?.textContent?.trim();

    const fieldset = input.closest("fieldset");
    const legend = fieldset?.querySelector("legend")?.textContent?.trim();

    const key = legend || fieldLabel;
    let value = input.value;

    if (input.type === "radio" || input.type === "checkbox") {
      value = input.checked ? input.value : "No";
    }

    if (key && typeof key === "string") {
      if (summaryMap.has(key)) {
        summaryMap.set(key, summaryMap.get(key) + ", " + value);
      } else {
        summaryMap.set(key, value);
      }
    }
  });

  let summaryHtml = "";
  summaryMap.forEach((value, key) => {
    summaryHtml += `
      <tr>
        <td class="info-table-label">${key}</td>
        <td class="info-table-content">${value}</td>
      </tr>
    `;
  });

  document.querySelector("#summary-content tbody").innerHTML = summaryHtml;
}

document.querySelectorAll(".next").forEach((btn) => {
  btn.addEventListener("click", () => {
    const nextIndex = parseInt(btn.dataset.next);
    if (!validateStep(currentStep)) return;

    if (nextIndex === steps.length - 1) {
      collectSummary();
    }

    currentStep = nextIndex;
    showStep(currentStep);
  });
});

document.querySelectorAll(".back").forEach((btn) => {
  btn.addEventListener("click", () => {
    const backIndex = parseInt(btn.dataset.back);
    currentStep = backIndex;
    showStep(currentStep);
  });
});

const startBtn = document.getElementById("nextBtn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    currentStep = 1;
    showStep(currentStep);
  });
}

showStep(currentStep);

document
  .getElementById("tooltip-button")
  .addEventListener("click", function () {
    var tooltip = document.getElementById("tooltip-text");
    tooltip.hidden = !tooltip.hidden;
  });

function checkOnlyOne(checkbox) {
  const checkboxes = document.querySelectorAll('input[name="delivery"]');
  checkboxes.forEach((box) => {
    if (box !== checkbox) {
      box.checked = false;
    }
  });
}

const stepButtons = document.querySelectorAll(".step-text");

stepButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const stepLi = btn.closest(".step-label");
    const targetStep = parseInt(stepLi.dataset.step);

    if (targetStep <= maxReachedStep) {
      currentStep = targetStep;
      showStep(currentStep);
    }
  });
});

let maxReachedStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    const isActive = i === index;
    const isCompleted = i < index;

    console.log(
      `Step ${i}: isActive = ${isActive}, isCompleted = ${isCompleted}`
    );
    step.classList.toggle("active", isActive);
    stepLabels[i].classList.toggle("active", isActive);
    stepLabels[i].classList.toggle("completed", isCompleted);

    if (isCompleted) {
      maxReachedStep = i;
    }
  });
}

function updateStepLinks() {
  document
    .querySelectorAll(".step-label.active ~ .step-label .step-text")
    .forEach((btn) => btn.setAttribute("tabindex", "-1"));
}

showStep(currentStep);
updateStepLinks();
