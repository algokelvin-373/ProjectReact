## Step Implementation CSS Tailwindcss

**Langkah 1: Buat Project Baru (Pakai Template React + JS)**

```
npm create vite@latest my-chat-app -- --template react
cd my-chat-app
```

<b>Notes: </b>❌ Jangan pilih TypeScript — pilih React (JavaScript)

**Langkah 2: Install Dependensi**

```
npm install
```

**Langkah 3: Install Tailwind CSS v3 (Stabil & Aman)**

```
npm install -D tailwindcss@3 postcss autoprefixer
```

<b>Notes: </b>✅ @3 = versi stabil terakhir

**Langkah 4: Generate Konfigurasi (Otomatis Kompatibel)**

```
npx tailwindcss init -p
```

<b>Notes: </b> `tailwind.config.js` and `postcss.config.js` will be created automatically.

**Langkah 5: Edit File Konfigurasi (Pastikan Aman)**
`tailwind.config.js`

```
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`postcss.config.js`

```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Langkah 6: Siapkan CSS**
`src/index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/main.jsx`

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // ← HARUS ADA

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Langkah 7: [Hanya Untuk Testing]**

```
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">✅ Tailwind Berhasil!</h1>
        <p className="mt-2">Jika kamu melihat ini dengan latar biru → SEMUA BERHASIL!</p>
      </div>
    </div>
  );
}
```

**Langkah 8: Jalankan!**

```
npm run dev
```

## Result
<img src="[https://github.com/algokelvin-373/ProjectReact/tree/master/tailwindcss-test/ss/SS_1.png](https://github.com/algokelvin-373/ProjectReact/blob/master/tailwindcss-test/ss/SS_1.png)"/>
