# Как пользоватся

## Как создать шаблон перевода текста

Для начала ввам нужно выполнить требования к написанию компанента

---

Требования к написанию компанента:

- В каждом компаненте должен быть `id`, чтобы обявить `id` компанента необходимо вызвать функцию `i22TT.id_components()`
  ,опцианально вы можете переобределить базовый язык перевода - это значит что текст который вы напишете в `i22TT.get()`
  будет сразу подставлен в перевод на базовый язык

  ```tsx
  import React from 'react';
  import { i22TT } from "i22TT/AllTranslete";
  
  // Обявляем `id` и переопредеям базовый язык
  i22TT.id_components(22, 'ru')
  
  function HomePage(props : any) {
      return (
          <div>
              {/* Указваю слова которое необходимо добавить в перевод */}
              {i22TT.get("Привет мир", 1)}
          </div>
      );
  }
  
  export default HomePage;
  ```

---

Для того чтобы создать шаблон с переводом текста необходимо:

- Установить `ts-node`
  ```bash
  npm install --save ts-node `@types/node'
  ```

- Запусть скрипт. Первым аргументом нужно передать абсолютный путь к компаненту
  ```bash
  ts-node Ne.ts $ПутьК_Файлу$.tsx
  ```