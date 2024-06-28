const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note .content");
    const titles = document.querySelectorAll(".note .title");
    const data = [];

    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;

        if (content.trim() !== "") {
            data.push({ title, content });
        }
    });

    const titlesData = data.map((item) => item.title);
    localStorage.setItem("titles", JSON.stringify(titlesData));

    const contentData = data.map((item) => item.content);
    localStorage.setItem("notes", JSON.stringify(contentData));
};

const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="icons">
            <i class="save fas fa-save" style="color:red"></i>
            <i class="trash fas fa-trash" style="color:yellow"></i>
        </div>
        <div class="title-div">
            <textarea class="title" placeholder="Write the title ...">${title}</textarea>
        </div>
        <textarea class="content" placeholder="Note down your thoughts ...">${text}</textarea>
    `;

    function handleTrashHover() {
        const deleteMsg = document.createElement("div");
        deleteMsg.classList.add("delete-msg");
        deleteMsg.textContent = "To Delete";
        delBtn.appendChild(deleteMsg);
    }

    function handleTrashClick() {
        note.remove();
        saveNotes();
        const deleteMsg = note.querySelector(".delete-msg");
        if (deleteMsg) {
            deleteMsg.remove();
        }
    }

    function handleSaveHover() {
        const saveMsg = document.createElement("div");
        saveMsg.classList.add("save-msg");
        saveMsg.textContent = "To Save";
        saveButton.appendChild(saveMsg);
    }

    function handleSaveClick() {
        saveNotes();
        const saveMsg = note.querySelector(".save-msg");
        if (saveMsg) {
            saveMsg.remove();
        }
    }

    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");

    delBtn.addEventListener("mouseenter", handleTrashHover);
    delBtn.addEventListener("mouseleave", () => {
        const deleteMsg = note.querySelector(".delete-msg");
        if (deleteMsg) {
            deleteMsg.remove();
        }
    });
    delBtn.addEventListener("click", handleTrashClick);

    saveButton.addEventListener("mouseenter", handleSaveHover);
    saveButton.addEventListener("mouseleave", () => {
        const saveMsg = note.querySelector(".save-msg");
        if (saveMsg) {
            saveMsg.remove();
        }
    });
    saveButton.addEventListener("click", handleSaveClick);

    main.appendChild(note);
    saveNotes();
};

function loadNotes() {
    const titlesData = JSON.parse(localStorage.getItem("titles")) || [];
    const contentData = JSON.parse(localStorage.getItem("notes")) || [];

    for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
        addNote(contentData[i], titlesData[i]);
    }
}

loadNotes();
addBtn.addEventListener("click", () => addNote());
