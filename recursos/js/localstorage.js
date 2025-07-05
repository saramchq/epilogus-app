// Função para adicionar um livro ao LocalStorage
function addBookToLiked(book) { 
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];// Vai buscar os livros guardados, ou inicia um array vazio

  // Evita duplicados
  if (!likedBooks.some(b => b.title === book.title)) {  // Verifica se o livro já existe (baseado no título)
    likedBooks.push(book);// Adiciona o livro ao array
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks)); // Atualiza o localstorage
  }
}

// Função para remover um livro da lista pelo indice
function removeLikedBook(index) {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || []; // Vai buscar os livros guardados
  likedBooks.splice(index, 1); // Remove 1 item na posição index
  localStorage.setItem('likedBooks', JSON.stringify(likedBooks));// Atualiza o LocalStorage
  renderLikedBooksTable(); // Atualiza a tabela na página
}

// Função para renderizar a lista de livros guardados na tabela
function renderLikedBooksTable() {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];// Vai buscar os livros guardados
  const tbody = document.getElementById('likedBooksTableBody'); // Aponta para o corpo da tabela

  tbody.innerHTML = '';// Limpa a tabela

  if (likedBooks.length === 0) {  // Se não houver livros, mostra uma mensagem
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px;">Não tens livros guardados ainda.</td></tr>`;
    return;
  }

  likedBooks.forEach((book, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.description?.substring(0, 150) || "Sem descrição"}...</td> 
      <td><a href="${book.url}" target="_blank">Ver mais</a></td>
      <td><button onclick="openConfirmModal(${index})" class="btn btn-danger btn-sm">Remover</button></td>

    `;

    tbody.appendChild(tr);// adiciona a linha à tabela
  });
}

// // Quando a página carregar faz a tabela
window.onload = renderLikedBooksTable;
