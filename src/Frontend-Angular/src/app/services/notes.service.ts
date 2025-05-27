import { inject, Injectable } from '@angular/core';
import { Note } from '../models/Note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  constructor(){}
  private http = inject(HttpClient);
  private URLbase = "http://localhost:4200/api/notes";

  public obtainAll(): Observable<Note[]>{
    return this.http.get<Note[]>(this.URLbase);
  }

  public obtainById(id: number): Observable<Note>{
    return this.http.get<Note>('$(this.URLbase)/$(id)');
  }

  public create(note: Note){
    return this.http.post(this.URLbase, note);
  }

  public update(id: number, note:Note){
    return this.http.put('$(this.URLbase)/$(id)', note);
  }

  public delete(id: number){
    
  }

  readonly MockNotes: Note[] = [
    {
      Id: 1,
      Name: "Ideas para el proyecto de fin de curso",
      Html: `<p>Explorar una aplicación de notas offline usando IndexedDB.</p>
             <p>Investigar sobre sincronización con el backend cuando hay conexión.</p>
             <p>Agregar funcionalidad de etiquetas y búsqueda.</p>`,
      CategoryId: 1
    },
    {
      Id: 2,
      Name: "Receta: pan de banana casero",
      Html: `<p>Ingredientes: 3 bananas maduras, 1 taza de azúcar, 2 huevos, 2 tazas de harina, 1 cdita de polvo de hornear.</p>
             <p>Instrucciones: Mezclar ingredientes húmedos, luego secos. Hornear a 180°C por 45 minutos.</p>
             <p>Queda mejor con nueces picadas.</p>`,
      CategoryId: 1
    },
    {
      Id: 3,
      Name: "Resumen de la reunión del lunes",
      Html: `<p>Se acordó priorizar las funcionalidades del módulo de reportes.</p>
             <p>Julián se encargará de los mockups, y María del backend.</p>
             <p>Próxima reunión: viernes 10 AM. Enviar avances antes del jueves.</p>`,
      CategoryId: 1
    },
    {
      Id: 4,
      Name: "Checklist para el viaje a Mérida",
      Html: `<p>✅ Documentos personales</p>
             <p>✅ Ropa abrigada</p>
             <p>✅ Cámara y cargador</p>
             <p>⬜️ Dinero en efectivo</p>`,
      CategoryId: 1
    },
    {
      Id: 5,
      Name: "Libros pendientes para este mes",
      Html: `<p>- "El nombre del viento" (Patrick Rothfuss)</p>
             <p>- "La sombra del viento" (Carlos Ruiz Zafón)</p>
             <p>- "Piensa rápido, piensa despacio" (Daniel Kahneman)</p>`,
      CategoryId: 1
    },
    {
      Id: 6,
      Name: "Recordatorio: renovar licencia de conducir",
      Html: `<p>La licencia vence el 18 de junio.</p>
             <p>Pedir cita online con al menos 15 días de antelación.</p>
             <p>No olvidar llevar copia de cédula, RIF y una foto carnet.</p>`,
      CategoryId: 1
    },
    {
      Id: 7,
      Name: "Tareas del proyecto frontend",
      Html: `<p>- Conectar formulario de creación con API REST</p>
             <p>- Validar campos obligatorios con Bootstrap</p>
             <p>- Refactorizar código en notas.js</p>`,
      CategoryId: 1
    },
    {
      Id: 8,
      Name: "Ideas de contenido para redes sociales",
      Html: `<p>- Comparativa entre apps de productividad (Notion vs. Evernote)</p>
             <p>- Tutorial de cómo organizar tareas diarias con etiquetas</p>
             <p>- Video corto: “3 trucos para tomar mejores notas”</p>`,
      CategoryId: 1
    },
    {
      Id: 9,
      Name: "Notas de clase - Historia contemporánea",
      Html: `<p>La Segunda Guerra Mundial comenzó en 1939 con la invasión alemana a Polonia.</p>
             <p>Aliados vs. Potencias del Eje. Participación de EE.UU. a partir de 1941.</p>
             <p>Importancia de los tratados posteriores: ONU, OTAN, Guerra Fría.</p>`,
      CategoryId: 1
    },
    {
      Id: 10,
      Name: "Inspiración para escribir el blog",
      Html: `<p>¿Qué aprendí este mes desarrollando una app desde cero?</p>
             <p>Reflexiones sobre productividad, frustraciones, pequeños logros.</p>
             <p>Incluir capturas, ejemplos y métricas del backend.</p>`,
      CategoryId: 1
    }
  ];

}
