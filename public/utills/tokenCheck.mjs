

const getAllPost = async (e) => {
    console.log('chal gaya');
    try {
        let res = await axios.get('http://localhost:3005/ping', {
            withCredentials: true
        })
        console.log(res.data.data.isAdmin);
    } catch (e) {
        console.log("error", e.response.status);
        if (e.response.status === 401) {
            window.location.href = '../login.html'
        }
    }
}
getAllPost()
