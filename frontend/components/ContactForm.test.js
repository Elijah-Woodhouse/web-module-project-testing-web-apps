import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

let input, submit, fakeEmail, fakefName, fakelName

beforeEach(() => {
  render(<ContactForm />)
  input = screen.queryByPlaceholderText("")
  submit = screen.getByText("Submit")
  fakeEmail = "blah@gmail.com"
  fakefName = "Robert"
  fakelName = "Smalls"
})

describe("<ContactForm />", () => {
  test('renders without errors', () => {
  });

test('renders the contact form header', () => {
  const contactFormHeader = screen.getByText(/contact form/i)
  expect(contactFormHeader).toBeInTheDocument()

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  const firstName = screen.getByLabelText(/First Name*/i)
  userEvent.type(firstName, "asd")

  const errorMsg = await screen.findAllByTestId("error")
  expect(errorMsg).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  const inputFields = screen.getAllByRole("textbox")
  userEvent.type(inputFields, "")
  userEvent.type(submit)
  const errormsgs = await screen.findAllByTestId("error")
  expect(errormsgs).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  const inputFields = screen.getAllByRole("textbox")
  userEvent.type(inputFields[0], `${fakefName}`)
  userEvent.type(inputFields[1], `${fakelName}`)
  userEvent.type(submit)
  const errormsg = await screen.findAllByTestId("error")
  expect(errormsg).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  const inputFields = screen.getAllByRole("textbox")
  const emailField = screen.getByLabelText("Email*")
  userEvent.type(emailField, "asdlk44")
  //userEvent.type(submit)
  const errormsg = await screen.findByText(/email must be a valid email address/i)

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  const lnameField = screen.getByLabelText(/last name*/i)
  userEvent.type(submit)
  const errormsg = await screen.findByText(/lastName is a required field/i)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  const inputFields = screen.getAllByRole("textbox")
  userEvent.type(inputFields[0], `${fakefName}`)
  userEvent.type(inputFields[1], `${fakelName}`)
  userEvent.type(inputFields[2], `${fakeEmail}`)
  userEvent.type(submit)  
  const firstName = screen.getByText(fakefName)
  const lastName = screen.getByText(fakefName)
  const Email = screen.getByText(fakeEmail)
  const message = screen.queryByText("Message:")
  expect(firstName).toBeInTheDocument()
  expect(lastName).toBeInTheDocument()
  expect(Email).toBeInTheDocument()
  expect(message).toBeNull()
});

test('renders all fields text when all fields are submitted.', async () => {
  const inputFields = screen.getAllByRole("textbox")
  const fakeMessage = "Ellijaliscjlkjelskfalvkjaksjjdlfkjaklsufhbvkasjd"
  userEvent.type(inputFields[0], `${fakefName}`)
  userEvent.type(inputFields[1], `${fakelName}`)
  userEvent.type(inputFields[2], `${fakeEmail}`)
  userEvent.type(inputFields[3], `${fakeMessage}`)
  userEvent.type(submit)  
  const firstName = screen.getByText(fakefName)
  const lastName = screen.getByText(fakefName)
  const Email = screen.getByText(fakeEmail)
  const message = screen.getByText(fakeMessage)
  expect(firstName).toBeInTheDocument()
  expect(lastName).toBeInTheDocument()
  expect(Email).toBeInTheDocument()
  expect(message).toBeInTheDocument()
});

})
