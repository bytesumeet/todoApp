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
	const createTaskElement = (data) => {
		const liElement = document.createElement("li");
		liElement.classList.add(
			"flex",
			"items-center",
			"justify-between",
			"p-3.5",
			"bg-slate-50",
			"hover:bg-slate-100/80",
			"rounded-xl",
			"border",
			"border-slate-200/80",
			"transition-all",
			"group",
		);
		const spanElement = document.createElement("span");
		// text-sm sm:text-base text-slate-700 font-medium break-all
		spanElement.classList.add(
			"text-sm",
			"sm:text-base",
			"text-slate-700",
			"font-medium",
			"break-all",
		);
		const textNode = document.createTextNode(data.text);
		spanElement.appendChild(textNode);
		const divElement = document.createElement("div");
		// flex items-center gap-1 sm:gap-2 ml-3 shrink-0
		divElement.classList.add(
			"flex",
			"items-center",
			"gap-1",
			"sm:gap-2",
			"ml-3",
			"shrink-0",
		);
		const editBtnElement = document.createElement("button");
		editBtnElement.classList.add(
			"p-2",
			"text-slate-400",
			"hover:text-indigo-600",
			"hover:bg-indigo-50",
			"rounded-lg",
			"transition-all",
			"cursor-pointer",
		);
		editBtnElement.setAttribute("title", "Edit");
		const editIElement = document.createElement("i");
		editIElement.classList.add(
			"fa-solid",
			"fa-pen-to-square",
			"text-sm",
			"sm:text-base",
		);
		editBtnElement.appendChild(editIElement);
		const deleteBtnElement = document.createElement("button");
		deleteBtnElement.setAttribute("title", "Delete");
		// p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer
		deleteBtnElement.classList.add(
			"p-2",
			"text-slate-400",
			"hover:text-red-600",
			"hover:bg-red-50",
			"rounded-lg",
			"transition-all",
			"cursor-pointer",
		);
		const delIElement = document.createElement("i");
		delIElement.classList.add(
			"fa-solid",
			"fa-trash",
			"text-sm",
			"sm:text-base",
		);
		deleteBtnElement.appendChild(delIElement);
		divElement.appendChild(editBtnElement);
		divElement.appendChild(deleteBtnElement);
		liElement.appendChild(spanElement);
		liElement.appendChild(divElement);
		taskListElement.appendChild(liElement);
	};
	const clearAllTasks = () => {
		tasks = [];
		saveTaskToLocalStorage();
		taskListElement.replaceChildren();
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
	if (tasks.length === 0) {
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
	searchInputElement.addEventListener("input", (e) => {
		searchTask(e.target.value);
	});
	clearAllButtonElement.addEventListener("click", clearAllTasks);
});
