const getAllCandinates = async (e) => {
    console.log("chal gaya");
    try {

        let response = await axios.get("http://localhost:3005/api/v1/allCandinates", {
            withCredentials: true
        })
        // console.log(response.data);
        createCard(response.data)

    } catch (e) {
        console.log(e);
    }

}

let cardBody = document.querySelector(".cardBody")

const createCard = (cardData) => {


    cardData.forEach((data) => {
        console.log(data);
        cardBody.innerHTML = `
            <div class="cards">
                <div class="card-head">
                    <img src="./images/387780182_699650092214251_8810319414933583334_n.jpg" alt="">
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <h1>PMLN</h1>
                        <h2>Nawaz Shareef</h2>
                    </div>
                </div>
            </div>
        `
    });
}



console.log(cardBody);


getAllCandinates()













const checkToken = async (e) => {
    console.log('chal gaya');
    try {
        let res = await axios.get('http://localhost:3005/ping', {
            withCredentials: true
        })
        console.log(res.data.data.isAdmin);
    } catch (e) {
        console.log("error", e.response.status);
        if (e.response.status === 401) {
            window.location.href = './login.html'
        }
    }
}
checkToken()
