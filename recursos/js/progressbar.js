let progress = 0;
const bar = document.querySelector('.epilogus-progress-bar');

const interval = setInterval(() => {
  progress += 2;

  if (progress >= 100) {
    progress = 100;
    bar.style.width = progress + '%';

    clearInterval(interval);

    // Dá tempo da barra mostrar 100% antes de sair
    setTimeout(() => {
      window.location.href = "match.html";
    }, 400); // 400ms de atraso para mostrar a barra cheia
  } else {
    bar.style.width = progress + '%';
  }
}, 40);
