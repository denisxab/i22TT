import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { i22TT } from "../../../../../../../WebstormProjects/i22TT/AllTranslete";

i22TT.id_component(265)
{i22TT.get(`Приветмир 2`,1,9809) }
{i22TT.get(`Приветмир1`,1,9775)}
{i22TT.get(`Приветмир 3`,1,9810)}

function HomePage(props : any) {
	
	
	return (
		<div>
			{i22TT.get(`Привет мир4`,1,9811)}
			<h1>{i22TT.get(`Привет мир64`,1,9866)}</h1>
			{i22TT.get(`Привет мир45`,62,10597)}
			{i22TT.get(`День мир`,1,7598)}
			<Container>
				<Row>
					<Col>1 of 2</Col>
					<Col>2 of 2</Col>
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
  "265": {
    "base_lang": "ru",
    "words": {
      "7598": [
        "День мир",
        1,
        {
          "ru": "День мир",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "9775": [
        "Приветмир1",
        1,
        {
          "ru": "Приветмир1",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "9809": [
        "Приветмир 2",
        1,
        {
          "ru": "Приветмир 2",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "9810": [
        "Приветмир 3",
        1,
        {
          "ru": "Приветмир 3",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "9811": [
        "Привет мир4",
        1,
        {
          "ru": "Привет мир4",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "9866": [
        "Привет мир64",
        1,
        {
          "ru": "Привет мир64",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ],
      "10597": [
        "Привет мир45",
        62,
        {
          "ru": "Привет мир45",
          "en": "",
          "uk": "",
          "japan": ""
        }
      ]
    },
    "path_component": "/home/denis/WebstormProjects/i22TT/tests/test_data/test_marge/Compant_3.tsx"
  }
}
----------------------
@ENDi22TT_MapTranslate*/