
namespace backend.Models
{

    public class RepositoryNote
    {
        public void save(Note note)
        {
            List<Note> allNotes = new List<Note>();//cambiar por: = notas en el servidor
            allNotes.Add(note);
            // Servidor = allNotes
        }

        public void delete(Note note)
        {
            List<Note> allNotes = new List<Note>();//cambiar por: = notas en el servidor
            allNotes.Remove(note);
            // Servidor = allNotes
        }

        public List<Note> findAll()
        {
            List<Note> allNotes =  new List<Note>();//cambiar por: = notas en el servidor
            return allNotes;
        }
    }
}