//KUMPULKAN SEMUA UI ELEMENT( Coolection UI ELEMENT WITH DOM API)
//NGAMBIL ELEMENT DI HTML BUAT DI PROSES LINE NO 3
const todoForm = document.querySelector("#todo-form"); //ngambil id todo-form
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todolist = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

//INI ADALAH KUMPULAN EVENT LISTENER
//EVENT addEventListener ADALAH SEBUAH DOM API, YANG DAPAT MEMBUAT FUNSIONALITAS DALAM SEBUAH ELEMENT, YANG MEMBUAT WEB LEBIH INTERAKTIF

immediateLoadEvenetListener();
function immediateLoadEvenetListener() {
  //MENDAPATKAN TODOS DARI LOCALSTORAGE DAN RENDER DI BROWSER
  document.addEventListener("DOMContentLoaded", getTodos); //KETIKA DI REFRESH AKAN MENJALANKAN SEBUAH FUNCTION

  //INI ADALAH EVENT UNTUK MENAMBAHKAN TODO
  todoForm.addEventListener("submit", addTodo);
  //INI ADALAH EVENT UNTUK MENGHAPUS TODO
  todolist.addEventListener("click", deleteTodo);
  //INI ADALAH EVENT UNTUK MENGHAPUS SEMUA TODO
  clearButton.addEventListener("click", deleteAllTodo);
  //INI ADALAH EVENT UNTUK MENFILTER TODO
  filterInput.addEventListener("keyup", filterLists);
}

//REUSABLE CODE
function createTodoElement(value) {
  //MEMBUAT LI ELEMENT, dari API DOM, YAITU MEMBUAT LI DI HTML TANPA HARDCODE,YAITU LEWAT JAVASCRIPT
  const li = document.createElement("li"); // li ELEMENT BERBENTUK OBJEK
  //MENAMBAHKAN CLASS PADA ELEMENT LI
  li.className = "list-group-item d-flex justify-content-between align-items-center mb-1 todo-item";
  //MENAMBAHKAN CHILDREN KE DALAM ELEMENT LI
  li.appendChild(document.createTextNode(value));
  //USER MASUKIN TEXT SENDIRI
  //KENAPA todoInput.value karena OBJEK KALO GA ADA PROPERTINYA BUAT OBJEK BARU

  //MEMBUAT DELETE BUTTON
  const a = document.createElement("a");

  //MEMBERI PROPERTI UNTUK a ELEMENT
  a.href = "#";
  a.className = "badge badge-danger delete-todo";

  //MEMASUKAN CHILD BISA PALE appendChild atau innerHTML, BEDANYA KALO append dimasuk ke sebelahnnya kalo inner html mengganti semua
  a.innerHTML = "Delete";

  //MENYELIPKAN ELEMENT A KEDALAM ELEMENT CHILDREN LI
  li.appendChild(a);
  //MEMASUKAN ELEMENT LI YANG TELAH DIBUAT DENGAN JAVASCRIPT KE DALAM ELEMET TODOLIST
  todolist.appendChild(li); //GA PAKE INNER KARENA BIAR GA HAPUS "VALUE DARI TASK INPUT"
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

//JAVASCRIPT HOISTING

//INI ADALAH DOM FUNCTION

function getTodos() {
  const todos = getItemFromLocalStorage();
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
  //program menjalankan forEach pada array todos, setiap elemen dalam array tersebut akan diteruskan sebagai argumen ke fungsi callback createTodoElement. Dengan demikian, hasil dari createTodoElement
}

function addTodo(e) {
  e.preventDefault(); //preventDefault BEHAVIOR AGAR TIDAK REFRESH PAGE, KALO PAGE DI INPUT
  if (todoInput.value) {
    //KONDISI KALO ADA VALUE
    createTodoElement(todoInput.value); //HASIL INPUTAN DI BROWSER, AKAN DI JALANKAN DI FUNCTION createTodoElement()

    addTodoLocalStorage(todoInput.value);
    todoInput.value = "";

    /*todoInput.value = "", Anda mengatur nilai properti value dari elemen todoInput menjadi string kosong, sehingga mengosongkan isian input
     */
    //MENRECREATE HTML DENGAN VANILLA JAVASCRIPT(DOM API)
  } else {
    alert("BELOM MASUKAN TEXT");
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();
  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos)); //DIDALAM LOCAL STORAGE VALUE HARUS BERUPA STRING
}

function deleteTodo(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete-todo")) {
    if (confirm("APAKAH YAKIN AKAN MENGHAPUS?")) {
      //KOMFIRMASI USER

      const parent = e.target.parentElement;

      parent.remove();

      deleteTodoLocalStorage(parent);
    }
    //TAPI KEHAPUSNYA HANYA DI SEMENTARA, KARENA element li di tulis di hardcode HTML, DAN DIHAPUSNYA DI DOM
  }
}

function deleteTodoLocalStorage(deletedElement) {
  let todos = getItemFromLocalStorage(); //MENGHAPUS ELEMENT PARENT 4 YAITU (li)

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllTodo() {
  //YANG INI GA BUTUH ELEMENT KARENA LANGSUNG SATU BLOK DI HAPUS
  if (confirm("ALL CLEAR?")) {
    todolist.innerHTML = "";
  }
  clearTodosLocalStorage();
}

// function clearTodos() {
//   todolist.innerHTML = "";
//
// }

function clearTodosLocalStorage() {
  localStorage.clear();
}

function filterLists(e) {
  const filterText = e.target.value.toLowerCase(); //KETIKAN PENCARI
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    // INI DAPATNYA DARI PENGAMBILAN LINE 79 DIMANA CLASS NYA DI AMBIL PAKE querySelectorALL
    const itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(filterText) !== -1) {
      // APAKAH YANG DIKETIK DILINE 78 ADA GA DI LINE 82
      item.setAttribute("style", "display:block");
    } else {
      item.setAttribute("style", "display:none !important");
    }
    console.log(itemText);
  });
  // console.log(todoItems);
}
