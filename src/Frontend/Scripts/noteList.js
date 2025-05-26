
window.NoteList = {

    render: function() {
        $('#main-frame').load("../Views/noteList.html", function() {
            const notes = MockNotes;
            console.log("Notas cargadas:", notes);

            for (const note of notes) {
                const noteItem = `
                    <li class="my-5">
                        <h3>${note.name}</h3>
                        <a href="#/note/${note.id}">Ver Detalles<a/>
                    </li>
                `;
                $('#notes-list').append(noteItem);
            }
        });
    }

    
}