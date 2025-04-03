var itemList = [];

var item_value = document.getElementById("item_value");
var btn_add = document.getElementById("btn_add");
var deleteBtn = document.getElementById("deleteBtn")
var btn_update = document.getElementById("btn_update")
var searchInput = document.getElementById("searchInput")
var modal = new bootstrap.Modal(document.getElementById('exampleModal'))

var searchIndex

btn_update.addEventListener("click", function () {
    readyToUpdate()
})


searchInput.addEventListener("input", function () {
    searchFn(searchInput.value)
})


var index

// if(index != null){

// deleteBtn.addEventListener("click", function () {
//     console.log("hi");
//     deleteFn(index)
// })
// }


btn_add.addEventListener("click", function () {
    addItem();
});

if (localStorage.getItem("item") == null) {
    itemList = []
} else {
    itemList = JSON.parse(localStorage.getItem("item"))
    display(itemList)
}

function addItem() {
    if (checkNotEmpty() == true) {
        if (checkExist() == true) {
            var item = {
                item_name: item_value.value.toLowerCase(),
            };
            itemList.push(item);
            localStorage.setItem("item", JSON.stringify(itemList));
            display(itemList);
            reset()

            Toastify({

                text: "item added successfully",

                duration: 3000,
                style: {
                    background: " rgb(244, 162, 38)"
                },
                // position: "left",
                gravity: "bottom"

            }).showToast();
        }

    }
}


function checkNotEmpty() {
    if (item_value.value == "") {
        displayError("You should enter values")
        return false
    }
    else {
        return true
    }
}

function displayError(msg) {
    modal.show()
    document.getElementById("innerMsg").innerHTML = msg
}

function display(arr) {
    var cartona = "";
    for (var i = 0; i < arr.length; i++) {
        index = i
        cartona += `
     <tr>
              <td>${i + 1}</td>
              <td>${arr[i].newName ? arr[i].newName : arr[i].item_name}</td>
              <td><button class="btn btn-danger" id="deleteBtn" onclick="deleteFn(${i})">Delete</button></td>
              <td><button class="btn btn-warning" onclick="setItemUpdate(${searchIndex ? searchIndex : i})">Update</button></td>
            </tr>
    
    `;
    }
    document.getElementById("tbody").innerHTML = cartona;
}


function searchFn(term) {
    var founded = []

    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].item_name.includes(term)) {
            itemList[i].newName = itemList[i].item_name.toLowerCase().replace(term.toLowerCase(),
                `<span class = "text-danger">${term}</span>`

            )
            searchIndex = i
            founded.push(itemList[i])
            display(founded)




        }
    }

}




function deleteFn(id) {
    itemList.splice(id, 1)
    localStorage.setItem("item", JSON.stringify(itemList))
    display(itemList)
}


function reset() {
    item_value.value = ""

}

function setItemUpdate(i) {
    item_value.value = itemList[i].item_name
    btn_add.classList.add("d-none")
    document.getElementById("btn_update").classList.remove("d-none")
    index = i

    console.log(index);

}

function readyToUpdate() {
    // var newData = {
    //     item_name: item_value.value.toLowerCase(),
    // }
    // itemList.splice(index, 1, newData)
    itemList[index] = {
        item_name: item_value.value.toLowerCase(),
    }


    localStorage.setItem("item", JSON.stringify(itemList))
    display(itemList)
    reset()
    btn_add.classList.replace("d-none", "d-block")
    document.getElementById("btn_update").classList.add("d-none")
}


function checkExist() {
    var isExist = false
    for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].item_name.trim().toLowerCase() == item_value.value.trim().toLowerCase()) {
            isExist = true
        } else {
            isExist = false
        }
    }

    if (isExist != true) {
        return true
    }
    else {
        displayError("Item already exist")
        return false
    }
}





