const INCOMPLETED_BOOKSHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOKSHELF_LIST_ID = "completeBookshelfList";
const BOOK_ITEM_ID = "itemid";

function addBuku() {
	

    const addTitle = document.getElementById("inputBookTitle").value;
    const addAuthor = document.getElementById("inputBookAuthor").value;
    const addYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const book = makeBookshelf(addTitle, addAuthor, addYear, isCompleted);
    const bookObject = composeBookObject(addTitle, addAuthor, addYear, isCompleted);

    book[BOOK_ITEM_ID] = bookObject.id;
    books.push(bookObject);


    if (isCompleted) {
    	const completedBookList = document.getElementById(COMPLETED_BOOKSHELF_LIST_ID);
    	const dataBukuSudah = makeBookshelf(addTitle, addAuthor, addYear, true);
    	completedBookList.append(dataBukuSudah);
    }else{
    	const incompletedBookList = document.getElementById(INCOMPLETED_BOOKSHELF_LIST_ID);
    	const dataBukuBelum = makeBookshelf(addTitle, addAuthor, addYear, false);
    	incompletedBookList.append(dataBukuBelum);
    }

    

    
    
    // incompletedBOOKList.append(belum);
    updateDataToStorage();
}


function makeBookshelf(judul, penulis, tahun, isCompleted) {
 
    const textMakeTitle = document.createElement("h3");
    textMakeTitle.innerText = judul;
 
    const textMakeAuthor = document.createElement("p");
    textMakeAuthor.innerText = penulis;

    const textMakeYear = document.createElement("p");
    textMakeYear.classList.add("makeYear");
    textMakeYear.innerText = tahun;
	
	const butContainer = document.createElement("div");
	butContainer.classList.add("action");
    
    const textContainer	 = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textMakeTitle, textMakeAuthor, textMakeYear);

	
	
 	if(isCompleted){
        butContainer.append(createUndoButton(), createDeleteButton());
    } else {
        butContainer.append(createCheckButton(), createDeleteButton());
    }
 	textContainer.append(butContainer);

    return textContainer;
}

function createButton(buttonTypeClass , eventListener, buttonText) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookCompleted(taskElement) {
	const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > p").innerText;
    const bookYear = taskElement.querySelector(".makeYear").innerText;
 
    const newBook = makeBookshelf(bookTitle, bookAuthor, bookYear, true);
    const listCompleted = document.getElementById(COMPLETED_BOOKSHELF_LIST_ID);

    const book = findBook(taskElement[BOOK_ITEM_ID]);
    book.isCompleted = true;
    newBook[BOOK_ITEM_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
} 

function createCheckButton() {
    return createButton("green", function(event){
         addBookCompleted(event.target.parentElement.parentElement);
    }, "Sudah Dibaca");
}

function removeBookFromCompleted(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEM_ID]);
    books.splice(bookPosition, 1);
    taskElement.remove();
    updateDataToStorage();
}

function createDeleteButton() {
    return createButton("red", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
    }, "Hapus");
}

function undoFromCompleted(taskElement){
    const listIncompleted = document.getElementById(INCOMPLETED_BOOKSHELF_LIST_ID);
    const bookTitleUndo = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthorUndo = taskElement.querySelector(".book_item > p").innerText;
    const bookYearUndo = taskElement.querySelector(".makeYear").innerText;
 
    const newUndo = makeBookshelf(bookTitleUndo, bookAuthorUndo, bookYearUndo, false);

    const book = findBook(taskElement[BOOK_ITEM_ID]);
    book.isCompleted = false;
    newBook[BOOK_ITEM_ID] = book.id;
 
    listIncompleted.append(newUndo);
    taskElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", function(event){
        undoFromCompleted(event.target.parentElement.parentElement);
    }, "Belum selesai dibaca");
}