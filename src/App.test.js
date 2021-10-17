import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

const setup = () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('inputAmount')
  const error = getByTestId('errorText')
  const addBtn = getByTestId('addBtn')
  const removeBtn = getByTestId('removeBtn')
  const balanceText = getByTestId('balanceText')
  const nodata = getByTestId('nodata')
  return {
    input,
    error,
    addBtn,
    removeBtn,
    balanceText,
    nodata
  }
}

test('initial App test', () => {
  const { balanceText } = setup();
  expect(balanceText).toHaveTextContent('Balance: 0')
});
test('initial Transaction test', () => {
  const { nodata } = setup();
  expect(nodata).toHaveTextContent('No Transactions')
});
test('Add Amount Error Test',()=>{
  const { input,addBtn,error } = setup();
  fireEvent.change(input, {target: {value: ''}})
  expect(input.value).toBe('')
  fireEvent.click(addBtn)
  expect(error).toHaveTextContent('Please Enter Amount');
});

test('Remove Amount Error Test',()=>{
  const { input,addBtn,error,removeBtn } = setup();
  fireEvent.change(input, {target: {value: 40}})
  fireEvent.click(addBtn)
  expect(removeBtn).not.toHaveAttribute('disabled')
  fireEvent.change(input, {target: {value: ''}})
  fireEvent.click(removeBtn)
  expect(error).toHaveTextContent('Please Enter Amount');
  fireEvent.change(input, {target: {value: 50}})
  expect(input.value).toBe('50')
  fireEvent.click(removeBtn)
  expect(error).toHaveTextContent('Please Remove Less Than Balance Amount');
});

test('Add Amount Test',()=>{
  const { input,addBtn,error,balanceText } = setup();
  fireEvent.change(input, {target: {value: 40}})
  expect(input.value).toBe("40")
  fireEvent.click(addBtn)
  expect(error).toHaveTextContent('');
  expect(balanceText).toHaveTextContent('Balance: 40')
});

test('Remove Amount Test',()=>{
  const { input,addBtn,error,balanceText,removeBtn } = setup();
  fireEvent.change(input, {target: {value: 40}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 30}})
  fireEvent.click(removeBtn)
  expect(error).toHaveTextContent('');
  expect(balanceText).toHaveTextContent('Balance: 10')
});
