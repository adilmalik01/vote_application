let addData = document.querySelector("#addData")
const addCandinate = async (e) => {
    e.preventDefault()

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



    let userData = {
        firstName: firstName,
        lastName: lastName,
        nicNumber: nic,
        email: email,
        qualification: qualification,
        party: party
    }
    try {

        let res = await axios.post('http://localhost:3005/api/v1/addCandinate', userData, {
            withCredentials: true
        })
        console.log(res);
    } catch (e) {
        console.log(e);

    }



    console.log("firstName", firstName);
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