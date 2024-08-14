import React from 'react';
import { useTranslation } from 'react-i18next';

import type { VoiceCallOutgoingSession } from '../../../../../lib/voip/definitions';
import { Actions, CallContactID, Container, Footer, Header } from '../components';
import { useVoiceCallContactID } from '../hooks/useVoiceCallContactID';

export const VoiceCallOutgoingView = ({ session }: { session: VoiceCallOutgoingSession }) => {
	const { t } = useTranslation();
	const contactData = useVoiceCallContactID({ session });

	return (
		<Container data-testid='vc-popup-outgoing'>
			<Header>{`${t('Calling')}...`}</Header>

			<CallContactID {...contactData} />

			<Footer>
				<Actions onEndCall={session.end} />
			</Footer>
		</Container>
	);
};

export default VoiceCallOutgoingView;
