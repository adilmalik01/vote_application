
document.querySelector("#logout").addEventListener("click", async (e) => {
    console.log('chal gaya');
    try {
        let res = await axios.post('http://localhost:3005/api/v1/logout', {
            withCredentials: true
        })
        // console.log(res.data.data.isAdmin);
    } catch (e) {
        console.log("error", e.response.status);
    }

    window.location.href = window.location.href
})