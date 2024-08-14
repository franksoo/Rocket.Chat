import React from 'react';
import { useTranslation } from 'react-i18next';

import type { VoiceCallIncomingSession } from '../../../../../lib/voip/definitions';
import { Actions, CallContactID, Container, Footer, Header } from '../components';
import { useVoiceCallContactID } from '../hooks/useVoiceCallContactID';

export const VoiceCallIncomingView = ({ session }: { session: VoiceCallIncomingSession }) => {
	const { t } = useTranslation();
	const contactData = useVoiceCallContactID({ session });

	return (
		<Container data-testid='vc-popup-incoming'>
			<Header>{`${session.transferedBy ? t('Incoming_call_transfer') : t('Incoming_call')}...`}</Header>

			<CallContactID {...contactData} />

			<Footer>
				<Actions onAccept={session.accept} onDecline={session.end} />
			</Footer>
		</Container>
	);
};

export default VoiceCallIncomingView;
