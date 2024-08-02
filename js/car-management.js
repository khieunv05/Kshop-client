const BASE_URL = "https://sql12.freemysqlhosting.net:8080";
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-update-form");
const loading = document.getElementById("loading");
const tbody = document.getElementById("cars");
form.addEventListener("submit",async function(e){
    e.preventDefault();
    await update();
    showLoading();
    findAll();
    hideLoading();
    this.reset();
    formLicensePlate.disabled=false;
    formRepairDate.disabled=false;
})
findAll();
hideLoading();

async function findAll(){
    const response = await fetch(`${BASE_URL}/api/v1/cars`,
    {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }

    });
    const body = await response.json();
    console.log(body);
   showAllCars(body.content);
    hideLoading();
}
async function showAllCars(cars){
    tbody.innerText = "";
    for (const car of cars){
        const row = tbody.insertRow();

        const licensePlate = document.createTextNode(car.licensePlate);
        row.insertCell().appendChild(licensePlate) ;
        const repairDate = car.repairDate;
        row.insertCell().innerText = repairDate;
        const customerName = car.customerName;
        row.insertCell().innerText = customerName;
        const catalogs = car.catalogs;
        row.insertCell().innerText = catalogs;
        const carMaker = car.carMaker;
        row.insertCell().innerText = carMaker;
        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.addEventListener("click",function(e){
            formLicensePlate.value = car.licensePlate;
            formRepairDate.value = car.repairDate;
            formLicensePlate.disabled=true;
            formRepairDate.disabled=true;
            formCustomerName.value = car.customerName;
            formCatalog.value = car.catalogs;
            formCarMaker.value = car.carMaker;
        })
        const btnDel = document.createElement("button");
        btnDel.innerText = "Del";
        btnDel.addEventListener("click",async function(e){
            const confirmed = confirm("Do you want to del this car?");
            if(confirmed) {
                await deleteByID(car.licensePlate,car.repairDate);
                tbody.removeChild(row);
            }
        })
        row.insertCell().append(btnEdit,btnDel);
    } 
}
async function deleteByID(licensePlate,repairDate){
    const response = await fetch(`${BASE_URL}/api/v1/cars`,
    {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            licensePlate:licensePlate,
            repairDate:repairDate
        })
    });
}
async function update(){
    const response = await fetch(`${BASE_URL}/api/v1/cars`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            licensePlate: formLicensePlate.value,
            repairDate: formRepairDate.value,
            customerName: formCustomerName.value,
            catalogs: formCatalog.value,
            carMaker: formCarMaker.value
        })
    });
    const body = await response.json();
    console.log(body);
}
function showLoading(){
    loading.style.display = "flex";
}
function hideLoading(){
    setTimeout(function(){
        loading.style.display = "none"
    },Math.random()*2000)
}

