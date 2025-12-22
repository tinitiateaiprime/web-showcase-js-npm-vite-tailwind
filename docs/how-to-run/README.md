
---

# 🖥️ 2. Open Folder in VS Code

1. Open VS Code  
2. Click **File → Open Folder**  
3. Select the folder you created  
4. Click **OK**

---

# 📦 3. Initialize NPM

Open terminal inside VS Code:

### Project Creation

```sh
# Create a new Vite project with React template
npm create vite@latest js-npm-vite-tailwind 
```
# Navigate to the project directory
```sh
cd js-npm-vite-tailwind
```

### Installing Dependencies

```sh
# Install necessary dependencies
npm install
```
```js
# Install Tailwind CSS
```sh
npm install tailwindcss @tailwindcss/vite
```

- Add the @tailwindcss/vite plugin to your Vite configuration.

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

- Add an @import to your CSS file that imports Tailwind CSS.

```js
CSS
@import "tailwindcss";
```

### Run your build process with npm run dev or whatever command is configured in your package.json file.

```sh
npm run dev
```

