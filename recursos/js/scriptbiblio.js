function renderLikedBooksTable() {
  const likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
  const tbody = document.getElementById('likedBooksTableBody');

  tbody.innerHTML = '';

  if (likedBooks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Não tens livros guardados ainda.</td></tr>`;
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

    tbody.appendChild(tr);
  });
}


window.onload = renderLikedBooksTable;

let bookIndexToRemove = null;

function openConfirmModal(index) {
  bookIndexToRemove = index;
  const modal = new bootstrap.Modal(document.getElementById('confirmRemoveModal'));
  modal.show();
}

document.getElementById('confirmRemoveBtn').addEventListener('click', () => {
  if (bookIndexToRemove !== null) {
    removeLikedBook(bookIndexToRemove);
    bookIndexToRemove = null;

    // Fecha o modal manualmente
    const modalElement = document.getElementById('confirmRemoveModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
});
