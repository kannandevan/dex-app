import react from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function TokenLists() {
    const [tokenLists, setTokenLists] = useState([]);

    useEffect(() => {
        axios.get('https://api.dexscreener.com/token-profiles/latest/v1')
            .then(response => {
                const data = response.data;
                console.log(data);
                const tokenData = data.map((token) => ({
                    icon: token.icon,
                    url: token.url,
                    name: axios.get(`https://api.dexscreener.com/token-pairs/v1/${token.chainId}/${token.tokenAddress}`)
                        .then(res => 
                             res.data.map(pair => pair.baseToken.name)[0] || 'Unknown Token'  // Get the first token name or 'Unknown Token' if not found
                        )
                        .catch(err => {
                            console.error('There was an error fetching the token name!', err);
                        })

                }));
                setTokenLists(tokenData);
                console.log(tokenData);

            })
            .catch(error => {
                console.error('There was an error fetching the token lists!', error);
            });
    }, []);

    return (
        <Container>
            <Row>
                {tokenLists.map((token, index) => (
                    <Col key={index} md={3}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{token.name}</Card.Title>
                                {/* <Card.Text>{token.description}</Card.Text> */}
                                <img src={token.icon} alt={token.name} className="img-fluid mb-3" />
                                <Button variant="primary" target="_blank" href={token.url}>View Token</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TokenLists;