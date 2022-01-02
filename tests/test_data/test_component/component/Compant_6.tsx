import React from 'react';

import {Col, Container, Row} from 'react-bootstrap';
import {i22TT} from '/home/denis/WebstormProjects/i22TT/AllTranslete.ts';

i22TT.id_component(22, 'en');

{
	i22TT.get(`Заголовок`,1,9700);
}
{
	i22TT.get(`Вступление`,1);
}
{
	i22TT.get(`Имя сайта`,1,8680);
}

function HomePage(props: any) {
	return (
		<div>
			{i22TT.get(`Сделай это`,1,9765)}
			{i22TT.get(`Сделай это`,1,9765)}
			{i22TT.get(`Сделай это`,1)}
			{i22TT.get(`Сделай это`,3,9765)}
			{i22TT.get(`Сделай это`,2,9775)}
			<h1>{i22TT.get(`Информация`,1,10842)}</h1>
			{i22TT.get(`Регистрация`,1,11915)}
			{i22TT.get(`Входы`,1,5401)}
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

/*@i22TT_MapTranslate
----------------------
{
  "22": {
    "base_lang": "en",
    "words": {
      "5401": [
        "Входы",
        1,
        {
          "ru": "Входы",
          "en": "Enter",
          "uk": "Вiды",
          "japan": ""
        }
      ],
      "8680": [
        "Имя сайта",
        1,
        {
          "ru": "Имя сайта",
          "en": "Name site",
          "uk": "",
          "japan": "ASDD!231"
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
          "en": "Just do it",
          "uk": "",
          "japan": ""
        }
      ],
      "9775": [
        "Сделай это",
        2,
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