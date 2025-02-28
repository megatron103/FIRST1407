let editMode = false;

function checkPassword(){
    const password = document.getElementById("password").value;
    if(password === "1407"){
        document.getElementById("addHs").style.display = "inline-block"
        document.getElementById("Save").style.display = "inline-block";
        enableEditing(true);
        editMode = true;
    }
     else {
        alert("Sai mật khẩu!");
     }
}
function enableEditing(state) {
    document.querySelectorAll(".editable").forEach(td => {
        td.contentEditable = state;
    });
}
function addStudent() {
    if (!editMode) return;
    const table = document.getElementById("scoreTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();
    row.innerHTML = `<td class="student-name" contenteditable="true">Tên mới</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>
                     <td class="editable" contenteditable="true">0</td>`;

    const inputs1 = row.querySelectorAll(".editable");
    inputs1.forEach(input => {
        input.addEventListener("focus", function () { // focus: khi đang nhận thao tác
            if (this.textContent.trim() === "0") this.textContent = "";
        });
        input.addEventListener("blur", function () {  // blur: khi rời vị trí đang thao tác
            if (this.textContent.trim() === "") this.textContent = "0";
        });
    });
    const inputs2 = row.querySelectorAll(".student-name");
    inputs2.forEach(input => {
        input.addEventListener("focus", function () { 
            if (this.textContent.trim() === "Tên mới") this.textContent = "";
        });
        input.addEventListener("blur", function () { 
            if (this.textContent.trim() === "") this.textContent = "Tên mới";
        });
    });
}
function saveData() {
    enableEditing(false);
    document.querySelectorAll(".student-name").forEach(td => {
        td.contentEditable = false;
    });
    editMode = false;
}
