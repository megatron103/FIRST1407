let editMode = false;

function checkPassword(){
    const password = document.getElementById("password").value;
    if(password === "1407"){
        document.getElementById("addHs").style.display = "inline-block";
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
    const table = document.getElementsByTagName("tbody")[0];
    const row = table.insertRow();   
    const sttCell = row.insertCell();

    sttCell.textContent = table.rows.length; 
    sttCell.classList.add("stt");
    row.insertCell().outerHTML = `<td class="student-name" class="editable" contenteditable="true" >Tên mới</td>`;
    for (let i = 1; i <= 7; i++) {
        row.insertCell().outerHTML = `<td class="editable" contenteditable="true">0</td>`;
    }

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
// mmm
function loadContent(file, event) {
    event.preventDefault();
    fetch(file)
        .then(response => response.text()) // Đọc nội dung file con
        .then(data => {
            document.getElementById("score-container").innerHTML = data; // Chèn vào div
            
        })
}

function saveData() {
    const table = document.getElementById("scoreTable");
    const rows = table.getElementsByTagName("tr");
    let data = [];

    for (let i = 1; i < rows.length; i++) { // Bỏ qua hàng tiêu đề
        const cells = rows[i].getElementsByTagName("td");
        let rowData = {
            name: cells[1].innerText,
            tx1: parseFloat(cells[2].innerText) || null,
            tx2: parseFloat(cells[3].innerText) || null,
            tx3: parseFloat(cells[4].innerText) || null,
            tx4: parseFloat(cells[5].innerText) || null,
            gk2: parseFloat(cells[6].innerText) || null,
            ck2: parseFloat(cells[7].innerText) || null,
            tk: parseFloat(cells[8].innerText) || null
        };
        data.push(rowData);
    }

    fetch("http://localhost:3000/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => alert(result.message))
    .catch(error => console.error("Lỗi:", error));
}
function loadStudents() {
    fetch("http://localhost:3000/students")
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("scoreTable").getElementsByTagName("tbody")[0];
            table.innerHTML = ""; // Xóa dữ liệu cũ trước khi tải lại

            data.forEach((student, index) => {
                const row = table.insertRow();
                row.insertCell().textContent = index + 1; // STT
                row.insertCell().textContent = student.name;
                row.insertCell().textContent = student.tx1;
                row.insertCell().textContent = student.tx2;
                row.insertCell().textContent = student.tx3;
                row.insertCell().textContent = student.tx4;
                row.insertCell().textContent = student.gk2;
                row.insertCell().textContent = student.ck2;
                row.insertCell().textContent = student.tk;
            });
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
}

// Gọi hàm này khi trang web load xong
document.addEventListener("DOMContentLoaded", loadStudents);


