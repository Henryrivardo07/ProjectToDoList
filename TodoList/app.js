//KUMPULKAN SEMUA UI ELEMENT

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

//Eventlistener, sebuah Api Dom yang dapat memberikan sebuah fungsionalitas agar element itu berfungsi, semisal, click submit dll
//p = pencet
//INI ADALAH EVENT LISTENER

immediateLoadEventListener();
function immediateLoadEventListener() {
  document.addEventListener("DOMContentLoaded", getTodos);

  //Artinya todoForm ketika ada sebuah submit, akan menjalankan function addTodo
  todoForm.addEventListener("submit", addTodo);
  //Artinya ketika Delete di clik menjalankan fungsi deleteButton
  todoList.addEventListener("click", deleteButton);
  //Artinya ketika DELETE DI CLIK AKAN MENJALANKAN CLEAR ALL BUTTON
  clearButton.addEventListener("click", clearAll);
  //ARTINYA MENCARI TEXT FILTER
  filterInput.addEventListener("keyup", filter);
}

//REUSABLE CODE

function createTodoElement(value) {
  const li = document.createElement("li");
  //2.membuat properti class, dalam li element
  li.className = "list-group-item d-flex justify-content-between align-items-center mb-1 todo-item";
  //3.membuat children kedalam element li = li.appendChild
  li.appendChild(document.createTextNode(value));
  //4.membuat children element a kedalam element li
  const a = document.createElement("a");
  //5.memberi properti untuk element a, dalam DOM ,properti akan menjadi objek
  a.href = "#";
  a.className = "badge badge-danger delete-button";
  a.innerHTML = "Delete";
  //6. menyatukan element li dan element a
  li.appendChild(a);

  //8.Memasukan element li yang telah dibuat dari javaScript kedalam element HTML todoList
  todoList.appendChild(li);
}

function getFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//INI ADALAH DOM FUNCTION
//MENDAPATAKAN TODOS DARI LOCAL STORAGE DAN TAMPILKAN
function getTodos() {
  const todos = getFromLocalStorage();
  //KARENA DI LOCAL STORAGE BENTUKAN ARRAY KITA BISA MUNCULIN 1 1 PAKE LOOPING FOR EACH

  todos.forEach((item) => {
    createTodoElement(item);
  });
}
//7. Membuat apa yang di tulis secara dynamic data (user yang ketik), dengan todoInput di virtual DOM, muncul di function todoList
//- Sebuah input yang di ketik akan menghasilkan properti, value(properti = objek), jadi di line li.appenChild(todoInput.value) artinya isi parameternya nilai objek dari todoInput.value, value sebagai key

//9.mendelete parent element dengan p yang artinya pencet
function addTodo(p) {
  //12.Menambahkan logic agar user tidak meninput value kosong
  p.preventDefault();
  if (todoInput.value) {
    // membuat virtual DOM, seperti halnya hardcode di html
    //1.Buat li element = document.createElement
    createTodoElement(todoInput.value);
    //INPUT YANG DIKETIK AKAN MASUK KE  VALUE LALU DIKIRIM KE CREATE TODO ELEMENT SETELAH ITU DI PROSES DAN DIMASUKAN LAGI KE DALAM FUNCTION
    addTodoLocalStorage(todoInput.value);
    todoInput.value = " ";
    //12.mereset ulang value dari objek todoInput dengan key value di reset

    //proses dari awal sampai akhir dimasukan di local storage, ini hoisting doang di pass ke function addToLocalStorage yang bawah
  } else {
    alert("Harap masukan isi");
  } //17 MEMBUAT SEMUA TASK YANG DIBUAT DI SIMPEN DI LOCAL STORAGE
}
// 18 menambahkan data yang telah dimasukan dalam function addTodo kedalam local data storage
function addTodoLocalStorage(todoInputValue) {
  // 19. membuat variabel yang menampung data nya dulu
  const todos = getFromLocalStorage();
  //KALO MAU TARO DI LOCAL STORAGE PAKE STRING

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
  /*
  Pada langkah nomor 3, ketika terdapat nilai yang tersimpan di local storage, nilai tersebut diambil menggunakan localStorage.getItem("todos"), kemudian dikonversi dari format JSON menjadi bentuk array JavaScript menggunakan JSON.parse(). Hal ini dilakukan agar data yang disimpan dalam local storage (yang awalnya disimpan dalam bentuk string JSON) dapat diolah sebagai array JavaScript.

Setelah nilai tersebut diubah ke dalam bentuk array JavaScript, kemudian nilai dari array tersebut dimasukkan ke dalam variabel todos menggunakan metode push(), sehingga data baru dapat ditambahkan ke dalam data yang sudah ada sebelumnya.

Setelah proses penambahan data selesai dilakukan, variabel todos yang sudah diperbarui akan dikonversi kembali ke dalam format JSON menggunakan JSON.stringify(todos). Ini dilakukan agar nilai todos dapat disimpan kembali ke dalam local storage sebagai string JSON menggunakan localStorage.setItem("todos", JSON.stringify(todos)). Dengan demikian, data yang sudah diperbarui akan tetap tersimpan di local storage.
*/
}

function deleteButton(p) {
  p.preventDefault();

  if (p.target.classList.contains("delete-button")) {
    //10.jika p pencet button dengan mengandung delete-button
    if (confirm("Apakah yakin akan menghapus?")) {
      //11.Membuat confirm apakah ingin menghapus
      const parent = p.target.parentElement;

      parent.remove();

      deleteFromLocalStorage(parent);
    }
  }
}

function deleteFromLocalStorage(deletedElement) {
  const todos = getFromLocalStorage(); //1,2,3,4,5

  // todos.forEach((todo, index) => {
  //   if (deletedElement.firstChild.textContent === todo) {
  //     todos.splice(index, 1);
  //   }
  // });

  todos.forEach(myFunction);

  function myFunction(todo, index) {
    //FOR EACH DEFAULT NGASIH 2 PARAMETER(VALUE , INDEX)
    if (deletedElement.firstChild.textContent === todo) {
      //contoh 5
      todos.splice(index, 1); //4,1 yang dihapus
    }
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAll() {
  todoList.innerHTML = "";
  clearAllTodo();
}

function clearAllTodo() {
  localStorage.clear();
}

//KALO VALUE DARI OBJEK FILTERINPUT.VALUE DIBANDINGKAN DENGAN LIST
function filter(p) {
  const filterText = filterInput.value.toLowerCase();
  //BISA JUGA PAKE p.target
  const todoItems = document.querySelectorAll(".todo-item");
  //14. KAYA VARIABEL ISINYA ARRAY, BARU NANTI DI LOOPING AGAR BISA DI CEK 1 1

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    //LOPPINGNYA DISINI DI CEK PER INDEX, DAN DIMASUKAN KE VAR BARU
    if (itemText.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display:block");
    } else {
      item.setAttribute("style", "display: none !important");
    }
  });
}
