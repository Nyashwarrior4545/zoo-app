import {useState} from 'react';
import { useRegister } from '../hooks/useRegister';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { register, error, isLoading } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(name, email, password);
    };

    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center">
            <Row>
                <Col md={6}>
                    <Card style={{ width: '400px' }}> {/* Set a fixed width for the card */}
                        <Card.Body>
                            <Card.Title>Register</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    Submit
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
export default Register;