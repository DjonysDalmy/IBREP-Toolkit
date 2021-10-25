let rangeSelector = document.getElementById("rangeSelector");
let rangeInput = document.getElementById("rangeInput");
let marginSelector = document.getElementById("marginSelector");
let marginInput = document.getElementById("marginInput");
let timbrado = document.getElementById("timbrado");
let print = document.getElementById("print");

marginSelector.addEventListener("click", async () => {
  let margin = marginSelector.value;
  marginInput.value = margin;
  chrome.storage.sync.set({ margin });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: marginTop,
  });
});

marginInput.addEventListener("change", async () => {
  let margin = marginInput.value;
  marginSelector.value = margin;
  chrome.storage.sync.set({ margin });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: marginTop,
  });
});

rangeSelector.addEventListener("click", async () => {
  let rangeValue = rangeSelector.value;
  rangeInput.value = rangeValue;
  chrome.storage.sync.set({ rangeValue });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startCustomAtt,
  });
});

rangeInput.addEventListener("change", async () => {
  let rangeValue = rangeInput.value;
  rangeSelector.value = rangeValue;
  chrome.storage.sync.set({ rangeValue });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startCustomAtt,
  });
});

timbrado.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: timbrar,
  });
});

print.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: printPage,
  });
});

//-----------------------------------FUNCTIONS-----------------------------------------

function startCustomAtt(rangeValue) {
  var listSrcFull = [];

  if (!document.querySelector('table.att')) {
  chrome.storage.sync.get("rangeValue", ({ rangeValue }) => {
  for (let i = 0; i < document.querySelectorAll('.newAttImg').length; i++) {
    document.querySelectorAll('.newAttImg')[i].style.height = rangeValue + 'px';
  }
});
  } else {
  for (let i = 0; i < document.querySelectorAll('img.thi').length; i++) {
      listSrcFull.push(document.querySelectorAll('img.thi')[i].parentNode.href);
  }
  document.querySelector('table.att').insertAdjacentHTML("afterend", "<p><strong>" + listSrcFull.length + " Anexo(s)</strong></p><div id='newAttCont' style='display: flex;align-items: center;justify-content: center;flex-wrap: wrap;'></div>");
  document.querySelector('table.att').remove()
  chrome.storage.sync.get("rangeValue", ({ rangeValue }) => {
  for (let o = 0; o < listSrcFull.length; o++) {
      document.getElementById('newAttCont').innerHTML += `<img class="newAttImg" src="${listSrcFull[o]}" style="height: ${rangeValue}px; margin: 5px;">`
  }
});
  }

}

function marginTop() {
  chrome.storage.sync.get("margin", ({ margin }) => {
  document.getElementById("newAttCont").style.marginTop = margin + "px"
  })
}

function timbrar() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<img style="width: 100%" src="https://ibrep.alfamaoraculo.com.br/storage/discovirtual/829/1084/Ibrep_down.png">') //bottom
  document.querySelector('body').insertAdjacentHTML('afterbegin', '<img style="width: 100%" src="https://ibrep.alfamaoraculo.com.br/storage/discovirtual/829/1084/Ibrep_up.png">') //top
}

function printPage() {
  window.print();
}