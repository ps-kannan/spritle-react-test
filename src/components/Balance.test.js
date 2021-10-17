import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Balance from './Balance';

afterEach(cleanup);

const setup = () => {
    const { getByTestId } = render(<Balance />);
    const input = getByTestId('inputAmount')
    const error = getByTestId('errorText')
    const addBtn = getByTestId('addBtn')
    const removeBtn = getByTestId('removeBtn')
    const balanceText = getByTestId('balanceText')
    return {
      input,
      error,
      addBtn,
      removeBtn,
      balanceText,
    }
  }

test('initial balance test', () => {
    const { balanceText,removeBtn,addBtn } = setup();

    expect(balanceText).toHaveTextContent('Balance:')
    expect(addBtn).not.toHaveAttribute('disabled')
    expect(removeBtn).toBeDisabled()
  });

