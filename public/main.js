Swal.fire({
    html: `<p class="alert">You are Eligible for Only one vote So becareFull If You are Click One Vote You Can Not See HOme page`,
    icon: "warning",
    showConfirmButton: true,
    timer: 8000,
});


let userId = localStorage.getItem("userId")
console.log(userId);
let cardSection = document.getElementById("cardBody")


const getAllCandinates = async (e) => {
    try {

        let response = await axios.get("http://localhost:3005/api/v1/allCandinates", {
            withCredentials: true
        })
        if (response) {
            createCard(response.data)
        } else {
            console.log("data invalid");
        }

    } catch (e) {
        console.log(e);
    }

}



const createCard = (cardData) => {
    cardData.forEach((data) => {
        cardSection.innerHTML += `
        <div class="cards">
        <div class="card-head">
            <img src="${data.CandinateAvatar}" alt="">
        </div>
        <div class="card-body">
            <div class="card-text">
                <div class="info">
                    <span>PARTY : ${data.party}</span>
                </div>
                <div class="info">
                    <span>Name : ${data.firstName} ${data.lastName}</span>
                </div>
                <div class="info">
                    <span>Qualification : ${data.qualification}</span>
                </div>
            </div>
        </div>
        <div class="btn-div">
        <button  data-set-Id="${data._id}" class="putVote">VOTE</button>
        </div>
        </div>
        `
        document.querySelectorAll(".putVote").forEach((btn) => {
            btn.addEventListener("click", putVote)
        })
    });
}



let putVote = async (e) => {

    let voterPostId = e.target.getAttribute("data-set-Id")
    console.log("userId", userId);
    console.log(e.target.getAttribute("data-set-Id"));

    try {
        let res = await axios.post(`http://localhost:3005/api/v1/vote/${voterPostId}/doVote`, {
            withCredentials: true
        })

        let doVOteTrue = await axios.put(`http://localhost:3005/api/v1/user/${userId}/status`, {
            withCredentials: true
        })
        Swal.fire({
            title: "Your Vote Is Submitted",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
        });
        console.log(doVOteTrue);
        console.log(res.status);
    } catch (e) {
        console.log(e);
    }
    setInterval(() => {
        window.location.href = window.location.href
    }, 100)
}



const checkToken = async (e) => {
    try {
        let res = await axios.get(`http://localhost:3005/api/v1/user/${userId}/profile`, {
            withCredentials: true
        })

        setInterval(() => {
            if (!res.data[0].isVoted === false) {
                window.location.href = './profile.html'
            }
        }, 1000)
        // document.querySelector(".overlay").style.display = "flex"
    } catch (e) {

        if (e.response && e.response.status === 401) {
            window.location.href = './login.html'
        }

    }
}


const tokenCheck = async (e) => {
    console.log('chal gaya');
    try {
        let res = await axios.get('http://localhost:3005/api/v1/ping', {
            withCredentials: true
        })
        localStorage.setItem("userId", res.data[0]._id)
        console.log(res.data[0]._id);
    } catch (e) {
        console.log("error", e.response.status);
        if (e.response && e.response.status === 401) {
            window.location.href = './login.html'
        }
    }
}
tokenCheck()
checkToken()

getAllCandinates()