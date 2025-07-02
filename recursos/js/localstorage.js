// Obtém a referência ao container onde vai mostrar os livros
const container = document.getElementById('library-container');

// Função para adicionar um livro ao LocalStorage
function addBookToLiked(book) {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];

  // Evita duplicados
  if (!likedBooks.some(b => b.title === book.title)) {
    likedBooks.push(book);
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  }
}

// Função para remover um livro da lista pelo índice
function removeLikedBook(index) {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
  likedBooks.splice(index, 1);
  localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  renderLikedBooks(); // Atualiza a lista após remoção
}

// Função para renderizar a lista 
function renderLikedBooksTable() {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
  const tbody = document.getElementById('likedBooksTableBody');

  tbody.innerHTML = '';

  if (likedBooks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:20px;">Não tens livros guardados ainda.</td></tr>`;
    return;
  }

  likedBooks.forEach((book, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.description.substring(0, 150)}...</td>
      <td><a href="${book.url}" target="_blank">Ver mais</a></td>
    `;

    tbody.appendChild(tr);
  });
}

window.onload = () => {
  renderLikedBooksTable();
};
