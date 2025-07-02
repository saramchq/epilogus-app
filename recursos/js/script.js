// Classe Book que organiza os dados dos livros
class Book {
  constructor(img, title, description, url) {
    this.img = img; //criada propriedade img dentro do livro
    this.title = title; //criada propriedade title
    this.description = description; //criada propriedade description
    this.url = url; //criada propriedade url
  }
}

const container = document.getElementById("books-container"); // guarda o elemento books-container na variavel container
let books = []; //array vazio p guardar os livros encontrados na pesquisa
let currentIndex = 0; // posição do proximo livro no index

// Função para ir buscar os livros da API da Google Books
async function fetchBooks(query) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`); // Faz um pedido à API da Google Books com base na palavra pesquisada (query)
  const data = await res.json(); // espera que a resposta chegue (await) e transforma-a em objeto em js (data) q é o formato JSON q a API devolve

  // convertemos os resultados em objetos da classe Book
  books = data.items.map(item => { //o map percorre os livros recebidos da api q estão guardados em data.items e executa a função de conversão para cada livro. a arrow function significa "para cada item faz isto"
    const info = item.volumeInfo; // guardei na variavel info o acesso a propriedade volumeinfo da api da google
    return new Book( //devolve criando uma nova instancia/objeto
      info.imageLinks?.thumbnail || 'https://via.placeholder.com/150', // vai buscar img do livro se existir se nao usa uma padrão
      info.title || 'Sem título', // vai buscar o titulo
      info.description || 'Sem descrição disponível.', // vai buscar descrição
      info.infoLink || '#' // link de referencia
    );
  });

  renderInitialCards(); //chamei a função p mostrar os 3 cards
}

// Função para adicionar um livro aos favoritos (LocalStorage)
function addBookToLiked(book) {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];

  // Evita duplicados (baseado no título)
  if (!likedBooks.some(b => b.title === book.title)) {
    likedBooks.push(book);
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  }
}

// criei a função dos 3 cards
function renderInitialCards() {
  container.innerHTML = ""; // Limpa o conteúdo atual do container se houver 
  for (let i = 0; i < 3; i++) {
    addCard(i); //chamei a funçao que adiciona os cards e inseri na posição i
  }
  currentIndex = 3; // o index aqui ja começa no 3 porque mostro 3 livros logo de inicio
}

// Cria um card com base no indice do livro
function addCard(cardPosition) {
  if (currentIndex >= books.length) return; //Se o valor de currentIndex for maior ou igual ao número total de livros entao ja nao ha mais livros disponiveis por isso a função pára com o return
  const book = books[currentIndex]; //Vai buscar o livro na posição atual (currentIndex) dentro do array books[] e guardá-lo na variável book 
  const card = document.createElement("div"); //cria uma div para o card
  //card.className = "card fade-in"; // animação dos cards a aparecer
  card.className = "card"; // com a class card
  card.dataset.position = cardPosition; // ajuda a identificar a posiçao do card no layout qnd clicamos em gostar ou descartar

  //o js cria html, mostra a img do livro, o titulo, 150 caracteres da decrição e se for muito longa termina com ...
  //cria uma div c dois botoes
  //adiciona um link ver mais
  card.innerHTML = ` 
    <img src="${book.img}" alt="Capa do livro">
    <h1>${book.title}</h1>
    <p>${book.description.substring(0, 150)}...</p>
    <div class="buttons">
      <button class="btn-like">Gostar ❤️</button>
      <button class="btn-dislike">Descartar ❌</button>
    </div>
    <div class="links">
      <a href="${book.url}" target="_blank">Ver mais</a>
    </div>
  `;

  // Substitui o card antigo por este novo
  const existingCard = container.children[cardPosition]; // coleção de todos os elementos filhos (cards) dentro da div com o id books-container.
  //cardPosition é o nr da posiçao 0,1,2 q vai buscar o card antigo e guarda-o na variável existingCard
  if (existingCard) { //verifica se existe um card nessa posição
    container.replaceChild(card, existingCard); //substitui o card antigo pelo novo
  } else {
    container.appendChild(card); // se nao existir nenhum card naquela posiçao adiciona um novo card no final do container
  }

  // Liga os botões a eventos
  card.querySelector(".btn-like").onclick = () => {
    addBookToLiked(book);       // Guarda o livro no LocalStorage
    handleInteraction(cardPosition);  // Faz a animação e troca do card
  };
  card.querySelector(".btn-dislike").onclick = () => handleInteraction(cardPosition);

  currentIndex++; //// Incrementa o índice para apontar para o próximo livro a ser mostrado 
}

// Quando o utilizador clica num botão
function handleInteraction(cardPosition) {
  const card = container.children[cardPosition]; // Pega o card que está na posição cardPosition dentro do container

  // Adiciona a classe "fade-out" para disparar a animação de saída do card
  card.classList.add("fade-out");

  // Espera o fim da animação (500ms) para trocar o conteúdo
  setTimeout(() => {
    addCard(cardPosition);
  }, 500);
}

// Começar com livros de “romance”
fetchBooks("romance");

//pesquisa
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    currentIndex = 0;
    fetchBooks(query);
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
