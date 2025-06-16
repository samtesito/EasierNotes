using backend.Models;
using backend.PuertaDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/notes")]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NotesController> _logger;

        public NotesController(AppDbContext context, ILogger<NotesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Note>>> GetAll()
        {
            _logger.LogInformation("GET api/notes called");
            var notes = await _context.Notes.ToListAsync();
            _logger.LogInformation("Returning {Count} notes", notes.Count);
            return Ok(notes);
        }

        [HttpGet("{id:long}", Name = "GetNoteById")]
        public async Task<ActionResult<Note>> GetById([FromRoute] long id)
        {
            _logger.LogInformation("GET api/notes/{Id} called", id);
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                _logger.LogWarning("Note with id {Id} not found", id);
                return NotFound();
            }
            _logger.LogInformation("Returning note {@Note}", note);
            return Ok(note);
        }

        [HttpPost]
        public async Task<ActionResult<Note>> Create([FromBody] Note note)
        {
            _logger.LogInformation("POST api/notes called with {@Note}", note);
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Created note with id {Id}", note.Id);

            return CreatedAtRoute("GetNoteById", new { id = note.Id }, note);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(
            [FromRoute] long id,
            [FromBody] Note noteDto)
        {
            _logger.LogInformation("PUT api/notes/{Id} called with {@NoteDto}", id, noteDto);

            if (id != noteDto.Id)
            {
                _logger.LogWarning("URL id ({UrlId}) does not match body id ({BodyId})", id, noteDto.Id);
                return BadRequest("El ID de la URL y del payload no coinciden.");
            }

            var existing = await _context.Notes.FindAsync(id);
            if (existing == null)
            {
                _logger.LogWarning("Note with id {Id} not found", id);
                return NotFound();
            }

            // Actualizamos solo los campos permitidos
            existing.Name       = noteDto.Name;
            existing.Html       = noteDto.Html;
            // Si quisieras actualizar la categoría:
            // existing.CategoryId = noteDto.CategoryId;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated note with id {Id}", id);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error saving changes for note {Id}", id);
                throw; // o return StatusCode(500, "Error al guardar la nota");
            }

            return NoContent();
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            _logger.LogInformation("DELETE api/notes/{Id} called", id);

            var existing = await _context.Notes.FindAsync(id);
            if (existing == null)
            {
                _logger.LogWarning("Note with id {Id} not found", id);
                return NotFound();
            }

            _context.Notes.Remove(existing);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Deleted note with id {Id}", id);

            return NoContent();
        }
    }
}
