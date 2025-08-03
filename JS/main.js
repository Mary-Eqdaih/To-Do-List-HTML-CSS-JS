let input = document.getElementById("input");
let form = document.querySelector(".box form ");
let listcontainer = document.querySelector(".container .box .list");
let taskCount = 1;
form.onsubmit = function (e) {
  e.preventDefault();
  if (input.value.trim() == "") {
    alert("Please Enter A Task");
    return;
  }
  let taskId = "task-" + taskCount;
  // row
  let row = document.createElement("div");
  row.className = "row";

  // checkbox
  let div = document.createElement("div");
  div.className = "checkbox";

  // input
  let inputcheck = document.createElement("input");
  inputcheck.type = "checkbox";
  inputcheck.name = "task";
  inputcheck.id = taskId;
  inputcheck.onchange = function () {
    save();
  };

  // label
  let label = document.createElement("label");
  label.innerHTML = input.value;

  label.setAttribute("for", taskId);
  // icon
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  div.appendChild(inputcheck);
  div.appendChild(label);
  row.appendChild(div);
  row.appendChild(icon);
  listcontainer.appendChild(row);

  icon.onclick = function () {
    row.remove();
    save();
  };
  input.value = "";
  taskCount++;
  save();
};

function save() {
  let checkboxes = listcontainer.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.setAttribute("checked", "true");
    } else {
      checkbox.removeAttribute("checked");
    }
  });
  localStorage.setItem("data", listcontainer.innerHTML);
}
function show() {
  listcontainer.innerHTML = localStorage.getItem("data");

  let deleteIcons = document.querySelectorAll(".fa-xmark");
  deleteIcons.forEach((icon) => {
    icon.style.cursor = "pointer";
    icon.onclick = function () {
      icon.parentElement.remove();
      save();
    };
  });
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.onchange = function () {
      save();
    };
  });
}
window.onload = function () {
  show();
  
};


