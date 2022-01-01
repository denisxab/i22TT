import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { i22TT } from "../../../../../../../WebstormProjects/i22TT/AllTranslete";

i22TT.id_component(265)
{i22TT.get ("Приветмир 2") }
{i22TT.get("Приветмир1")}
{i22TT.get("Приветмир 3")}

function HomePage(props : any) {
	
	
	return (
		<div>
			{i22TT.get("Привет мир4")}
			<h1>{i22TT.get("Привет мир64")}</h1>
			{i22TT.get("Привет мир45",  62)}
			{i22TT.get("День мир")}
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
    "base_lange": "ru",
    "words": {
      "7652": [
        "День мир5",
        1,
        {
          "ru": "День мир5",
          "en": "qwr",
          "uk": "",
          "japan": "qer"
        }
      ],
      "9775": [
        "Приветмир1",
        1,
        {
          "ru": "Приветмир1",
          "en": "qwerw",
          "uk": "SFefwq",
          "japan": ""
        }
      ],
      "9809": [
        "Приветмир 2",
        1,
        {
          "ru": "Приветмир 2",
          "en": "qerqer",
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
    }
  }
}
----------------------
@ENDi22TT_MapTranslate*/
