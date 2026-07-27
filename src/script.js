document.addEventListener("DOMContentLoaded", () => {
	const addTaskFormElement = document.querySelector("#add-todo-form");
	const todoInputElement = document.querySelector("#todo-input");
	const searchInputElement = document.querySelector("#search-input");
	const clearAllButtonElement = document.querySelector("#clear-all-btn");
	const taskListElement = document.querySelector("#todo-list");
	const emptyStateElement = document.querySelector("#empty-state");
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const saveTaskToLocalStorage = (task) => {
		tasks.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};
	const createTaskElement = (data) => {};
	addTaskFormElement.addEventListener("submit", (e) => {
		e.preventDefault();
		const todoText = todoInputElement.value.trim();
		if (!todoText) return;
		const taskObject = {
			id: Date.now(),
			text: todoText,
			completed: false,
		};
		saveTaskToLocalStorage(taskObject);
		createTaskElement(taskObject);
		todoInputElement.value = "";
	});
});
