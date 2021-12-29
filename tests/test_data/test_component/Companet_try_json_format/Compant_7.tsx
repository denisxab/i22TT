
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { i22TT } from "../../../../../../../WebstormProjects/i22TT/AllTranslete";

i22TT.id_components(265)
{i22TT.get ("Приветмир 2") }
{i22TT.get("Приветмир1")}
{i22TT.get("Приветмир 3")}

function HomePage(props : any) {
	
	
	return (
		<div>
			{i22TT.get("Привет мир4")}
			<h1>{i22TT.get("Привет мир64")}</h1>
			{i22TT.get("Привет мир45",  62)}
			{i22TT.get("День мир5")}
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
  "id_components": 265,
  "base_lange": "en",
  "words": {
    "7643": [
      "День мир5",
      1,
      {
        "ru": "",
        "en": "День мир5",
        "uk": "",
        "japan": ""
      }
    ],
    "9765": [
      "Приветмир1",
      1,
      {
        "ru": "",
        "en": "Приветмир1",
        "uk": "",
        "japan": ""
      }
    ],
    "9798": [
      "Приветмир 2",
      1,
      {
        "ru": "",
        "en": "Приветмир 2",
        "uk": "",
        "japan": ""
      }
    ],
    "9799": [
      "Приветмир 3",
      1,
      {
        "ru": "",
        "en": "Приветмир 3",
        "uk": "",
        "japan": ""
      }
    ],
    "9800": [
      "Привет мир4",
      1,
      {
        "ru": "",
        "en": "Привет мир4",
        "uk": "",
        "japan": ""
      }
    ],
    "9854": [
      "Привет мир64",
      1,
      {
        "ru": "",
        "en": "Привет мир64",
        "uk": "",
        "japan": ""
      }
    ],
    "10597": [
      "Привет мир45",
      62,
      {
        "ru": "",
        "en": "Привет мир45",
        "uk": "",
        "japan": ""
      }
    ]
  }
}
----------------------
@ENDi22TT_MapTranslate*/