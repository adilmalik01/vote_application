let signUpbtn = document.querySelector("#login")
const loginHandler = async (e) => {
    e.preventDefault()

    //ALL INPUT VALUES

    let nic = e.target.parentNode.children[0].value;
    let password = e.target.parentNode.children[1].value;



    if (nic.length != 13) {
        alertWarning("NIC NUMBER INVALID")
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        alertWarning("Invalid Email")
        return;
    }
    if (!password.match(repeatPass)) {
        alertWarning("Cannot Matach password")
        return;
    }


    let userData = {
        nicNumber: nic,
        password: password
    }


    try {
        let response = await axios.post('http://localhost:3005/api/v1/login', userData, {
            withCredentials: true
        })
        Swal.fire({
            html: `<p class="alert">Login SucessFully`,
            icon: "warning",
            showConfirmButton: false,
        });
        console.log(response.data.data);
        if (response.data.data.isAdmin === false) {
            window.location.href = "./index.html"
            return;
        } else {
            window.location.href = "./admin/adminPanel.html"
        }

    } catch (e) {
        alertWarning(e.response.data.msg)
    }

}


const alertWarning = (message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "warning",
        html: `<p class="alertWarning">${message}</p>`
    });
}



signUpbtn.addEventListener("click", loginHandler)