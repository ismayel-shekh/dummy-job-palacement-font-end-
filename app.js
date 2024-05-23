const oportunity = () => {  
    const user_id = localStorage.getItem("user_id");
    console.log(user_id)
    // document.getElementById("spinner").style.display = "block";
    
    fetch(`https://dummy-jobpace-ment-project.onrender.com/opportunities/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if(data.length > 0){
            loadoportunity(data)
        }
    })
}

const loadoportunity = (opor) =>{
    console.log(opor)
    opor?.forEach(opo =>{
        console.log(opo)
        const parent = document.getElementById("joining")
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML =`
        <img src="${opo?.image}" class="card__image" alt="brown couch" />
        <div class="card__content">
          <time datetime="2021-03-30" class="card__date">${opo?.organization}</time>
          <span class="card__title">${opo?.title}<span>
        </div>
        <h3>
        Requerment : ${opo?.required_skills}
    </h3>
    <p>
    ${opo?.description}
    </p>
    <h5>Location : Gaza / Palestin<h5>
        <div class="buttonforcard">
        ${localStorage.user_id ? `<Button  onclick="handleJoining(${opo?.id})">Join</Button> ` : '<a href="login.html" class="btn btn-primary btn-sm">Join Us </a>'} 
            <Button > Update </Button>
            <Button onclick="navigateToVolunteer(${opo?.id})"> Current Volunteer </Button>
        </div>
        `
        parent.appendChild(div)
    })

}
document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is logged in
    var isLoggedIn = /* Your logic to check if the user is logged in */ true; // Replace true with your actual logic

    // Find the opportunity link element
    var opportunityLink = document.getElementById("opportunityLink");

    // Find the login status element
    var loginStatus = document.getElementById("loginStatus");

    // If user is logged in, show the opportunity link
    console.log(localStorage)
    if (localStorage.usex) {
        opportunityLink.style.display = "block";
    } else {
        opportunityLink.style.display = "none";
    }
});

const navigateToVolunteer = (opportunityId) => {
    window.location.href = `Volunteer.html?opportunity_id=${opportunityId}`;
};



const handleJoining = (opportunityId) => {
    const cust = localStorage.user_id;
    if (!cust) {
        console.error("No user ID found in localStorage");
        return;
    }
    
    const info = {
        "status": "pending",
        "opportunity": opportunityId,
        "volunteer": cust
    };
    console.log("my user info", info);

    fetch("https://dummy-jobpace-ment-project.onrender.com/volunteers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data) {
            Swal.fire({
                title: "Welcome",
                text: "Thanks for joining us",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};

// const heandelVolunteer = (oportunityId) => {
//     fetch(`https://dummy-jobpace-ment-project.onrender.com/volunteers/?opportunity_id=${oportunityId}`)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             if (data?.length > 0) {
//                 data.forEach(item => {
//                     console.log(item);
//                     showingvolinter(item?.volunteer, item?.status);
//                 });
//             }
//         })
//         .catch((error) => {
//             console.error('Error fetching volunteers:', error);
//         });
// };


// const showingvolinter = (volunteerId, volunteerstatus) =>{
//     console.log(volunteerId, volunteerstatus)

//     if(volunteerstatus === "confirmed"){
//         fetch(`https://dummy-jobpace-ment-project.onrender.com/user/list/${volunteerId}`)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data)
//             if(data.length > 0){
//                 loadvointear(data)
//             }
//         })
//     }
// }

// const loadvointear = (data) => {
//     const parent = document.getElementById("table-body");
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${data.id}</td>
//       <td>${data.first_name}</td>
//       <td>${data.email}</td>
//       <td>${data.username} tk</td>
//     `;
//     parent.appendChild(tr);
// }
oportunity();