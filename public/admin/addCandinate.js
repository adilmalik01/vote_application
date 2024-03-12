let addData = document.querySelector("#addData")
let fileInput = document.querySelector("#userAvatar")
let filesInfo;

fileInput.addEventListener("input", (e) => {
    filesInfo = e.target.files[0]
    console.log(filesInfo)
    let preivew = document.querySelector(".preview")
    preivew.innerHTML = `Your Profile pic selected ${e.target.files[0].name}`
    console.log(preivew);
})



const addCandinate = async (e) => {
    e.preventDefault()
    console.log(filesInfo);

    //ALL INPUT VALUES
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let nic = document.querySelector("#nic").value;
    let email = document.querySelector("#email").value;
    let qualification = document.querySelector("#qualification").value;
    let party = document.querySelector("#party").value;


    if (nic.length != 13) {
        alertWarning("NIC NUMBER INVALID")
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        alertWarning("Invalid Email")
        return;
    }



    // let userData = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     nicNumber: nic,
    //     email: email,
    //     qualification: qualification,
    //     party: party
    // }
    let formData = new FormData()

    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("nicNumber", nic)
    formData.append("email", email)
    formData.append("qualification", qualification)
    formData.append("party", party)
    formData.append("CandinateAvatar", filesInfo)
    try {
        let res = await axios.post('http://localhost:3005/api/v1/addCandinate', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        Swal.fire({
            title: "Registered",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
        });
        console.log(res);
    } catch (e) {
        console.log(e);

    }




    console.log("firstName", firstName);
    // let res = await axios.post('http://localhost:3005/api/v1/addCandinate', userData, {
    console.log("lasstName", lastName);
    console.log("nic", nic);
    console.log("email", email);
    console.log("password", qualification);
    console.log("repeatpassword", party);

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



addData.addEventListener("click", addCandinate)