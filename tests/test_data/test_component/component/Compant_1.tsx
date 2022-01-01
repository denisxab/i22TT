import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { i22TT } from "../../../../../../../WebstormProjects/i22TT/AllTranslete";

i22TT.id_component(22,'ru')
{i22TT.get( " сон и сосны \t ")}
{ i22TT.get ("Дом") }
{i22TT.get("Мебель и стены")}
{ i22TT.get (" Паркет ") }
{i22TT.get( " сон и сосны \t ")}
{i22TT.get("День и ноч 3" )}

function HomePage(props : any) {
	
	i22TT.get ("Дым и  ")
	i22TT.get("Как тут тестить код")
	return (
		<div>
			{i22TT.get("Привет мир4")}
			<h1>{i22TT.get("Привет мир64",1,231)}</h1>
			{i22TT.get("Привет мир45",  62, 123123)}
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