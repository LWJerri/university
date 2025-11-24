"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.getElementById("posts-container");
const loadDataBtn = document.getElementById("load-data-btn");
const header = document.getElementById("main-header");
const modal = document.getElementById("my-modal");
const infoBtn = document.getElementById("info-btn");
const closeBtn = document.querySelector(".close-btn");
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = yield response.json();
            return data.slice(0, 20);
        }
        catch (error) {
            console.error("Помилка завантаження:", error);
            return [];
        }
    });
}
function displayPosts(posts) {
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
loadDataBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    loadDataBtn.disabled = true;
    loadDataBtn.textContent = "Завантаження...";
    const posts = yield fetchPosts();
    displayPosts(posts);
    loadDataBtn.textContent = "Дані завантажено";
    loadDataBtn.disabled = false;
}));
function openModal() {
    modal.classList.remove("hidden");
}
function closeModal() {
    modal.classList.add("hidden");
}
infoBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        header.classList.add("scrolled");
    }
    else {
        header.classList.remove("scrolled");
    }
});
