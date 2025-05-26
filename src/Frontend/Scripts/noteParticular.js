
window.NoteParticular = {
    render: function(id) {
        $('#main-frame').load("../Views/noteParticular.html", function() {
            console.log("Cargando nota con ID:", id);
            console.log("Notas disponibles:", MockNotes);

            note = MockNotes.find(note => note.id == id);
            if (note) {
                $('#note-title').text(note.name);
                $('#note-content').html(note.html);
            } else {
                $('#note-title').text("Nota no encontrada");
                $('#note-content').html("<p>La nota solicitada no existe.</p>");
            }
        });
    }
}