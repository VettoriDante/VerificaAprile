const container = document.getElementById('chart');
const mappa = L.map('mappa').setView([42.466761, 11.836083], 5);
const btnMarker = document.querySelector("#btnShow");
let markerS = [];
let showM = false;
let graf;


//getters 
function getNomi(){
    let ans = [];
    for(let i of comuni){
        ans.push(i.nome)
    }
    return ans;
}

function getPopolazione(){
    let ans = []
    for(let i of comuni){
        ans.push(i.abitanti)
    }
    return ans;
}

function getPos(){
    let ans =[]
    for(let i of comuni){
        ans.push(i.coordinate);
    }
    return ans;
}

//inizializza map
function setMap(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Verifica'
    }).addTo(map);
}

//crea i chart e lo appende al container
function createChart(){
    let canvas = document.createElement("canvas");
    let data = {type: "bar", data: createData(),options: createOptions()};
    container.append(canvas)
    return new Chart(canvas, data);
}

//crea l'oggetto data
function createData(){
    let setData = {
        labels: getNomi(),
        datasets: [{
          label: 'Abintanti',
          data: getPopolazione(),
          borderWidth: 1
        }]
      }
      return setData;
}


//crea l'ogetto options
function createOptions(){
    let options = {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
            title: {
                display: true,
                text: 'Le 10 città più popolose'
            }
        }
        }
        return options;
}

//crea ed aggiunge i marker
function createMarkers(){
    let posizioni = getPos();
    let nomi = getNomi();
    let abitanti = getPopolazione();
    for(let i = 0; i<comuni.length; i++){
        let marker = L.marker(posizioni[i]).addTo(mappa);
        marker.bindPopup('<b>' + nomi[i] + ':</b> ' + abitanti[i]);
        markerS.push(marker);
    }
}

//rimuove o aggiunge i marker
function toggleMarker(){
    if(showM){
        for(let i of markerS){
            i.addTo(mappa);
        }
    }
    else{
        for(let i of markerS){
            mappa.removeLayer(i);
        }
    }
    showM = !showM;
}

//funzione per un responsive improvvisato
function resize(){
    graf.destroy();
    container.innerHTML = "";
    graf = createChart()
}


addEventListener("DOMContentLoaded", () => {
    graf = createChart();
    setMap(mappa)
    createMarkers();
})

btnMarker.addEventListener("click", () => {
    toggleMarker();
})

window.addEventListener("resize", resize)