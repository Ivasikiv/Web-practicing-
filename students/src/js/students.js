let modal = document.querySelector(".modal");                       // modal - це вікно додавання студента
////let btn = document.querySelector(".addbtn");                    // btn - це кнопка додавання студента
////let span = document.querySelector(".close");                    // span - це кнопка закриття вікна додавання студента
let addrowbtn = document.querySelector(".add-row");                 // addrowbtn - це кнопка додавання студента
let delbtn = document.querySelector(".del-btn");                    // delbtn - це кнопка видалення студента в таблиці!!!!!
let editbtn = document.querySelector(".edit-btn");                  // editbtn - це кнопка редагування студента в таблиці!!!!!
let confirmation = document.querySelector(".warning");              // confirmation - це вікно підтвердження видалення студента
let okbtn = document.querySelector(".wnOK");                        // okbtn - це кнопка підтвердження видалення студента в ворнінгу
let closebtn = document.querySelector("#closebtn");                 // Вибираємо елемент з класом closebtn
let cancelbtn = document.querySelector("#cancel2");                 // Вибираємо елемент з id cancel2
let notif = document.querySelector('.notification');                // notif - посилання на елемент span з класом notification
let span_point = document.querySelector('.point');                  // span_point - посилання на елемент span з класом point
let form = document.querySelector(".modal-content");                // form - це форма додавання студента
let globalEditBtn;
let studentToEdit;

let studentList = [];


function redirect() {
    window.location.href = 'chat/login/login.html';
}

let readData;
/*
window.addEventListener('load', async () => {
    let action = JSON.stringify({ action: "load"});
    console.log(action);
    $.ajax({
        async: false,
        url: 'students/src/php/requests_handler.php',
        type: 'POST',
        contentType: "application/json",
        data: action,
        success: function(data) {
        console.log(data);
        readData = JSON.parse(data);
        console.log(readData);
            if(!readData.status) {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: readData.errorMessage
                });
            } else {
                console.log("Students: ", readData.students);
                console.log("Number of students: ",readData.count);
                $('#hidden-input').val(Number(readData.count));
            }
        },
        error: function(xhr, error) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: xhr.status + ": " + error
            });
        }
    });
       
    // Оновимо таблицю
    let table = document.getElementsByTagName("table")[0];
    for (let i = 0; i < readData.count; i++) {
        let newRow = table.insertRow(-1);
        let checkboxCell = newRow.insertCell(0);
        let groupCell = newRow.insertCell(1)
        let nameCell = newRow.insertCell(2);
        let genderCell = newRow.insertCell(3);
        let birthdayCell = newRow.insertCell(4);
        let statusCell = newRow.insertCell(5);
        let actionCell = newRow.insertCell(6);

        checkboxCell.innerHTML = '<input type="checkbox">';
        nameCell.innerHTML = readData.students[i].fullName;
        groupCell.innerHTML = readData.students[i].group;
        birthdayCell.innerHTML = readData.students[i].birthday;
        genderCell.innerHTML = readData.students[i].gender;
        
        //if (readData.students[i].status == "Online") {
        //    statusCell.innerHTML = '🟢';
        //} else {
            statusCell.innerHTML = '⚪';
        //}
        actionCell.innerHTML = '<button class = "edit-btn" id="'+readData?.students[i]?.ID+'" onclick="onEditBtnClick('+readData?.students[i]?.ID+')">&#9999;&#65039;</button>'+
        '<button class="del-btn" id="'+readData?.students[i].ID+'" onclick="deleteStudent('+readData?.students[i].ID+')">&#10060;</button>';  
        
        student = {
            ID : readData.students[i].ID,
            group: readData.students[i].group,
            fullName: readData.students[i].fullName,
            gender: readData.students[i].gender,
            birthday: readData.students[i].birthday//,
            //status: "Offline"
        }
        console.log(student);
        studentList.push(student);
    }

    // let editbtn = document.querySelector(".edit-btn");                  // editbtn - це кнопка редагування студента в таблиці!!!!! 
    // editbtn.addEventListener("click",()=>{                       // Функція, яка редагує студента в таблиці

    // });
    
    let delbtn = document.querySelector(".del-btn"); 
    let okbtn = document.getElementById("wnOK");
    // delbtn.addEventListener("click",()=>{                         // Функція, яка видаляє студента з таблиці
    //     console.log("kfhjeisoh");
    //     confirmation.show();
    //     okbtn.addEventListener("click", ()=> {
    //         //delbtn.parentNode.parentNode.remove();
    //         DeleteStudent(delbtn);
    //         confirmation.close();
    //     })
    // });

    let closebtn = document.querySelector("#closebtn");                 
    let cancelbtn = document.querySelector("#cancel2");                 

    [cancelbtn, closebtn].forEach(item => {                    
        item.addEventListener("click", ()=>{
            confirmation.close();
        })
    })

}); */

function onEditBtnClick(id) {
    let editbtnLocal = document.getElementById(`${id}`)
    showModalEdit(editbtnLocal);
    document.querySelector(".formHeader").innerHTML = "Edit Student";
    globalEditBtn = editbtnLocal;
}


function deleteStudent(id) {
    confirmation.show();
    let delbtnLocal = document.getElementById(`${id}`);
    let okbtnLocal = document.getElementById("wnOK");
    okbtnLocal.addEventListener("click", ()=> {
        //delbtn.parentNode.parentNode.remove();
        DeleteStudent(delbtnLocal);
        confirmation.close();
    })
}

function showModalAdd() {                                    // Функція, яка відкриває вікно додавання студента
    document.querySelector(".formHeader").innerHTML = "Add Student";
    form.reset();
    addrowbtn.value = "Add";    
    modal.style.display = "block";

    document.getElementById("status").disabled = false;

}

function showModalEdit(button) {                            // Функція, яка відкриває вікно редагування студента
    document.querySelector(".formHeader").innerHTML = "Edit Student";
    document.getElementById("name").value = button.parentNode.parentNode.children[2].innerHTML;
    document.getElementById("gender").value = button.parentNode.parentNode.children[3].innerHTML;
    if(button.parentNode.parentNode.children[5].innerHTML == '🟢') {
        document.getElementById("status").value = "Online";
    } else {
        document.getElementById("status").value = "Offline";
    }
    document.getElementById("group").value = button.parentNode.parentNode.children[1].innerHTML;
    document.getElementById("birthday").value = button.parentNode.parentNode.children[4].innerHTML;
    addrowbtn.value = "Save";
    modal.style.display = "block";

    document.getElementById("status").disabled = true;

    studentToEdit = studentList.find((student) => {
        return student.fullName === button.parentNode.parentNode.children[2].innerHTML && student.group === button.parentNode.parentNode.children[1].innerHTML;
    });

    console.log("studentToEdit" + studentToEdit);
}

function hideModal() {                                           // Функція, яка закриває вікно додавання студента
    modal.style.display = "none";
}

window.onclick = function(event) {                               // Функція, яка закриває вікно додавання студента, якщо клікнути за межами вікна
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

addrowbtn.addEventListener("click", ()=> {                     // Функція, яка додає студента в таблицю
    
    let fullName = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let status = document.getElementById("status").value;
    let group = document.getElementById("group").value;
    let birthday = document.getElementById("birthday").value;
    let ID = 0;

    if (document.querySelector(".formHeader").innerHTML == "Add Student"){

        let action = 'add';
        const formData = { action, ID, group, fullName, gender, birthday};//, status };
        const jsonData = JSON.stringify(formData);

    
        saveData(jsonData);

        let counter = document.querySelector(".id");
        counter.value++;
        
        let okbtn = document.querySelector("#wnOK");
        let delbtn = document.querySelectorAll(".del-btn");
        let editbtn = document.querySelectorAll(".edit-btn")
        
        // delbtn.forEach(element => {                               
        //     element.addEventListener("click", ()=>{
        //         confirmation.show();
        //         okbtn.addEventListener("click", ()=>{
        //             element.parentNode.parentNode.remove();
        //             confirmation.close();
        //         })     
        //     }) 
        // });

        // editbtn.forEach(element => {                           
        //     element.addEventListener("click", ()=>{
        //         showModalEdit(element);
        //         document.querySelector(".formHeader").innerHTML = "Edit Student";
        //         globalEditBtn = element;
        //     }) 
        // });
        hideModal();
    } else {
        let action = 'edit';
        const formData = { action, ID, group, fullName, gender, birthday};//, status };
        const jsonData = JSON.stringify(formData);

        saveEditedData(jsonData);
        hideModal();
    }
});

// delbtn.addEventListener("click",()=>{                         // Функція, яка видаляє студента з таблиці
//     confirmation.show();
//     okbtn.addEventListener("click", ()=> {
//         delbtn.parentNode.parentNode.remove();
//         confirmation.close();
//     })
// });

// delbtn.addEventListener("click",()=>{                         // Функція, яка видаляє студента з таблиці
//     console.log("kfhjeisoh");
//     confirmation.show();
//     okbtn.addEventListener("click", ()=> {
//         //DeleteStudent(delbtn)
//         delbtn.parentNode.parentNode.remove();
//         confirmation.close();
//     })
// });

// editbtn.addEventListener("click",()=>{                       // Функція, яка редагує студента в таблиці
//     showModalEdit(editbtn);
//     document.querySelector(".formHeader").innerHTML = "Edit Student";
//     globalEditBtn = editbtn;
// });

//     // function editStudent() {
//     //     const editbtn = document.querySelector(".edit-btn");
//     //     showModalEdit(editbtn);
//     //     document.querySelector(".formHeader").innerHTML = "Edit Student";
//     //     globalEditBtn = editbtn; 
//     // }

// [cancelbtn, closebtn].forEach(item => {                    // Функція, яка закриває вікно підтвердження видалення студента
//         item.addEventListener("click", ()=>{
//         confirmation.close();
//     })
// })

function DeleteStudent(delbtn) {                                  // Функція, яка видаляє студента з таблиці
    let row = delbtn.parentNode.parentNode;
    console.log(row);
    let studentName = row.querySelector("td:nth-child(3)").innerHTML;
    let idToDelete = studentList.find(student => student.fullName == studentName).ID;
    console.log("ID to delete:", idToDelete);
    $.ajax({
        type:"POST",
        url: "students/src/php/requests_handler.php",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ action: 'delete', ID: idToDelete }),

        success: function(response) {
            console.log("Response from server:\n" + response);
                if (!response.status) {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: response.errorMessage
                    });
                } else {
                    row.remove();
                }
        }, error: function(xhr, error) {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: xhr.status + ": " + error
            });
        }
    });
}

function saveData(jsonData){                                       //  Функція, яка зберігає дані про студента в таблицю 
    let table = document.getElementsByTagName("table")[0];

    let parsedRequest = JSON.parse(jsonData);

    parsedRequest.ID = new Date().getTime();

    //update jsonData
    jsonData = JSON.stringify(parsedRequest);
    console.log("Add student - JSON: " + jsonData);

    let newStudent;
    // let student = {
    //     ID: ID = new Date().getTime(),
    //     group: group,
    //     fullName: fullName, 
    //     gender: gender,
    //     birthday: birthday,
    //     status: status
    // }
        
    // let JSONString = JSON.stringify(student);    
    // let obj = JSON.parse(JSONString);

    let newRow = table.insertRow(-1);
    let checkboxCell = newRow.insertCell(0);
    let groupCell = newRow.insertCell(1)
    let nameCell = newRow.insertCell(2);
    let genderCell = newRow.insertCell(3);
    let birthdayCell = newRow.insertCell(4);
    let statusCell = newRow.insertCell(5);
    let actionCell = newRow.insertCell(6);
    $.ajax({                                            // Відправляємо ajax запит на сервер
        type: "POST",                                   // POST запит
        url: "students/src/php/requests_handler.php",                        // Посилання на файл, який обробляє запит
        data: jsonData,                               // Дані, які відправляються на сервер
        contentType: "application/json",                // Тип даних, які відправляються на сервер
        dataType: "json",                               // Тип даних, які отримуємо від сервера
        success: function (response) {  
            //response = JSON.parse(response);            // Функція, яка виконується при успішному виконанні запиту
            console.log("Add Student - Response: " + response);
            if (response.status == "false"){
                Swal.fire({
                    title: 'Error!',
                    text: response.errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK'}
                )
                newRow.remove();
            } else { 
                newStudent = {
                    ID: parsedRequest.ID,
                    group: parsedRequest.group,
                    fullName: parsedRequest.fullName,
                    gender: parsedRequest.gender,
                    birthday: parsedRequest.birthday//,
                    //status: parsedRequest.status
                }

                checkboxCell.innerHTML = '<input type="checkbox">';
                nameCell.innerHTML = parsedRequest.fullName;
                groupCell.innerHTML = parsedRequest.group;
                birthdayCell.innerHTML = parsedRequest.birthday;
                genderCell.innerHTML = parsedRequest.gender;
                
                //if (newStudent.status == "Online") {
                    //statusCell.innerHTML = '🟢';
                //} else {
                    statusCell.innerHTML = '⚪';
                //}

                let newJSONString = JSON.stringify(newStudent);    
                let obj = JSON.parse(newJSONString);

                console.log(newJSONString);
                studentList.push(newStudent);
            }
        }, error: function(response) {  
            Swal.fire({
                title: 'Error!',
                text: response.errorMessage,
                icon: 'error',  
                confirmButtonText: 'OK'}
            )
            newRow.remove();
        }
    });
    actionCell.innerHTML = '<button class = "edit-btn" id="'+parsedRequest?.ID+'" onclick="onEditBtnClick('+parsedRequest?.ID+')">&#9999;&#65039;</button>'+
    '<button class="del-btn" id="'+parsedRequest.ID+'" onclick="deleteStudent('+parsedRequest.ID+')">&#10060;</button>';  
}

/*
let newRow = table.insertRow(-1);
        let checkboxCell = newRow.insertCell(0);
        let groupCell = newRow.insertCell(1)
        let nameCell = newRow.insertCell(2);
        let genderCell = newRow.insertCell(3);
        let birthdayCell = newRow.insertCell(4);
        let statusCell = newRow.insertCell(5);
        let actionCell = newRow.insertCell(6);
        
        checkboxCell.innerHTML = '<input type="checkbox">';
        nameCell.innerHTML = fullName;
        groupCell.innerHTML = group;
        birthdayCell.innerHTML = birthday;
        genderCell.innerHTML = gender;
        
        if (status == "Online") {
            statusCell.innerHTML = '🟢';
        } else {
            statusCell.innerHTML = '⚪';
        }
        actionCell.innerHTML = '<button class = "edit-btn">&#9999;&#65039;</button> <button class="del-btn">&#10060;</button>';

*/ 

function saveEditedData(jsonData) {
    let parsedRequest = JSON.parse(jsonData);

    currentID = studentToEdit.ID;
    parsedRequest.ID = currentID;

    jsonData = JSON.stringify(parsedRequest);

    console.log("Edit Student - JSON: " + jsonData);
    // let student = {
    //     ID: currentID,
    //     group: group,
    //     fullName: fullName, 
    //     gender: gender,
    //     birthday: birthday,
    //     status: status
    // }

    // let JSONString = JSON.stringify(student);
    // console.log(JSONString);

    $.ajax({
        type: "POST",
        url: "students/src/php/requests_handler.php",
        data: jsonData,
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            //response = JSON.parse(response);
            console.log("Edit Student - Response: " + response);
            if (response.status == "false") {
                Swal.fire({
                    title: 'Error!',
                    text: response.errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            let currRow = globalEditBtn.parentNode.parentNode;

            let groupCell = currRow.children[1];
            let nameCell = currRow.children[2];
            let genderCell = currRow.children[3];
            let birthdayCell = currRow.children[4];
            let statusCell = currRow.children[5];

            let newStudent = {
                ID: currentID,
                group: parsedRequest.group,
                fullName: parsedRequest.fullName,
                gender: parsedRequest.gender,
                birthday: parsedRequest.birthday//,
                //status: parsedRequest.status
            }

            nameCell.innerHTML = newStudent.fullName;
            groupCell.innerHTML = newStudent.group;
            birthdayCell.innerHTML = newStudent.birthday;
            genderCell.innerHTML = newStudent.gender;

            //if (newStudent.status == "Online") {
                //statusCell.innerHTML = '🟢';
            //} else {
                statusCell.innerHTML = '⚪';
            //}

            //Зберегти нові дані в масиві
            let index = studentList.findIndex((newStudent) => newStudent.ID == currentID);
            studentList[index] = newStudent;

            console.log(newStudent);
            //currentID = IDmap.get(fullName);
        }, 
        error: function(response) {
            //console.log("Response from server:\n" + response);
            if (response.status === "false") {
            Swal.fire({
                title: "Attention!",
                text: response.errorMessage,
                icon: 'warning', 
                confirmButtonColor: '#C2E0FF'} )  
            } else { /*console.log(response);*/}
        }
    });
}


/*обробка подій з сповіщеннями*/
notif.addEventListener('dblclick', () => {                  // При подвійному кліку на елемент span з класом notification
    span_point.style.display = 'block';                     // відображаємо елемент span з класом point
});

// notif.addEventListener('mouseover', () => {                 // При наведенні на елемент span з класом notification
//     let newDiv = document.querySelector('.notification-newWindow');      // newDiv - посилання на елемент div з класом newWindow
//     newDiv.style.display = 'block';                         // відображаємо елемент div з класом newWindow
// });

// notif.addEventListener('mouseout', () => {                  // При відведенні курсора з елемента span з класом notification
//     let newDiv = document.querySelector('.notification-newWindow');      // newDiv - посилання на елемент div з класом newWindow
//     newDiv.style.display = 'none';                          // приховуємо елемент div з класом newWindow
// });


/*обробка подій з профілем*/
let profile = document.querySelectorAll('.equalize-imgs');  // profile - посилання на елементи img з класом equalize-imgs
for(let i = 0; i < profile.length; i++) {                   // Проходимо по всіх елементах img з класом equalize-imgs
    let newDiv = document.querySelector('.profile');        // newDiv - посилання на елемент div з класом profile
    newDiv.style.display = 'none';                          // приховуємо елемент div з класом profile

    if(i == 0) {                                            // якшо i = 0, то виконуємо наступні дії
        continue;
    }

    profile[i].addEventListener('click', () => {            // При кліку на елемент img з класом equalize-imgs
        if(newDiv.style.display == 'block')        {        // якщо відображається елемент div з класом profile
            newDiv.style.display = 'none';                  // приховуємо елемент div з класом profile
        }else if (newDiv.style.display == 'none') {         // якщо прихований елемент div з класом profile
            newDiv.style.display = 'block';                 // відображаємо елемент div з класом profile
        }
    });
}

















// /*обробка подій з діалоговим вікном*/
// let plusToDialog = document.querySelector('.div-plus > button');    // plusToDialog - посилання на елемент button з класом div-plus. .div-plus > button - пошук елемента button з класом div-plus в елементі з класом div-plus
// let dialog = document.querySelector('dialog');                      // dialog - посилання на елемент dialog
// plusToDialog.addEventListener('click', () => {                      // При кліку на елемент button з класом div-plus
//     dialog.show();                                                  // відображаємо елемент dialog
// });

// let btnOutDialog = document.querySelector('dialog > div > div > button');   // btnOutDialog - посилання на елемент button з класом div-plus
// btnOutDialog.addEventListener('click', () => {                              // При кліку на елемент button з класом div-plus
//     dialog.close();                                                         // приховуємо елемент dialog
// });

// let btnCancel = document.getElementById('cancel');          // btnCancel - посилання на елемент button з id cancel
// btnCancel.addEventListener("click", () => {                 // При кліку на елемент button з id cancel
//     dialog.close();                                         // приховуємо елемент dialog
// });


// /*обробка подій з таблицею*/
// import { student } from "./student.js";                     // імпортуємо клас student з файлу student.js



// let btnOk = document.querySelector('.btn-in-footer-diag > div > button');   // btnOk - посилання на елемент button з класом btn-in-footer-diag
// btnOk.addEventListener("click", () => {                                     // При кліку на елемент button з класом btn-in-footer-diag
//     let group = document.getElementById('Group');                           // group - посилання на елемент select з id Group
//     let inputs = document.querySelectorAll('.input-dialog');                // inputs - посилання на елементи input з класом input-dialog
//     let gender = document.getElementById('Gender');                         // gender - посилання на елемент select з id Gender 
    
    
    
//     let newStudent = new student(group.value, inputs[0].value, inputs[1].value, gender.value, inputs[2].value);  // newStudent - створюємо новий об'єкт класу student

//     let table = document.querySelector('main > div > table > tbody');       // table - посилання на елемент table з класом table

//     // Додаємо новий рядок в таблицю
//     table.insertAdjacentHTML('beforeend', ` 
//         <tr>
//             <td><input type="checkbox"></td>
//             <td><b>${newStudent.group}</b></td>
//             <td><b>${newStudent.firstName + " " + newStudent.lastName}</b></td>
//             <td><b>${newStudent.gender}</b></td>
//             <td><b>${newStudent.birthday}</b></td>
//             <td><button class="status"></button></td>
//             <td><input type="button" value="&#9997;" class="edit"><input type="button" value="&#215" class="delete"></td>
//         </tr>
//     `);

//     dialog.close();                                         // приховуємо елемент dialog



//     group.value = 0;                                        // обнуляємо значення елемента select з id Group
//     for(let inp of inputs)                                  // Проходимо по всіх елементах input з класом input-dialog
//     {
//         inp.value = '';                                     // обнуляємо значення елемента input з класом input-dialog
//     }
//     gender.value = 0;                                       // обнуляємо значення гендера


//     // Додаємо подію на кнопку видалення для цього рядка
//     let btnToDelete = document.querySelectorAll('.delete'); // btnToDelete - посилання на елементи input з класом delete
//     for(let btn of btnToDelete){                            // Проходимо по всіх елементах input з класом delete
//         btn.addEventListener('click', () => {               // При кліку на елемент input з класом delete
//             let dialogWarm = document.querySelector('.warning');    // dialogWarm - посилання на елемент dialog з класом warning
//             dialogWarm.btnDelete = btn;                     // btnDelete - додаємо властивість btnDelete до елемента dialogWarm
//             dialogWarm.show();                              // відображаємо елемент dialogWarm
    
//             //btnToDelete.parentNode.parentNode.remove();
//         });
//     }


//     // Додаємо подію на кнопку зміни стасусу 
//     let btnStatus = document.querySelectorAll('.status');   // btnStatus - посилання на елементи button з класом status
//     for(let btn of btnStatus)                               // Проходимо по всіх елементах button з класом status
//     {   
//         btn.style.backgroundColor = 'green';                // Задаємо колір кнопки зеленим
//     }
//     for(let btn of btnStatus)                               // Проходимо по всіх елементах button з класом status
//     {
//         btn.addEventListener('click', () => {               // При кліку на елемент button з класом status
//             if(btn.style.backgroundColor == 'green')        // Якщо колір кнопки зелений
//             {
//                 btn.style.backgroundColor = 'gray';         // Задаємо колір кнопки сірим
//             }else if(btn.style.backgroundColor == 'gray')   // Якщо колір кнопки сірий
//             {
//                 btn.style.backgroundColor = 'green';        // Задаємо колір кнопки зеленим
//             }
//         });
//     }
// });



// /*обробка подій з ворнінгом*/
// let wnDiag = document.querySelector('.warning');            // wnDiag - посилання на елемент dialog з класом warning
// let btnWnOutDialog = document.querySelector('.warning > div > div > button');   // btnWnOutDialog - посилання на елемент button з класом div-plus
// btnWnOutDialog.addEventListener('click', () => {            // При кліку на елемент button з класом div-plus
//     wnDiag.close();                                         // приховуємо елемент dialog
// });

// let btnCancel2 = document.getElementById('cancel2');        // btnCancel2 - посилання на елемент button з id cancel2
// btnCancel2.addEventListener("click", () => {                // При кліку на елемент button з id cancel2
//     wnDiag.close();                                         // приховуємо елемент dialog
// });

// let btnWnOk = document.getElementById('wnOK');              // btnWnOk - посилання на елемент button з id wnOK
// btnWnOk.addEventListener('click', () => {                   // При кліку на елемент button з id wnOK
//     wnDiag.btnDelete.parentNode.parentNode.remove();        // Видаляємо рядок з таблиці
//     wnDiag.close();                                         // приховуємо елемент dialog
// });