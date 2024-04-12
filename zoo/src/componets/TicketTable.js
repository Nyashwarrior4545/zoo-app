import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const TicketTable = () => {
    const { user } = useAuthContext();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchUserTickets = async () => {
            try {
                const response = await fetch("/zoo/ticket/", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTickets(data.tickets);
                } else {
                    // Handle error
                }
            } catch (error) {
                console.error("Error fetching user tickets:", error);
            }
        };

        if (user) {
            fetchUserTickets();
        }
    }, [user]);

    const handleEdit = (ticketId) => {
        // Implement edit functionality
    };

    const handleDelete = async (ticketId) => {
        try {
            const response = await fetch(`/zoo/ticket/${ticketId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                // Remove the deleted ticket from the local state
                setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            } else {
                // Handle error
            }
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket.date}</td>
                            <td>{ticket.Type}</td>
                            <td>{ticket.Price}</td>
                            <td>
                                <Button onClick={() => handleEdit(ticket._id)}>Edit</Button>
                                <Button onClick={() => handleDelete(ticket._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;
