import React from 'react';
import {Container, Row, Col, CardGroup, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Button} from 'reactstrap';

const CourseHistory = (props) => {
    return(
        <Container>
        <Row>
            <Col><br/>
            <CardGroup>
            <Card>
                <CardImg
                alt="Card image cap"
                src="https://picsum.photos/318/180"
                top
                width="100%"
                />
                <CardBody color="danger"
                outline>
                <CardTitle tag="h5">
                    PREVIOUS
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Card subtitle
                </CardSubtitle>
                <CardText>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <Button>
                    Button
                </Button>
                </CardBody>
            </Card>
                <Card>
                    <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/318/180"
                    top
                    width="100%"
                    />
                    <CardBody color="danger"
                outline>
                    <CardTitle tag="h5">
                        CURRENT
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </CardSubtitle>
                    <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                    </CardText>
                    <Button>
                        Button
                    </Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/318/180"
                    top
                    width="100%"
                    />
                    <CardBody color="danger"
                outline>
                    <CardTitle tag="h5">
                        FUTURE
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </CardSubtitle>
                    <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                    </CardText>
                    <Button>
                        Button
                    </Button>
                    </CardBody>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>
    )
}

export default CourseHistory;