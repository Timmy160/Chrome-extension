let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
});

function renderLeads() {
  let listItem = "";
  for (let i = 0; i < myLeads.length; i++) {
    // listItem += "<li><a target='_blank' href='#'>" + myLeads[i] + "</a></li>";
    listItem += `<li>
                   <a target='_blank' href='${myLeads[i]}'> 
                   ${myLeads[i]} </a>                    
                 </li>`;
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listItem;
}
