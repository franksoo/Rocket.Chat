import { Box, Icon } from '@rocket.chat/fuselage';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { VoiceCallErrorSession } from '../../../../../lib/voip/definitions';
import { Actions, CallContactID, Container, Footer, Header } from '../components';
import { useVoiceCallContactID } from '../hooks/useVoiceCallContactID';

export const VoiceCallErrorView = ({ session }: { session: VoiceCallErrorSession }) => {
	const { t } = useTranslation();
	const contactData = useVoiceCallContactID({ session });

	const { status } = session.error;

	const title = useMemo(() => {
		switch (status) {
			case 487:
				return t('Call_terminated');
			case 486:
				return t('Caller_is_busy');
			case 480:
				return t('Temporarily_unavailable');
			default:
				return t('Unable_to_complete_call');
		}
	}, [status, t]);

	return (
		<Container data-testid='vc-popup-error'>
			<Header hideSettings>
				<Box fontScale='p2' color='danger' fontWeight={700}>
					<Icon name='warning' size={16} /> {title}
				</Box>
			</Header>

			<CallContactID {...contactData} />

			<Footer>
				<Actions onEndCall={session.end} />
			</Footer>
		</Container>
	);
};

export default VoiceCallErrorView;
