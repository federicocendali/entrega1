// EJERCICIO
class TicketManager {
  #precioBaseDeGanancia = 0.15;
  constructor() {
    this.eventos = [];
  }

  static id = 0;

  getEventos() {
    return this.eventos;
  }

  agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
    TicketManager.id += 1;
    const evento = {
      id: TicketManager.id,
      nombre,
      lugar,
      precio,
      capacidad,
      fecha,
      participantes: [],
    };
    this.eventos.push(evento);
  }

  #getEvento(eventoId) {
    return this.eventos.find((evento) => evento.id === eventoId);
  }

  agregarUsuario(eventoId, usuarioId) {
    const evento = this.#getEvento(eventoId);
    if (evento) {
      if (!evento.participantes.includes(usuarioId)) {
        evento.participantes.push(usuarioId);
      }
    }
  }

  ponerEventoEnGira(eventoId, nuevaLocalidad, nuevaFecha) {
    TicketManager.id += 1;
    const evento = this.#getEvento(eventoId);
    if (evento) {
      const nuevoEvento = {
        ...evento,
        id: TicketManager.id,
        localidad: nuevaLocalidad,
        fecha: nuevaFecha,
      };
      this.eventos.push(nuevoEvento);
    }
  }
}

const ticketManager = new TicketManager();

ticketManager.agregarEvento('Recital de Arjona', 'Luna Park', 200, 10000);
ticketManager.agregarUsuario(1, 2);
ticketManager.agregarUsuario(1, 3);
ticketManager.agregarUsuario(1, 4);

ticketManager.agregarEvento('Recital de Mana', 'River Plate', 300, 10000);
const eventos = ticketManager.getEventos();
console.log(eventos);

// https://docs.google.com/presentation/d/1FJBmpiiweu7_GWpMI239H-YWmQLEJ1nmeyCWdluDL2o/preview?slide=id.g124cbfe83dc_4_8
