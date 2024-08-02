const BASE_URL = "https://sql12.freemysqlhosting.net:8080";
const formId = document.getElementById("id");
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formName = document.getElementById("name");
const formPrice = document.getElementById("price");
const formStatusDamaged = document.getElementById("status-damaged");
const formRepairStatus = document.getElementById("repair-status");
const form = document.getElementById("accessory-update-form");
const tbody = document.getElementById("accessories");
const loading = document.getElementById("loading");

form.addEventListener("submit",async function(e){
    e.preventDefault();
    await createOrUpdate();
    formLicensePlate.disabled = false;
    formRepairDate.disabled = false;
    showLoading();
    findAll();
    hideLoading();
    this.reset();

})
findAll();
hideLoading();
async function findAll(){
    const response = await fetch(`${BASE_URL}/api/v1/accessories`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
    });
    const body = await response.json();
    console.log(body);
    showAllAccessories(body.content);
    hideLoading();
}

async function showAllAccessories(accessories){
    tbody.innerText="";
    for(const accessory of accessories ){
        const row = tbody.insertRow();

        const id = accessory.id;
        row.insertCell().innerText = id;
        const licensePlate = accessory.licensePlate;
        row.insertCell().innerText = licensePlate;
        const repairDate = accessory.repairDate;
        row.insertCell().innerText = repairDate;
        const name = accessory.name;
        row.insertCell().innerText = name;
        const price = accessory.price;
        row.insertCell().innerText = price;
        const statusDamaged = accessory.statusDamaged;
        row.insertCell().innerText = statusDamaged;
        const repairStatus = accessory.repairStatus;
        row.insertCell().innerText = repairStatus;

        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.addEventListener("click",function(e){
            formId.value = accessory.id;
            formLicensePlate.value = accessory.licensePlate;
            formRepairDate.value = accessory.repairDate;
            formName.value = accessory.name;
            formPrice.value = accessory.price;
            formStatusDamaged.value = accessory.statusDamaged;
            formRepairStatus.value = accessory.repairStatus;
            formLicensePlate.disabled = true;
            formRepairDate.disabled = true;
        })
        const btnDel = document.createElement("button");
        btnDel.innerText = "Del";
        btnDel.addEventListener("click",function(e){
            const confirmed = confirm("Do you want to delete this accessory?");
            if(confirmed){
                showLoading();
                deleteByID(accessory.id);
                tbody.removeChild(row);
                hideLoading();
            }
        })
        row.insertCell().append(btnEdit,btnDel);
    }
};

async function deleteByID(id){
    const response = await fetch(`${BASE_URL}/api/v1/accessories/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
}

async function createOrUpdate(){
    const id = formId.value;
    const url = id ? `${BASE_URL}/api/v1/accessories/${id}`: `${BASE_URL}/api/v1/accessories`;
    const method = id ? "PUT" : "POST";
    const response = await fetch(url,{
        method:method,
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            licensePlate:formLicensePlate.value,
            repairDate:formRepairDate.value,
            name:formName.value,
            price:formPrice.value,
            statusDamaged:formStatusDamaged.value,
            repairStatus:formRepairStatus.value
        })
    })
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