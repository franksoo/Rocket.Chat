import React, { useState } from 'react';

import type { VoiceCallOngoingSession } from '../../../../../lib/voip/definitions';
import { Actions, CallContactID, Container, DialPad, Header, Timer, Status, Footer } from '../components';
import { useVoiceCallContactID } from '../hooks/useVoiceCallContactID';
import useVoiceCallTransferModal from '../hooks/useVoiceCallTransferModal';

export const VoiceCallOngoingView = ({ session }: { session: VoiceCallOngoingSession }) => {
	const { startTransfer } = useVoiceCallTransferModal({ session });
	const contactData = useVoiceCallContactID({ session, transferEnabled: false });

	const [isDialPadOpen, setDialerOpen] = useState(false);
	const [dtmfValue, setDTMF] = useState('');

	const handleDTMF = (value: string, digit: string) => {
		setDTMF(value);
		if (digit) {
			session.dtmf(digit);
		}
	};

	return (
		<Container secondary data-testid='vc-popup-ongoing'>
			<Header>
				<Timer />
			</Header>

			<Status isMuted={session.isMuted} isHeld={session.isHeld} />

			<CallContactID {...contactData} />

			{isDialPadOpen && <DialPad value={dtmfValue} longPress={false} onChange={handleDTMF} />}

			<Footer>
				<Actions
					isMuted={session.isMuted}
					isHeld={session.isHeld}
					isDTMFActive={isDialPadOpen}
					onMute={session.mute}
					onHold={session.hold}
					onEndCall={session.end}
					onTransfer={startTransfer}
					onDTMF={() => setDialerOpen(!isDialPadOpen)}
				/>
			</Footer>
		</Container>
	);
};

export default VoiceCallOngoingView;
