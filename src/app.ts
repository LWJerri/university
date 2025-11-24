interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const API_URL: string = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.getElementById("posts-container") as HTMLElement;
const loadDataBtn = document.getElementById("load-data-btn") as HTMLButtonElement;
const header = document.getElementById("main-header") as HTMLElement;

const modal = document.getElementById("my-modal") as HTMLElement;
const infoBtn = document.getElementById("info-btn") as HTMLButtonElement;
const closeBtn = document.querySelector(".close-btn") as HTMLElement;

async function fetchPosts(): Promise<Post[]> {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const data: Post[] = await response.json();

		return data.slice(0, 20);
	} catch (error) {
		console.error("Помилка завантаження:", error);

		return [];
	}
}

function displayPosts(posts: Post[]): void {
	postsContainer.innerHTML = "";

	posts.forEach((post, index) => {
		const postElement = document.createElement("div");

		postElement.className = "post-card";

		postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;

		postsContainer.appendChild(postElement);
	});
}

loadDataBtn.addEventListener("click", async () => {
	loadDataBtn.disabled = true;
	loadDataBtn.textContent = "Завантаження...";

	const posts = await fetchPosts();

	displayPosts(posts);

	loadDataBtn.textContent = "Дані завантажено";
	loadDataBtn.disabled = false;
});

function openModal(): void {
	modal.classList.remove("hidden");
}

function closeModal(): void {
	modal.classList.add("hidden");
}

infoBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event: MouseEvent) => {
	if (event.target === modal) {
		closeModal();
	}
});

window.addEventListener("scroll", () => {
	const scrollY: number = window.scrollY;

	if (scrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});
