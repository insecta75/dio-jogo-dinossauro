//document: browser disponibiliza chamada API, comandos que servem para selecionar e manipular elementos na tela
const dino = document.querySelector('.dino');
const background = document.querySelector('.background'); //fundo de deserto

let position = 0; //relacionado ao pulo do dinossauro
let isGameOver = false;
let isJumping = false;

function handleKeyUp(event) {
    if(event.keyCode === 32) { //Tecla espaco
        if(!isJumping) { //evita que ocorra problemas no pulo, quando se aperta a tecla muito rapido
            jump();
        }        
        //console.log('Pressionou tecla!');
    }
}

function jump() {
    isJumping = true; //Esta pulando

    let upInterval = setInterval(() => { //para a animacao, cria repeticao (atraves de intervalos) para o elemento pular
        if(position >= 150) { //impoe um limite de superior
            clearInterval(upInterval); //limpa o intervalo de subida

            let downInterval = setInterval(() => {
                if(position <= 0) { //impoe um limite de inferior
                    clearInterval(downInterval); //limpa o intervalo de descida
                    isJumping = false; //Nao esta pulando
                } else {
                    position -= 20; //desce ilimitado
                    dino.style.bottom = position + 'px'; //decrementa no codigo do CSS 20px;
                }
            }, 20); //codigo executado a cada 20ms
        } else {
            position += 20; //sobe ilimitado
            dino.style.bottom = position + 'px'; //incrementa no codigo do CSS 20px;
        }
    }, 20); //codigo executado a cada 20ms
}

function createCactus() {
    const cactus = document.createElement('div'); //usa JS para criar codigo HTML novo
    let cactusPosition = 1000; //posicao do cactus 1000px a direita
    let randomTime = Math.random() * 6000; //gera um numero aleatorio entre 0 e 6000;

    if(isGameOver) return;

    cactus.classList.add('cactus');    
    background.appendChild(cactus);    
    cactus.style.left = cactusPosition + 'px';    

    let leftTimer = setInterval(() => { //para o cactus, cria repeticao (atraves de intervalos) para o elemento ir para a esquerda
        if(cactusPosition < -60) { //saiu da tela, remove o cactus (60 x 60 tamanho do cactus)
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) { //se o cactus tocou o dinossauro, o dinossauro morre
            clearInterval(leftTimer); //o cactus para de ir para a esquerda
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10; //velocidade para a esquerda
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime); //recursividade, gerando um novo cactus em um intervalo aleatorio
};

createCactus(); //o cactus e criado logo no inicio do jogo
document.addEventListener('keyup', handleKeyUp); //intercepta eventos (pular) de tecla
/*document.addEventListener('keyup', function() {
    console.log('Pressionou tecla!');
});*/