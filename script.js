const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete">✓</button>
        <button class="delete">✕</button>
      </div>
    `;

    li.querySelector(".complete").onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    li.querySelector(".delete").onclick = () => {
      tasks.splice(index,1);
      saveTasks();
      renderTasks();
    };

    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  if(input.value.trim() === "") return;
  tasks.push({ text: input.value, done:false });
  input.value = "";
  saveTasks();
  renderTasks();
};

input.addEventListener("keypress", (e)=>{
  if(e.key === "Enter") addBtn.click();
});

renderTasks();