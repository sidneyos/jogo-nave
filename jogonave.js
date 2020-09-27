var dirXj, dirYj,jog,velj,pjx,pjy;
var velt;
var tamtelaw, tamtelah;
var jogo;
var frames;
var contbombas, painelcontbombas, velb, tmpcriabomba;
var bombastotal;
var vidaplaneta, barraplaneta;
var indiceexplosao,isom;
var telamsg;

function tecladw() {

    var tecla=event.keyCode;
    if (tecla==38) { //cima 
        dirYj=-1;
    } else if (tecla==40){ //baixo
        dirYj=1;
    }
    if (tecla==37) { //esquerda
        dirXj=-1;
    } else if (tecla==39){ //direita
        dirXj=1;
    }
    if (tecla==32) { //espaço
        atira(pjx+17,pjy);
    }
}

function teclaup() {
    var tecla=event.keyCode;
    if ((tecla==38)||(tecla==40)){ //cima 
        dirYj=0;
    } 
    if ((tecla==37)||(tecla==39)) { //esquerda
        dirXj=0;
         
    }
}

function criabomba() {
    if (jogo) {
        var y=0;
        var x=Math.random()*tamtelaw;
        var bomba=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="bomba";
        att2.value="top:"+y+"px;left:"+x+"px";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contbombas--;
    }
}

function controlabomba() {
    bombastotal=document.getElementsByClassName("bomba");
    var tam=bombastotal.length;
    for(var i=0;i<tam;i++){
        if (bombastotal[i]) {
            var pi=bombastotal[i].offsetTop;
            pi+=velb;
            bombastotal[i].style.top=pi+"px";
            if (pi>tamtelah) {
                vidaplaneta-=10;
                criaexplosao(2,bombastotal[i].offsetLeft,null);
                bombastotal[i].remove();
            }
        }
    }
}
function atira(x,y) {
    var t=document.createElement("div");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    att1.value="tirojog";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}

function controlatiros() {
    var tiros=document.getElementsByClassName("tirojog");
    var tam=tiros.length;
    for(var i=0;i<tam;i++){
        if (tiros[i]) {
            var pt=tiros[i].offsetTop;
            pt-=velt;
            tiros[i].style.top=pt+"px";
            colisaotirobomba(tiros[i]);
            if (pt<0) {
                tiros[i].remove();
            }
        }
    }
}

function colisaotirobomba(tiro) {
    var tam = bombastotal.length;
    for(var i=0;i<tam;i++){
        if (bombastotal[i]) {
            if (((tiro.offsetTop<=(bombastotal[i].offsetTop+132))&&((tiro.offsetTop+6)>=(bombastotal[i].offsetTop)))
            &&((tiro.offsetLeft<=(bombastotal[i].offsetLeft+160))&&((tiro.offsetLeft+6)>=(bombastotal[i].offsetLeft)))) {
                criaexplosao(1,bombastotal[i].offsetLeft-25, bombastotal[i].offsetTop);
                bombastotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function criaexplosao(tipo,x,y) {
    if (document.getElementById("explosao"+(indiceexplosao-5))) {
        document.getElementById("explosao"+(indiceexplosao-5)).remove();
    }
    var explosao=document.createElement("div");
    var img=document.createElement("img");
    var som=document.createElement("audio");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    var att3=document.createAttribute("div");
    var att4=document.createAttribute("src");
    var att5=document.createAttribute("src");
    var att6=document.createAttribute("id");
    att3.value="explosao"+indiceexplosao;
    if(tipo==1){
    att1.value="explosaoar";
    att2.value="top:"+y+"px;left:"+x+"px;";
    //att4.value="C:/Users/Sydney/Documents/javascript-youtube/explosao1.gif?"+ new Date();;
    }else{
        att1.value="explosaochao";
        att2.value="top"+(tamtelah-192)+"px;left"+(x-127)+"px;";
     //   att4.value="C:/Users/Sydney/Documents/javascript-youtube/explosao.gif?"+new Date();;
    }
   // att5.value="audio.mp3?"+new Date();;
    att6.value="som"+isom;
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
   // document.getElementById("som"+isom).play();
    indiceexplosao++;
    isom++;
    
}
function controlajogador() {
    pjy+=dirYj*velj;
    pjx+=dirXj*velj;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
}

function gerenciagame() {
    barraplaneta.style.width=vidaplaneta+"px";
    if (contbombas<=0) {
        jogo=false;
        clearInterval(tmpcriabomba);
        //telamsg.style.backgroundImage="url()";
        //telamsg.style.display="block";
        alert("vitoria");
    }if (vidaplaneta<=0){
        jogo=false;
        clearInterval(tmpcriabomba);
       // telamsg.style.backgroundImage="url()";
        //telamsg.style.display="block";
        alert("derrota");
    }
    
}
function gamelop() {
    if (jogo) {
        controlajogador();
        controlatiros();
        controlabomba();
        
    }
    gerenciagame();
    frames=requestAnimationFrame(gamelop);
}
function reinicia() {
    bombastotal=document.getElementsByClassName("bomba");
    var tam=bombastotal.length;
    for(var i=0;i<tam;i++){
        if (bombastotal[i]) {
            bombastotal[i].remove();
        }
    }
    telamsg.style.display="none"; 
    clearInterval(tmpcriabomba);
    cancelAnimationFrame(frames);
    vidaplaneta=300;
    pjx=tamtelaw/2;
    pjy=tamtelah/2;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    contbombas=150;
    jogo=true;
    tmpcriabomba=setInterval(criabomba,1700);
    gamelop();
}
function inicia() {
    jogo=true;    
    tamtelah=window.innerHeight;
    tamtelaw=window.innerWidth;
    dirXj=dirYj=0;
    pjx=tamtelaw/2;
    pjy=tamtelah/2;
    velj=velt=10;
    jog=document.getElementById("navejog");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    
    contbombas=150;
    velb=3;
    
    vidaplaneta=300;
    indiceexplosao=isom=0;
    barraplaneta=document.getElementById("barraplaneta");
    barraplaneta.style.width=vidaplaneta+"px";
   // telamsg=document.getElementById("telamsg");
    document.getElementById("btnjogar").addEventListener("click", reinicia);
    tmpcriabomba=setInterval(criabomba,1700);
    gamelop();
}
window.addEventListener("load", inicia);
document.addEventListener("keydown", tecladw);
document.addEventListener("keyup", teclaup);