window.Router = {

  init: function () {
    $(window).on('hashchange', this.handle);
    this.handle(); //Carga inicial de la ruta
  },

  handle: function () {
    // Se obtiene el hash del path
    const hash = window.location.hash;

    if(hash.match(/^#\/note\/(\d+)$/)){ 
        const id = hash.split('/')[2];
        NoteParticular.render(id);
        return;

    } else {
        //Por defecto, se carga la lista de notas
        NoteList.render();
        return;
    }

  }
};
