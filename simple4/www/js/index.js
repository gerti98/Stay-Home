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

function loginTemporarly(){
    window.sessionStorage.setItem("loginstatus", "logged");
    checkTemporary();
}


//Gestisce login permanente, 'tipo' può essere "cliente" o "operatore"
function loginPermanently(tipo){
    window.localStorage.setItem("loginstatus", "logged_" + tipo);
    window.location.href = "./html/homepage_" + tipo + ".html";
    console.log("login");
    
}

function logoutPermanently(){
    window.localStorage.removeItem("loginstatus");
    window.location.href = "../index.html";
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


function autoLogin(){
    if(sessionStorage.getItem("statuslogin") == "login_operatore"){
        loginPermanently("operatore");
    } else if(sessionStorage.getItem("statuslogin") == "login_cliente"){
        loginPermanently("cliente");
    }    
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
    if(window.localStorage.getItem("loginstatus") == "logged_operatore"){
        var tipo = document.getElementById(id + '-tipo').textContent;
        var nome = document.getElementById(id + '-nome').textContent;
        var luogo = document.getElementById(id + '-luogo').textContent;
        var source_img = "../img/icon/shopping-cart.png"
        if(tipo == "Farmaci"){
            source_img = "../img/icon/drug-2.png";
        }

        sessionStorage.setItem("idCommissione", id);
        sessionStorage.setItem("tipo", tipo);
        sessionStorage.setItem("nome", nome);
        sessionStorage.setItem("luogo", luogo);
        sessionStorage.setItem("source_img", source_img);

        document.location.href = "./dettagli_operatori.html";
    }
}


//Oggetto utile ad aggiornare le rank table
function DataEventHandler() {}

//Set iniziale
DataEventHandler.DEFAUL_METHOD = "GET";
DataEventHandler.URL_REQUEST = "https://justhome.live/php/ajax/";
DataEventHandler.ASYNC_TYPE = true;
DataEventHandler.SUCCESS_RESPONSE = "0";

function loadDetailsOrder(){
    var tipo = sessionStorage.getItem('tipo');
    var nome = sessionStorage.getItem('nome');
    var luogo = sessionStorage.getItem('luogo');
    var source_img = sessionStorage.getItem('source_img');
    var idCommissione = sessionStorage.getItem('idCommissione');

    document.getElementById('base-img').setAttribute("src", source_img)
    document.getElementById('base-tipo').textContent = tipo;
    document.getElementById('base-nome').textContent = nome;
    document.getElementById('base-luogo').textContent = luogo;

    //Effettuo richiesta dati descrizione, latitudine, longitudine per maps
    var url = DataEventHandler.URL_REQUEST + "getDetailsDelivery.php";
    var fr = new FormData();
    fr.append('idCommissione', sessionStorage.getItem("idCommissione"));
    console.log(sessionStorage.getItem("idCommissione"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.setDetailsOrder);
}

function completeDelivery(){
    console.log("Premuto button");
    document.getElementById('button-delivery').setAttribute('ontouchend', ''); //Disattivo il button
    
    var url = DataEventHandler.URL_REQUEST + "completeDelivery.php";
    var fr = new FormData();
    fr.append('idCommissione', sessionStorage.getItem("idCommissione"));
    console.log(sessionStorage.getItem("idCommissione"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.manageResponse);
}


function undoCompletedDelivery(){
    console.log("Premuto button");
    document.getElementById('button-delivery').setAttribute('ontouchend', ''); //Disattivo il button
    
    var url = DataEventHandler.URL_REQUEST + "undoCompletedDelivery.php";
    var fr = new FormData();
    fr.append('idCommissione', sessionStorage.getItem("idCommissione"));
    console.log(sessionStorage.getItem("idCommissione"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.manageResponse);    
}

function loadHomepageCliente(){
    loadConfirmedRequest();
    loadPendingRequest();
}

function loadHomepageOperatore(){
    loadRemainedDelivery();
    loadCompletedDelivery();
}

function loadConfirmedRequest(){
    //Richiesta ajax che restituisce json con tutte le richieste da completare
    var url = DataEventHandler.URL_REQUEST + "getAcceptedRequests.php";
    var fr = new FormData();
    fr.append('username', localStorage.getItem("username"));
    console.log(localStorage.getItem("username"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.preLoadBoxesEffettuate);
}

function loadPendingRequest(){
    //Richiesta ajax che restituisce json con tutte le richieste da accettare
    var url = DataEventHandler.URL_REQUEST + "getPendingRequests.php";
    var fr = new FormData();
    fr.append('username', localStorage.getItem("username"));
    console.log(localStorage.getItem("username"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.preLoadBoxesNonEffettuate);
}    


function loadCompletedDelivery(){
    //Richiesta ajax che restituisce json con tutte le consegne da completare
    var url = DataEventHandler.URL_REQUEST + "getCompletedDelivery.php";
    var fr = new FormData();
    fr.append('username', localStorage.getItem("username"));
    console.log(localStorage.getItem("username"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.preLoadBoxesEffettuate);
}

function loadRemainedDelivery(){
    var url = DataEventHandler.URL_REQUEST + "getRemainedDelivery.php";
    var fr = new FormData();
    fr.append('username', localStorage.getItem("username"));
    console.log(localStorage.getItem("username"));
    AjaxManager.performAjaxRequest("POST", url, DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.preLoadBoxesNonEffettuate);
}

DataEventHandler.setDetailsOrder = function(response){
    if (response.responseCode === DataEventHandler.SUCCESS_RESPONSE){
        console.log("Success response setDetailsOrder");
        var obj = response.data;
        document.getElementById('textarea').textContent = obj[0].descrizione;
        if(obj[0].dataEsecuzione == null){
            document.getElementById('button-delivery').textContent = "Completa Consegna";
            document.getElementById('button-delivery').setAttribute('ontouchend', 'completeDelivery()');
        } else {
            document.getElementById('button-delivery').textContent = "Annulla Completamento";
            document.getElementById('button-delivery').setAttribute('ontouchend', 'undoCompletedDelivery()');
        }
    }
}

DataEventHandler.preLoadBoxesEffettuate = function(response){
    if (response.responseCode === DataEventHandler.SUCCESS_RESPONSE){
        console.log("Success response preLoadBoxesEffettuate");
        loadBoxes(response.data, "effettuate");
    }
}


DataEventHandler.preLoadBoxesNonEffettuate = function(response){
    if (response.responseCode === DataEventHandler.SUCCESS_RESPONSE){
        console.log("Success response preLoadBoxesNonEffettuate");
        //console.log("Prova: " + response.data[0].nome);
        loadBoxes(response.data, "non-effettuate");
    }
} 

DataEventHandler.manageResponse = function(response){
    if (response.responseCode === DataEventHandler.SUCCESS_RESPONSE){
        console.log("Success response");
    }
} 


function loadBoxes(obj, classtype){
    var num; //Conterrà il numero di dati
    var boxCompleted = document.getElementsByClassName(classtype)[0];

    //Ciclo per ogni ordine 
    for(var i=0; i<3 && i<obj.length; i++){ //Massimo 3 richieste
        var outerbox = document.createElement('div');
            var innerbox = document.createElement('div');
                var imgbox = document.createElement('div');
                    var img_elem = document.createElement('img');
                var left_minibox = document.createElement('div');
                    var p_tipo = document.createElement('p');
                    var p_nome_cognome = document.createElement('p');    
                var right_minibox = document.createElement('div');
                    var p_luogo = document.createElement('p');

        outerbox.setAttribute('class', 'container bg-white');
        //console.log("Debug: " + obj[i].idCommissione);
        outerbox.setAttribute('id', obj[i].idCommissione); 
        outerbox.setAttribute('ontouchend', 'openDetailsOrder(' + obj[i].idCommissione + ')'); 

        innerbox.setAttribute('class', 'row align-items-center');
        
        imgbox.setAttribute('class', 'col-2 p-0 ');
        
        img_elem.setAttribute('class', 'img-fluid');

        if(obj[i].necessita == "Medicine") 
            img_elem.setAttribute('src', "../img/icon/drug-2.png");
        else
            img_elem.setAttribute('src', "../img/icon/shopping-cart.png");

        left_minibox.setAttribute('class', 'col-6');
        p_tipo.setAttribute('class', ' text-left text big mx-auto mb-0');
        p_tipo.setAttribute('id', obj[i].idCommissione + "-tipo"); 
        p_tipo.textContent = obj[i].necessita; 
        p_nome_cognome.setAttribute('class', ' text-left  text opaco mb-0');
        p_nome_cognome.setAttribute('id', obj[i].idCommissione + "-nome"); 
        p_nome_cognome.textContent = obj[i].nome + " " + obj[i].cognome; 

        right_minibox.setAttribute('class', 'col-4');
        p_luogo.setAttribute('class', ' text-right text big mx-auto mb-0');
        p_luogo.setAttribute('id', obj[i].idCommissione + "-luogo"); 
        p_luogo.textContent = obj[i].luogo; 

        
        imgbox.appendChild(img_elem);
        
        left_minibox.appendChild(p_tipo);
        left_minibox.appendChild(p_nome_cognome);

        right_minibox.appendChild(p_luogo);

        innerbox.appendChild(imgbox);
        innerbox.appendChild(left_minibox);
        innerbox.appendChild(right_minibox);
        outerbox.appendChild(innerbox);
        boxCompleted.appendChild(outerbox);
    }
}

function makeRegistration(){
    var cod_fiscale = document.getElementById('cod_fiscale').value;
    var nome = document.getElementById('nome').value;
    var cognome = document.getElementById('cognome').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var comune_box = document.getElementById('comune');


    var fr = new FormData();
    
    var comune_res = comune_box.options[comune_box.selectedIndex].value;
    fr.append('nome', nome);
    fr.append('cognome', cognome);
    fr.append('password', password);
    fr.append('comune', comune_res);
    fr.append('email', email);

    console.log("cod_fiscale: " + cod_fiscale);
    console.log("comune_res: " + comune_res);

    //var dataToSend = "cod_fiscale=" + cod_fiscale + "&nome=" + nome + "&cognome=" + cognome + "&password=" + password + "&email=" + email + "&comune=" + comune_res;
    AjaxManager.performAjaxRequest("POST", DataEventHandler.URL_REQUEST + "makeClientRegistration.php", DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.checkRegistrationValitidy);
}

DataEventHandler.checkRegistrationValitidy = function(response){
    if(response.responseCode == DataEventHandler.SUCCESS_RESPONSE){
        console.log("Registrazione avvenuta con successo");
    }
}


function makeLogin(){
    var username = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    window.localStorage.setItem("username", username);
    
    var fr = new FormData();
    fr.append('username', username);
    fr.append('password', password);
    
    console.log(username);
    
    AjaxManager.performAjaxRequest("POST", DataEventHandler.URL_REQUEST + "makeAppLogin.php", DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.handleLoginResponse);
    
//  Login di prova    
//    if(username == "a@a")
//        loginPermanently("cliente");
//    else
//        loginPermanently("operatore");

}


DataEventHandler.handleLoginResponse = function(response){
    if(response.responseCode == 0){
        //TODO demultiplexing login
        console.log("Login avvenuto con successo");
        loginPermanently("operatore");
    } else if(response.responseCode == 1){
        loginPermanently("cliente");
    }
}


// Gestione registrazione richiesta cliente
function makeRequest(){
    var item = "Medicine";
    var desc = document.getElementById("textarea").value;
    if(document.getElementById('box-viveri').classList.contains("selezionato")){
        item = "Viveri";
    }

    console.log("Descrizione: " + desc);
    console.log("item: " + item);
    
    var fr = new FormData();
    fr.append('username', localStorage.getItem("username"));
    fr.append('necessita', item);
    fr.append('note', desc);

    console.log("user:" + localStorage.getItem("username"));
    AjaxManager.performAjaxRequest("POST", DataEventHandler.URL_REQUEST + "makeRequest.php", DataEventHandler.ASYNC_TYPE, fr, DataEventHandler.handleRequestResponse);
}

DataEventHandler.handleRequestResponse = function(response){
    if(response.responseCode == DataEventHandler.SUCCESS_RESPONSE){
        console.log("Richiesta avvenuta con successo");
    }
}


app.initialize();