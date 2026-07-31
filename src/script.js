document.addEventListener("DOMContentLoaded", () => {
	const addTaskFormElement = document.querySelector("#add-todo-form");
	const todoInputElement = document.querySelector("#todo-input");
	const searchInputElement = document.querySelector("#search-input");
	const clearAllButtonElement = document.querySelector("#clear-all-btn");
	const taskListElement = document.querySelector("#todo-list");
	const emptyStateElement = document.querySelector("#empty-state");
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const saveTaskToLocalStorage = (task) => {
		if (task) {
			tasks.push(task);
		}
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	const clearAllTasks = () => {
		tasks = [];
		saveTaskToLocalStorage();
		tasks.length === 0
			? emptyStateElement.classList.remove("hidden")
			: emptyStateElement.classList.add("hidden");
	};
	const searchTask = (query) => {
		const normalizedQuery = query.trim().toLowerCase();
		const filterTasks = tasks.filter((t) =>
			t.text?.toLowerCase().includes(normalizedQuery),
		);
		console.log(filterTasks);
		taskListElement.replaceChildren();
		if (filterTasks.length === 0) {
			emptyStateElement.classList.remove("hidden");
		} else {
			emptyStateElement.classList.add("hidden");
		}
		filterTasks.forEach((t) => createTaskElement(t));
	};
	const createTaskElement = (data) => {};
	if(tasks.length === 0) {
		emptyStateElement.classList.remove("hidden");
	} else {
		emptyStateElement.classList.add("hidden");
		tasks.forEach((t) => createTaskElement(t));
	}
	addTaskFormElement.addEventListener("submit", (e) => {
		e.preventDefault();
		const todoText = todoInputElement.value.trim();
		if (!todoText) return;
		const taskObject = {
			id: Date.now(),
			text: todoText,
			completed: false,
		};
		console.log(taskObject);
		saveTaskToLocalStorage(taskObject);
		createTaskElement(taskObject);
		todoInputElement.value = "";
	});
});
