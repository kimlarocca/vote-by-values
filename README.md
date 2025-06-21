# Wocky Words 🎯

A daily portmanteau puzzle game inspired by Wordle, where players combine two words to form a single "Wocky Word" (portmanteau).

NODE VERSION: 22.14.0

## 🎮 How to Play

1. **Read the Clues**: Each puzzle provides two clues for the "Wordponents" (component words)
2. **Guess the Wocky Word**: Combine the answers to form a portmanteau
3. **Get Feedback**: Letters are color-coded like Wordle:
   - 🟩 **Green**: Correct letter in correct position
   - 🟨 **Yellow**: Letter is in the word but wrong position
   - ⬜ **Gray**: Letter is not in the word
4. **Use Hints**: Get hints to reveal random letters
5. **Win**: Solve the puzzle in 5 attempts or less!

## 🎯 Game Features

- **Daily Puzzles**: New portmanteau challenge every day
- **Hint System**: Unlimited hints that reveal random letters
- **Responsive Design**: Works on desktop and mobile
- **Dark Mode Support**: Automatic theme detection
- **Keyboard Support**: Use physical or virtual keyboard
- **Animations**: Smooth letter animations and feedback
- **Accessibility**: Screen reader friendly with proper focus states

## 🔧 Technical Stack

- **Framework**: Nuxt 3 with Vue.js
- **Styling**: Tailwind CSS with custom SCSS
- **Data**: JSON-based puzzle database
- **Features**: TypeScript support, composables architecture

## 🎪 Example Puzzles

- **Clue 1**: "The first meal of the day (9)" → **breakfast**
- **Clue 2**: "An informal meal in the middle of the day (5)" → **lunch**
- **Wocky Word**: **brunch** (6 letters)

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

View the styleguide on `http://localhost:3000/styleguide`

## 📁 Project Structure

```
├── pages/
│   └── index.vue              # Main game page
├── composables/
│   └── useWockyWords.ts       # Game logic composable
├── assets/scss/
│   └── _wocky-words.scss      # Custom game styles
├── public/
│   └── portmanteaus.json      # Puzzle data
└── components/               # Reusable Vue components
```

## 🎨 Game Data Format

```json
{
  "portmanteau": "brunch",
  "word1": "breakfast",
  "clue1": "the first meal of the day",
  "word2": "lunch",
  "clue2": "an informal meal in the middle of the day",
  "category": "food",
  "real": true,
  "date": "2025-06-20"
}
```

## 🌟 Features

- **Smart Date Selection**: Automatically selects daily puzzles based on date
- **Game State Management**: Clean separation of logic via composables
- **Responsive Grid**: Dynamic letter grid based on word length
- **Visual Feedback**: Color-coded letters with smooth animations
- **Hint System**: Progressive letter revelation
- **Game Statistics**: Track attempts and hints used
- **Social Sharing**: Ready for social media integration

## 🎯 Future Enhancements

- [ ] Share results feature
- [ ] Statistics tracking across days
- [ ] Difficulty levels
- [ ] Custom puzzle creation
- [ ] Multiplayer mode
- [ ] Achievement system

---

**Wocky Words** - Where words collide! 🎪

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# wocky-words
