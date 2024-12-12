const loadProduct =(src)=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${src}`)
    .then((res) => res.json())
    .then((data) => {displayPlayers(data.player);})
};

const displayPlayers =(players)=>{
    const container = document.getElementById("player-container");
    container.innerHTML ="";

    players?.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <div class="card p-2" style="width: 18rem;">
        <img src=${player.strCutout} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name : ${player.strPlayer}</h5>
                <h6 class="mb-2">Nationality : ${player.strNationality}</h6>
                <h6>Team : ${player?.strTeam}</h6>
                <h6>Sport : ${player?.strSport}</h6>
                <h6>Salary : ${player?.strWage}</h6>
                <h6>Gender : ${player.strGender}</h6>
                <p class="card-text">Description : ${player?.strDescriptionEN.slice(0,50)}</p>
                <h6 class="text-primary my-4">  <a class="fa-brands fa-facebook text-decoration-none me-3" target="_blank" href="https://${player?.strFacebook}"></a>   <a class="fa-brands fa-twitter text-decoration-none" target="_blank" href="https://${player?.strTwitter}"></a> </h6>
                <button onClick="AddToCart('${player?.strPlayer}')" class="btn btn-warning text-white me-4 cart-btn">Add to cart</button>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="singlePlayer('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
        </div>
        `;
        container.appendChild(div);
    });
}

const singlePlayer = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then(data => Details(data.players))
}

const Details = (player) => {
    const player_detail = player[0];
    const playerTitle = document.getElementById("exampleModalLabel");
    playerTitle.innerText = player_detail.idPlayer;
    const playerDetails = document.getElementById("playerDetails");
    playerDetails.innerHTML = `
    <p>Born Date : ${player_detail.dateBorn} </p>
  <p>Nationality : ${player_detail.strNationality} </p>
  <p>Birth Location : ${player_detail.strBirthLocation}</p>
   <p>Gender : ${player_detail.strGender}</p>
   <p>Team : ${player_detail.strTeam}</p>
   <p>Height : ${player_detail.strHeight}</p>
   <p>Jersey Number : ${player_detail.strNumber}</p>
   <p>sport :  ${player_detail.strSport}</p>
    `
  }

const AddToCart = (name) => {
    const total = document.getElementById("count").innerText;
    let num = parseInt(total);
    num += 1;
    if(num > 11)
      {
        alert("player is more than 11");
        return;
      }
    document.getElementById("count").innerText = num;
    const Container = document.getElementById("cart-container");
    const div = document.createElement("div");
    div.innerHTML = `<h6>Name : ${name}</h6>`
    Container.appendChild(div);
  }

const Searchitem =()=>{
    const inputValue = document.getElementById("src-input").value;
    loadProduct(inputValue);
    document.getElementById("src-input").value ="";
}

loadProduct("");