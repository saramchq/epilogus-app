const container = document.getElementById("books-container");
let books = [];
let currentIndex = 0; // posição global do próximo livro a ser usado

async function fetchBooks(query) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`);
  const data = await res.json();
  books = data.items;
  renderInitialCards();
}

// Renderiza os primeiros 3 cards
function renderInitialCards() {
  container.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    addCard(i);
  }
  currentIndex = 3;
}

// Cria um card com base no índice do livro
function addCard(cardPosition) {
  if (currentIndex >= books.length) return;

  const book = books[currentIndex];
  const info = book.volumeInfo;

  const card = document.createElement("div");
  card.className = "card";
  card.dataset.position = cardPosition; // para sabermos qual card vamos substituir

  card.innerHTML = `
    <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="Capa do livro">
    <h1>${info.title}</h1>
    <p style="color:white">${info.description ? info.description.substring(0, 150) + '...' : 'Sem descrição disponível.'}</p>
    <div class="buttons">
          <button class="btn-like">Gostar 💖</button>
      <button class="btn-dislike">Descartar ❌</button>
    </div>
    <div class="links">
      <a href="${info.infoLink}" target="_blank">Ver mais</a>
    </div>
  `;

  // Substitui o card antigo por este novo
  const existingCard = container.children[cardPosition];
  if (existingCard) {
    container.replaceChild(card, existingCard);
  } else {
    container.appendChild(card);
  }

  // Liga os botões a eventos
  card.querySelector(".btn-like").onclick = () => handleInteraction(cardPosition);
  card.querySelector(".btn-dislike").onclick = () => handleInteraction(cardPosition);

  currentIndex++;
}

// Quando o utilizador clica num botão
function handleInteraction(cardPosition) {
  const card = container.children[cardPosition];

  // Aplica a animação de saída
  card.classList.add("fade-out");

  // Espera o fim da animação (500ms) para trocar o conteúdo
  setTimeout(() => {
    addCard(cardPosition);
  }, 500);
}


// Começar com livros de “romance”
fetchBooks("romance");
