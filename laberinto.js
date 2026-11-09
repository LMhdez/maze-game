let canvas;
let context;
let FPS=50;
let protaimg;
let peixeimg;
let finalimg;



let altura=50;
let largura=50;

let relva='green';
let agua= 'cyan';
let terra='brown';


let cenario=[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,1,1,1,1,0,0,1,0,0],
  [0,0,1,1,1,1,1,0,0,1,0,0,1,0,0],
  [0,0,1,0,0,0,1,1,0,1,1,1,1,0,0],
  [0,0,1,1,1,0,0,1,0,0,0,1,0,0,0],
  [0,1,1,0,0,0,0,1,0,0,0,1,0,0,0],
  [0,0,1,0,0,0,1,1,1,0,0,1,1,1,0],
  [0,1,1,1,0,0,1,0,0,0,2,0,0,1,0],
  [0,1,3,1,0,0,1,0,0,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]



function mostrarcenario(){
    let linha, coluna;
    let color;

    for (linha = 0; linha < 10; linha++) {
        for (coluna = 0; coluna < 15; coluna++) {
            if (cenario[linha][coluna] === 0) {
                color = relva;
            } else if (cenario[linha][coluna] === 1) {
                color = agua;
            } else if (cenario[linha][coluna] === 2) {
                // Draw the peixeimg image
                color = agua;
                context.fillStyle = color;
                context.fillRect(coluna * largura, linha * altura, largura, altura);
                context.drawImage(peixeimg, coluna * largura, linha * altura, largura, altura);
                continue;  // Skip filling the rectangle for peixeimg
            } else if (cenario[linha][coluna] === 3) {
                color = agua;

                context.fillStyle = color;
                context.fillRect(coluna * largura, linha * altura, largura, altura);
                // Draw the finalimg image
                context.drawImage(finalimg, coluna * largura, linha * altura, largura, altura);
                continue;  // Skip filling the rectangle for finalimg
            }

            context.fillStyle = color;
            context.fillRect(coluna * largura, linha * altura, largura, altura);
        }
    }
}






function iniciar(){
    canvas= document.getElementById("canvas");
    context=canvas.getContext("2d");

    //carregar imagems
    protaimg= new Image();
    protaimg.src='DT1.png';
    peixeimg= new Image();
    peixeimg.src='peixe.png';
    finalimg= new Image();
    finalimg.src='DT3.png';
    //

    setInterval(function(){
        main();
    }, 1000/FPS)



}






class prota {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocidade=1;
        this.chave=false;

        this.desenha= function(){

            context.drawImage(protaimg,this.x*largura, this.y*altura, altura, largura);
        };

        this.move= function(d)
        {
          
            if ((d=='w'|| d=='W') && this.limites(this.x,this.y-1)==false){
                this.y-=this.velocidade;
                this.objetos();
            }
            if ((d=='s' || d=='S') && this.limites(this.x,this.y+1)==false){
                this.y+=this.velocidade;
                this.objetos();

            }
            if ((d=='a'|| d=='A') && this.limites(this.x-1,this.y)==false){
                this.x-=this.velocidade;
                this.objetos();

            }
            if ((d=='d' || d=='D') && this.limites(this.x+1,this.y)==false){
                this.x+=this.velocidade;
                this.objetos();

            }
            

        }
        
        this.limites= function(x,y){
            let colisao=false;


            if (cenario[y][x]==0) {
                colisao=true;            
            }
            return(colisao)
        }

        this.mostrartexto=function(){
            context.font='30px verdana'
            context.fillStyle='black'
            if (this.chave) {
            context.fillText('fish : yes' , 10, 30);
                
            } else {
                context.fillText('fish : no' , 10, 30);
                
            }

        }

        this.objetos=function(){
            let objeto= cenario[this.y][this.x];
            if (objeto==2){
                playAudio2();

                this.chave=true;

                cenario[this.y][this.x]=1;

            }
            if (objeto==3 && this.chave){
                
                document.getElementsByTagName('body')[0].style.backgroundImage= 'url("https://c.tenor.com/Id3z9PNyesEAAAAd/tenor.gif")';
                document.getElementById('canvas').style.display='none';
                document.getElementById('buttons').style.display='none';
                playAudio();
                document.getElementsByTagName("h1")[0].innerText = "You are the best tothless!";

                



            }


        }
    }
}




var protagonista= new prota(1, 1);
 






function apagar(){
    if (context) {
        canvas.width = 750;
        canvas.height = 500;
    }
}



function main(){
    apagar();
    
    mostrarcenario();

    protagonista.desenha();
    protagonista.mostrartexto();


   

    // console.log("funcao principal");
}


// Função para processar o evento de teclado
function handleKeyPress(event) {
    // Obtém o valor da tecla pressionada
    let key = event.key;

    // Verifica se a tecla pressionada é um número, operador ou tecla especial
    if (/w|a|s|d|W|A|S|D/i.test(key)) {
        if (key !== 'Control' && key !== 'CapsLock'){
        // Chama a função atualizar com o valor correspondente à tecla pressionada
        protagonista.move(key);
    }
    }
}

// Adiciona um ouvinte de eventos de teclado ao documento
document.addEventListener('keydown', handleKeyPress);

function playAudio() {
    var audio = new Audio('desdentado.mp3'); // Replace with the path to your audio file
    audio.preload = 'auto';
    audio.play();
    audio.loop = true;
  }
function playAudio2() {
    var audio = new Audio('water.mp3'); // Replace with the path to your audio file
    audio.preload = 'auto';
    audio.play();
    audio.loop = false;
  }
   