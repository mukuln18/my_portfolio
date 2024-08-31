import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SubmissionMessage = styled.div`
  font-size: 16px;
  color: ${({ success }) => (success ? 'green' : 'red')};
  margin-top: 10px;
`;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const formRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Email: formRef.current.Email.value,
      Name: formRef.current.Name.value,
      Phone: formRef.current.Phone.value,
      Subject: formRef.current.Subject.value,
      Message: formRef.current.Message.value,
    };

    const missingFields = [];
    if (!formData.Email) missingFields.push('Email');
    if (!formData.Name) missingFields.push('Name');
    if (!formData.Phone) missingFields.push('Phone');
    if (!formData.Subject) missingFields.push('Subject');

    if (missingFields.length > 0) {
      setValidationMessage(`${missingFields.join(', ')} cannot be empty`);
      setTimeout(() => setValidationMessage(''), 3000); 
      return;
    } else if (!validateEmail(formData.Email)) {
      setValidationMessage('Invalid email format');
      setTimeout(() => setValidationMessage(''), 3000); 
      return;
    } else if (!validatePhoneNumber(formData.Phone)) {
      setValidationMessage('Invalid phone number format');
      setTimeout(() => setValidationMessage(''), 3000); 
      return;
    } else {
      setValidationMessage('');
    }

    setIsSubmitting(true);
    setSubmissionMessage('');

    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error(errorData.message);
        } else {
          throw new Error('Network response was not ok');
        }
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data.message);
      setSubmissionMessage('Form submitted successfully!');
      setSubmissionSuccess(true);
      setTimeout(() => {
        setSubmissionMessage('');
        setSubmissionSuccess(false);
      }, 3000); 
      formRef.current.reset();
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setSubmissionMessage(error.message);
      setSubmissionSuccess(false);
      setTimeout(() => setSubmissionMessage(''), 3000); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={formRef} onSubmit={handleSubmit}>
          <ContactTitle>Enter Details!</ContactTitle>
          <ContactInput placeholder="Your Email" name="Email" />
          <ContactInput placeholder="Your Name" name="Name" />
          <ContactInput placeholder="Your Phone Number" name="Phone" />
          <ContactInput placeholder="Subject" name="Subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="Message" />
          {validationMessage && <div style={{ color: 'red' }}>{validationMessage}</div>}
          <ContactButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send'}
          </ContactButton>
          {submissionMessage && (
            <SubmissionMessage success={submissionSuccess}>
              {submissionMessage}
            </SubmissionMessage>
          )}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
