# Как пользоваться

## Как создать шаблон перевода текста

Для начала вам нужно выполнить требования к написанию компонента

---

Требования:

- В каждом компоненте должен быть `id`, чтобы объявить `id` компонента необходимо вызвать функцию `i22TT.id_component()`
  ,опционально вы можете переопределить базовый язык перевода - это значит что текст который вы напишете в `i22TT.get()`
  будет сразу подставлен в перевод на базовый язык

  ```tsx


  import React from 'react';
  
  import {Col, Container, Row} from 'react-bootstrap';
  import {i22TT} from '/home/denis/WebstormProjects/i22TT/AllTranslete.ts';
  
  // Указываем `id`, и при редкой необходимости можем переопределять базовый язык
  i22TT.id_component(22, 'ru');
  
  {/* Указваю слова которое необходимо добавить в перевод */}
  i22TT.get(`Заголовок`);
  i22TT.get(`Вступление`);
  i22TT.get(`Имя сайта`);
  
  function HomePage(props: any) {
      return (
          <div>
              {/* Указваю слова которое необходимо добавить в перевод */}
              {i22TT.get(`Сделай это`)}
              <h1>{i22TT.get(`Информация`)}</h1>
              {i22TT.get(`Регистрация`)}
              {i22TT.get(`Вход`)}
              <Container>
                  <Row>
                      <Col>1 of 2</Col>
                      <Col>2 of 2</Col>a
                  </Row>
                  <Row>
                      <Col>1 of 3</Col>
                      <Col>2 of 3</Col>
                      <Col>3 of 3</Col>
                  </Row>
              </Container>
          </div>
      );
  }
  
  export default HomePage;
  ```
  Пример вывода
  ```tsx  
  /*@i22TT_MapTranslate
  ----------------------
  {
    "22": {
      "base_lang": "ru",
      "words": {
        "4301": [
          "Вход",
          1,
          {
            "ru": "Вход",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "8680": [
          "Имя сайта",
          1,
          {
            "ru": "Имя сайта",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "9700": [
          "Заголовок",
          1,
          {
            "ru": "Заголовок",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "9765": [
          "Сделай это",
          1,
          {
            "ru": "Сделай это",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "10811": [
          "Вступление",
          1,
          {
            "ru": "Вступление",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "10842": [
          "Информация",
          1,
          {
            "ru": "Информация",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ],
        "11915": [
          "Регистрация",
          1,
          {
            "ru": "Регистрация",
            "en": "",
            "uk": "",
            "japan": ""
          }
        ]
      }
    }
  }
  ----------------------
  @ENDi22TT_MapTranslate*/

  ```

- Для того чтобы создать шаблон с переводом текста необходимо установить `ts-node`

  ```bash
  npm install --save ts-node @types/node
  ```

---

## Использование

- Получить отформатированный компонент. Первым позиционным аргументом нужно передать абсолютный путь к компоненту, или
  вы можете указать его через аргумент `--component`
  ```bash
  ts-node parse_component.ts --component ПутьК_Файлу.tsx
  ```

- Для того чтобы сохранить результат в текущий компонент, добавите аргумент `--save`
  ```bash
  ts-node parse_component.ts --component ПутьК_Файлу.tsx --save
  ```
  