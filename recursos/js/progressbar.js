let progress = 0; // começa em 0%
const bar = document.querySelector('.epilogus-progress-bar'); // seleciona a barra

const interval = setInterval(() => {
  progress += 2; // aumenta 2% a cada 40ms

  if (progress >= 100) {
    progress = 100;
    bar.style.width = progress + '%';// enche até 100%

    clearInterval(interval);// para o carregamento

    // Dá tempo da barra mostrar 100% antes de sair
    setTimeout(() => {
      window.location.href = "match.html";
    }, 400); // 400ms de atraso para mostrar a barra cheia
  } else {
    bar.style.width = progress + '%';// atualiza visualmente a barra
  }
}, 40);// esta cena corre a cada 40 milissegundos

//JASUS!!!!!!!