/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function myFunction() {
    console.log("Ciao");
    document.getElementById("prova").textContent = "Hello World";
}


function changeColor(){
    console.log("Cambio colore");
    var boxes = document.getElementsByClassName("personal-box");
    boxes[0].style.backgroundColor = "Blue";
}

function changePage(param){
    if(param == 1)
        window.location.href = "./nuovapagina.html";
    else
        window.location.href = "./pagina.html";
}

function loginTemporarly(){
    window.sessionStorage.setItem("loginstatus", "logged");
    checkTemporary();
}

function loginPermanently(){
    window.localStorage.setItem("loginstatus", "logged");
    window.location.href = "./html/homepage_operatore.html";
    console.log("login");
    checkPermanent();
}

function logoutPermanently(){
    window.localStorage.removeItem("loginstatus");
    window.location.href = "../index.html";
}

function checkTemporary(){
    var status = window.sessionStorage.getItem("loginstatus");
    if(status == "logged"){
        document.getElementById("temporarylogin").textContent = "logged";
    } else {
        document.getElementById("temporarylogin").textContent = "not logged";
    }
}


function checkPermanent(){
    var status = window.localStorage.getItem("loginstatus");
    if(status == "logged"){
        document.getElementById("permanentlogin").textContent = "logged";
    } else {
        document.getElementById("permanentlogin").textContent = "not logged";
    }
}


function checkRimanenti(id1, id2){
    console.log("call checkRimanenti");
    var boxEffettuati = document.getElementsByClassName("effettuate");
    var classEff = boxEffettuati[0].className;
    
    var boxNonEffettuati = document.getElementsByClassName("non-effettuate");
    var classNotEff = boxNonEffettuati[0].className;

    var label_eff = document.getElementById(id2);
    
    label_eff.classList.remove("label-selezionata");
    label_eff.classList.add("label-non-selezionata");
    
   var label_eff = document.getElementById(id1);
    
    label_eff.classList.remove("label-non-selezionata");
    label_eff.classList.add("label-selezionata");

    boxEffettuati[0].classList.add("d-block");
    boxEffettuati[0].classList.remove("d-none");

    boxNonEffettuati[0].classList.add("d-none");
    boxNonEffettuati[0].classList.remove("d-block");
}

function checkEffettuate(id1, id2){
    console.log("call checkEffettuate");
    var boxEffettuati = document.getElementsByClassName("effettuate");
    var classEff = boxEffettuati[0].className;
    
    var boxNonEffettuati = document.getElementsByClassName("non-effettuate");
    var classNotEff = boxNonEffettuati[0].className;
    
    var label_eff = document.getElementById(id2);
    
    label_eff.classList.remove("label-non-selezionata");
    label_eff.classList.add("label-selezionata");
    
    var label_eff = document.getElementById(id1);
    
    label_eff.classList.remove("label-selezionata");
    label_eff.classList.add("label-non-selezionata");
  


    
    boxEffettuati[0].classList.remove("d-block");
    boxEffettuati[0].classList.add("d-none");

    boxNonEffettuati[0].classList.remove("d-none");
    boxNonEffettuati[0].classList.add("d-block");

}


function showOrderPage(){
    window.location.href = "./richiesta_cliente.html";    
}

function turnBackOperator(){
    window.location.href = "./homepage_operatore.html";
}

function turnBackCliente(){
    window.location.href = "./homepage_cliente.html";
}


function handleButtonViveriMed(id1, id2){
    var buttonVM = document.getElementById(id1);
    var button2VM =document.getElementById(id2);

    //Button già selezionato
    if(buttonVM.classList.contains('selezionato')){
        buttonVM.classList.remove("selezionato");
        if(!button2VM.classList.contains('selezionato'))
            button2VM.classList.add("selezionato");
    } else {
        buttonVM.classList.add("selezionato");
        if(button2VM.classList.contains('selezionato'))
            button2VM.classList.remove("selezionato");
    }

}

function openDetailsOrder(id){
    var tipo = document.getElementById(id + '-tipo').textContent;
    var nome = document.getElementById(id + '-nome').textContent;
    var luogo = document.getElementById(id + '-luogo').textContent;
    var source_img = "../img/icon/shopping-cart.png"
    if(tipo == "Farmaci"){
        source_img = "../img/icon/drug-2.png";
    }

    sessionStorage.setItem("tipo", tipo);
    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("luogo", luogo);
    sessionStorage.setItem("source_img", source_img);

    document.location.href = "./dettagli_operatori.html";
}

function loadDetailsOrder(){
    var tipo = sessionStorage.getItem('tipo');
    var nome = sessionStorage.getItem('nome');
    var luogo = sessionStorage.getItem('luogo');
    var source_img = sessionStorage.getItem('source_img');
    
    document.getElementById('base-img').setAttribute("src", source_img)
    document.getElementById('base-tipo').textContent = tipo;
    document.getElementById('base-nome').textContent = nome;
    document.getElementById('base-luogo').textContent = luogo;
}

function completeDelivery(){
    document.getElementById('button-delivery').classList.add("button-completato");      //rimuovere la classe se premuto di nuovo, meglio fare prima una verifica dello stato sul db
}

//let pic = {
//    
//    handleTakePicture: function(){
//        
//        let opts = {
//            quality: 80,
//            destinationType: Camera.DestinationType.FILE_URI,
//            sourceType: Camera.PictureSourceType.CAMERA,
//            mediaType: Camera.MediaType.PICTURE,
//            endodingType: Camera.EncodingType.JPEG,
//            cameraDirection: Camera.Direction.BACK,
//            targetWidth: 300,
//            targetHeight: 400,
//        };
//        navigator.camera.getPicture(pic.ftw, pic.wtf, opts);
//    },
//    
//    ftw: function(imgURI){
//         var image = document.getElementById('myImage');
//         image.src = "data:image/jpeg;base64," + imgURI;
//        
//    },
//    wtf: function(msg){
//        //errore non so cosa potremmo fare
//        
//    }
//};
app.initialize();































