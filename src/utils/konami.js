// Utility for Konami code Easter egg
export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
];

export function listenForKonami(callback) {
  let input = [];
  window.addEventListener('keydown', (e) => {
    input.push(e.key);
    if (input.length > KONAMI_CODE.length) input.shift();
    if (KONAMI_CODE.every((k, i) => input[i] === k)) {
      callback();
      input = [];
    }
  });
}
