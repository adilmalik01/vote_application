

const tokenCheck = async (e) => {
    console.log('chal gaya');
    try {
        let res = await axios.get('http://localhost:3005/api/v1/ping', {
            withCredentials: true
        })
        console.log(res);
    } catch (e) {
        console.log("error", e.response.status);
        if (e.response.status === 401) {
            window.location.href = '../login.html'
        }
    }
}
tokenCheck()
