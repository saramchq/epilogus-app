const container = document.getElementById("library-container");

// Pega os livros guardados no localStorage
let likedBooks = JSON.parse(localStorage.getItem("likedBooks")) || [];

function renderLibrary() {
  container.innerHTML = "";

 if (likedBooks.length === 0) {
  container.innerHTML = `
    <div class="empty-card">
      <p>Não tens livros guardados ainda.</p>
    </div>
  `;
  return;
}


  likedBooks.forEach(book => {
    const div = document.createElement("div");
    div.className = "grid-item";

    div.innerHTML = `
      <img src="${book.img}" alt="Capa do livro">
      <h2>${book.title}</h2>
      <p>${book.description.substring(0, 150)}...</p>
      <a href="${book.url}" target="_blank">Ver mais</a>
    `;

    container.appendChild(div);
  });
}

renderLibrary();
