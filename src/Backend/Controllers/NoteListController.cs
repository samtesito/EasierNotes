using backend.PuertaDB;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/notes")]
    public class NoteListController : Controller
    {
        private AppDbContext context;
        public NoteListController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Note>> Get()
        {
            return await context.Notes.ToListAsync();
        }

        [HttpGet("{id:int}", Name = "ObtenerNotaPorId")]
        public async Task<ActionResult<Note>> Get(long id)
        {
            var note = await context.Notes.FirstOrDefaultAsync(x => x.Id == id);
            if (note is null)
            {
                return NotFound();
            }
            return note;
        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post(Note note)
        {
            context.Add(note);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerNotaPorId", new { i = note.Id }, note);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, Note note)
        {
            var noteExists = await context.Notes.AnyAsync(x => x.Id == id);
            if (!noteExists)
            {
                return NotFound();
            }
            context.Update(note);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(long id)
        {
            var deletedNotes = await context.Notes.Where(x => x.Id == id).ExecuteDeleteAsync();
            if (deletedNotes == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}