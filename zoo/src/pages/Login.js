import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row>
                <Col md={6}>
                    <Card style={{ width: '400px' }}> {/* Set a fixed width for the card */}
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control style = {{marginBottom: '20px'}} type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control style = {{marginBottom: '20px'}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    Login
                                </Button>

                                {error && <div className='error'>{error}</div>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;