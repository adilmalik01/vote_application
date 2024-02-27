let signUpbtn = document.querySelector("#signUp")
const signUpHandler = async (e) => {
    e.preventDefault()

    //ALL INPUT VALUES
    let firstName = e.target.parentNode.children[0].children[0].value;
    let lastName = e.target.parentNode.children[0].children[1].value;
    let nic = e.target.parentNode.children[1].value;
    let email = e.target.parentNode.children[2].value;
    let password = e.target.parentNode.children[3].value;
    let repeatPass = e.target.parentNode.children[4].value;


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
        firstName: firstName,
        lastName: lastName,
        nicNumber: nic,
        email: email,
        password: password
    }
    try {

        let res = await axios.post('http://localhost:3005/api/v1/signup', userData)
        console.log(res);
    } catch (e) {
        console.log(e);
        
    }



    console.log("firstName", firstName);
    console.log("lasstName", lastName);
    console.log("nic", nic);
    console.log("email", email);
    console.log("password", password);
    console.log("repeatpassword", repeatPass);

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



signUpbtn.addEventListener("click", signUpHandler)