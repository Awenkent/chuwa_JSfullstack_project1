import {render, screen,cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from "../features/auth"

import '@testing-library/jest-dom'
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
afterEach(cleanup);
import App from '../App'

/* */
test('loads and displays title(signin)', async () => {
  // ARRANGE
  render(<Auth case="signin"/>)
  // ACT
  const title = screen.getByRole("title")
  // ASSERT
  expect(title).toHaveTextContent('Sign in to your account')
})


test('loads and displays title(signup)', async () => {
  // ARRANGE
  render(<Auth case="signup"/>)
  // ACT
  const title = screen.getByRole("title")
  // ASSERT
  expect(title).toHaveTextContent('Sign up an account')
})

test('loads and displays title(signup)', async () => {
  // ARRANGE
  render(<Auth case="change-password"/>)
  // ACT
  const title = screen.getByRole("title")
  // ASSERT
  expect(title).toHaveTextContent('Change Password')
})

it("should take a snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});

