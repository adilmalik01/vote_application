let signUpbtn = document.querySelector("#signUp")
let fileInput = document.querySelector("#userAvatar")
let preivew = document.querySelector(".fileName")
let filesInfo;

fileInput.addEventListener("input", (e) => {
    filesInfo = e.target.files[0]
    // console.log(filesInfo)
    preivew.innerHTML = `Your Profile pic selected ${e.target.files[0].name}`
    console.log(preivew);
})






const signUpHandler = async (e) => {
    e.preventDefault()
    // console.log(e.target.parentNode.children);
    // console.log(filesInfo)
    //ALL INPUT VALUES
    let firstName = e.target.parentNode.children[0].children[0].value;
    let lastName = e.target.parentNode.children[0].children[1].value;
    let nic = e.target.parentNode.children[1].value;
    let email = e.target.parentNode.children[2].value;
    let password = e.target.parentNode.children[3].children[0].value;
    let repeatPass = e.target.parentNode.children[3].children[1].value;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(nic);
    // console.log(password);
    // console.log(repeatPass);

    if (nic.length != 13) {
        alertWarning("NIC NUMBER INVALID 13 digit")
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
    // let userData = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     nicNumber: nic,
    //     email: email,
    //     password: password
    // }
    let formData = new FormData()

    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("nicNumber", nic)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("avatar", filesInfo)
    try {
        let res = await axios.post('http://localhost:3005/api/v1/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log(res);

        window.location.href = './login.html'
    } catch (e) {
        console.log(e);
        alertWarning(e.response.data)

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



signUpbtn.addEventListener("click", signUpHandler)