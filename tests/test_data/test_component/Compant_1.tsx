import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { i22TT } from "../../../../../../../WebstormProjects/i22TT/AllTranslete";

i22TT.id_component(22,'ru')
{i22TT.get(`Приветмир 2`,1,9809) }
{i22TT.get(`Приветмир1`,1,9775)}
{i22TT.get(`Приветмир 3`,1,9810)}

function HomePage(props : any) {
	
	
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