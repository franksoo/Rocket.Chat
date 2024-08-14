import '@testing-library/jest-dom';
import { mockAppRoot } from '@rocket.chat/mock-providers';
import { render, screen } from '@testing-library/react';
import React from 'react';

import VoiceCallTransferModal from './TransferModal';

it('should call onCancel when Cancel is clicked', () => {
	const confirmFn = jest.fn();
	const cancelFn = jest.fn();
	render(<VoiceCallTransferModal extension='1000' onConfirm={confirmFn} onCancel={cancelFn} />, {
		wrapper: mockAppRoot().build(),
	});

	screen.getByText('Cancel').click();

	expect(cancelFn).toHaveBeenCalled();
});

it('should call onCancel when X is clicked', () => {
	const confirmFn = jest.fn();
	const cancelFn = jest.fn();
	render(<VoiceCallTransferModal extension='1000' onConfirm={confirmFn} onCancel={cancelFn} />, {
		wrapper: mockAppRoot().build(),
	});

	screen.getByLabelText('Close').click();

	expect(cancelFn).toHaveBeenCalled();
});
