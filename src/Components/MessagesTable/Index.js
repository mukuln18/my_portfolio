import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  color: #fff; /* Ensure text is visible on dark background */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
  color: #333; /* Darker text color */
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.accept ? 'green' : 'red'};

  &:hover {
    background-color: ${props => props.accept ? 'darkgreen' : 'darkred'};
  }
`;

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAccepted, setViewAccepted] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [viewAccepted]);

  const fetchMessages = async () => {
    try {
      const url = viewAccepted
        ? 'http://localhost:5000/view-acceptedMessages'
        : 'http://localhost:5000/view-allMessages';
      const response = await fetch(url);
      const data = await response.json();
      setMessages(data.message);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleAccept = async (id, email, name, message) => {
    try {
      const response = await fetch('http://localhost:5000/statusOfMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: id, status: 'accepted', Email: email, Name: name, Message: message }),
      });
      if (response.ok) {
        setMessages(messages.filter(msg => msg.ID !== id));
      } else {
        const errorData = await response.json();
        console.error('Error accepting message:', errorData.message);
      }
    } catch (error) {
      console.error('Error accepting message:', error);
    }
  };
  
  const handleReject = async (id, email, name, message) => {
    try {
      const response = await fetch('http://localhost:5000/statusOfMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: id, status: 'rejected', Email: email, Name: name, Message: message }),
      });
      if (response.ok) {
        setMessages(messages.filter(msg => msg.ID !== id));
      } else {
        const errorData = await response.json();
        console.error('Error rejecting message:', errorData.message);
      }
    } catch (error) {
      console.error('Error rejecting message:', error);
    }
  };
  

  const handleViewAcceptedMessages = () => {
    setViewAccepted(true);
  };

  const handleViewAllMessages = () => {
    setViewAccepted(false);
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>Messages</h1>
      <Button onClick={handleViewAcceptedMessages}>Accepted Messages</Button>
      <Button onClick={handleViewAllMessages}>All Messages</Button>
      {messages.length === 0 ? (
        <p>No {viewAccepted ? 'accepted' : 'pending'} messages</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Message</Th>
              {viewAccepted && <Th>Status</Th>}
              {!viewAccepted && <Th>Actions</Th>}
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.ID}>
                <Td>{msg.Email}</Td>
                <Td>{msg.Message}</Td>
                {viewAccepted && <Td>{msg.status === 'accepted' ? 'Accepted' : 'Pending'}</Td>}
                {!viewAccepted && (
                  <Td>
                    <Button accept onClick={() => handleAccept(msg.ID)}>Accept</Button>
                    <Button onClick={() => handleReject(msg.ID)}>Reject</Button>
                  </Td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MessagesTable;
