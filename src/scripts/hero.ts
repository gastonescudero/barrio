const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const WORDS = ['plomero', 'electricista', 'jardinero', 'pintor', 'técnico de aire'];
const SCRIPT: ['' | 'me', string][] = [
  ['', '¿Querés servicio completo o solo una consulta?'],
  ['me', 'Servicio completo, por favor'],
  ['', '¿Para cuándo lo necesitás?'],
  ['me', 'Mañana a la tarde'],
  ['', 'Listo. Hay 3 plomeros verificados cerca tuyo.'],
];

function rotateWord() {
  const el = document.getElementById('word');
  if (!el || reduce()) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % WORDS.length;
    el.textContent = WORDS[i];
  }, 2400);
}

function runChat() {
  const chat = document.getElementById('chat');
  if (!chat) return;
  const add = (who: string, text: string) => {
    const d = document.createElement('div');
    d.className = `m ${who}`.trim();
    d.textContent = text;
    chat.appendChild(d);
  };
  if (reduce()) {
    SCRIPT.forEach(([w, t]) => add(w, t));
    return;
  }
  const step = (i: number) => {
    if (i >= SCRIPT.length) {
      setTimeout(() => { chat.innerHTML = ''; step(0); }, 5000);
      return;
    }
    const [who, text] = SCRIPT[i];
    if (who === 'me') {
      setTimeout(() => { add(who, text); step(i + 1); }, 900);
      return;
    }
    const dots = document.createElement('div');
    dots.className = 'dots';
    dots.innerHTML = '<i></i><i></i><i></i>';
    chat.appendChild(dots);
    setTimeout(() => { dots.remove(); add(who, text); step(i + 1); }, 1100);
  };
  step(0);
}

export function startHero() {
  rotateWord();
  runChat();
}
