const getAllCandinates = async (e) => {
    console.log("chal gaya");
    try {

        let response = await axios.get("http://localhost:3005/api/v1/allCandinates", {
            withCredentials: true
        })
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}
getAllCandinates()