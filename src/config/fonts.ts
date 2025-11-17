/**
 * List of available font names (visit the url `/settings/appearance`).
 * This array is used to generate dynamic font classes (e.g., `font-inter`, `font-manrope`).
 *
 * 📝 How to Add a New Font (Tailwind v4+):
 * 1. Add the font name here.
 * 2. update the styles.css file to include the new font.
 * 3. update the @theme inline section in the styles.css file to include the new font.
 * 4. update the utilities section in the styles.css file to include the new font.
 *
 * Example:
 * fonts.ts           → Add 'roboto' to this array.
 * styles.css         → Add the new font in the CSS, e.g.:
 * @theme inline {
 *    // ... other font families
 *    --font-roboto: 'Roboto', var(--font-sans);
 * }
 * utilities          → Add the new font in the utilities section, e.g.:
 *   .font-roboto {
 *     font-family: var(--font-roboto);
 *   }
 */
export const fonts = [
  'system',
  'roboto',
  'noto-sans-sc',
  'noto-serif-sc',
  'borel',
] as const
