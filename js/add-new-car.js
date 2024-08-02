const BASE_URL = "http://sql12.freemysqlhosting.net:8080";
const formLicensePlate = document.getElementById("license-plate");
const formRepaireDate = document.getElementById("repaire-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-create-form");
form.addEventListener("submit",async function(e){
    e.preventDefault();
    await create();
    this.reset();
})

async function create() {
    const response = await fetch(`${BASE_URL}/api/v1/cars`,{
    method: "POST",
    headers:{
         "Content-type": "application/json"},
    body: JSON.stringify({
        licensePlate: formLicensePlate.value,
        repairDate: formRepaireDate.value,
        customerName: formCustomerName.value,
        catalogs: formCatalog.value,
        carMaker: formCarMaker.value
    })
    });
    const body = await response.json();
    console.log(body);
}
