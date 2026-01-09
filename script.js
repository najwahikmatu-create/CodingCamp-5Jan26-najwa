const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskTableBody = document.getElementById('taskTableBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterInput = document.getElementById('filterInput');

function updateNoTasksRow() {
  const rows = taskTableBody.querySelectorAll('tr:not(.no-tasks-row)');
  const noTasksRow = taskTableBody.querySelector('.no-tasks-row');
  if (rows.length === 0) {
    noTasksRow.style.display = 'table-row';
  } else {
    noTasksRow.style.display = 'none';
  }
}

function createTaskRow(task, date, status = false) {
  const row = document.createElement('tr');

  const taskCell = document.createElement('td');
  taskCell.textContent = task;
  row.appendChild(taskCell);

  
  const dateCell = document.createElement('td');
  if (date) {
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString('en-GB'); // dd/mm/yyyy
    dateCell.textContent = formattedDate;
  } else {
    dateCell.textContent = '';
  }
  row.appendChild(dateCell);


  const statusCell = document.createElement('td');
  const statusCheckbox = document.createElement('input');
  statusCheckbox.type = 'checkbox';
  statusCheckbox.checked = status;
  statusCheckbox.className = 'status-checkbox';
  statusCheckbox.addEventListener('change', () => {
    if (statusCheckbox.checked) {
      taskCell.style.textDecoration = 'line-through';
      taskCell.style.color = '#ccc';
    } else {
      taskCell.style.textDecoration = 'none';
      taskCell.style.color = '#fff';
    }
  });
  statusCell.appendChild(statusCheckbox);
  row.appendChild(statusCell);

  const actionCell = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    row.remove();
    updateNoTasksRow();
  });
  actionCell.appendChild(deleteBtn);
  row.appendChild(actionCell);

  return row;
}

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;
  if (!task) {
    alert('Please enter a task!');
    return;
  }
  if (!date) {
    alert('Please select a due date!');
    return;
  }
  const newRow = createTaskRow(task, date);
  taskTableBody.appendChild(newRow);
  updateNoTasksRow();
  taskInput.value = '';
  dateInput.value = '';
  filterInput.value = '';
});

deleteAllBtn.addEventListener('click', () => {
 
  const rows = taskTableBody.querySelectorAll('tr:not(.no-tasks-row)');
  rows.forEach(row => row.remove());
  updateNoTasksRow();
  filterInput.value = '';
});

filterInput.addEventListener('keyup', () => {
  const filterValue = filterInput.value.toLowerCase();
  const rows = taskTableBody.querySelectorAll('tr:not(.no-tasks-row)');

  rows.forEach(row => {
    const taskText = row.cells[0].textContent.toLowerCase();
    const dateText = row.cells[1].textContent.toLowerCase();
    if (taskText.includes(filterValue) || dateText.includes(filterValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
  const noTasksRow = taskTableBody.querySelector('.no-tasks-row');
  if (visibleRows.length === 0) {
    noTasksRow.style.display = 'table-row';
  } else {
    noTasksRow.style.display = 'none';
  }
});

updateNoTasksRow();