import { ButtonGroup, IconButton } from '@rocket.chat/fuselage';
import React from 'react';
import { useTranslation } from 'react-i18next';

type VoiceCallActionsProps = {
	isDTMFActive?: boolean;
	isTransferActive?: boolean;
	isMuted?: boolean;
	isHeld?: boolean;
	onDTMF?: () => void;
	onEndCall?: () => void;
	onTransfer?: () => void;
	onDecline?: () => void;
	onMute?: (muted: boolean) => void;
	onHold?: (held: boolean) => void;
	onAccept?: () => void;
};

const VoiceCallActions = ({
	isMuted,
	isHeld,
	isDTMFActive,
	onDTMF,
	onTransfer,
	isTransferActive,
	onAccept,
	onDecline,
	onMute,
	onHold,
	onEndCall,
}: VoiceCallActionsProps) => {
	const { t } = useTranslation();

	return (
		<ButtonGroup large>
			{onDecline && (
				<IconButton
					mini
					danger
					secondary
					width={32}
					height={32}
					icon='phone-off'
					data-tooltip={t('Decline')}
					aria-label={t('Decline')}
					data-testid='vs-action-decline'
					onClick={() => onDecline()}
				/>
			)}

			<IconButton
				mini
				width={32}
				height={32}
				pressed={isMuted}
				icon='mic-off'
				aria-label={isMuted ? t('Turn_on_microphone') : t('Turn_off_microphone')}
				data-tooltip={isMuted ? t('Turn_on_microphone') : t('Turn_off_microphone')}
				data-testid='vs-action-toggle-mic'
				disabled={!onMute}
				onClick={() => onMute?.(!isMuted)}
			/>

			{!onAccept && (
				<IconButton
					mini
					width={32}
					height={32}
					pressed={isHeld}
					icon='pause-shape-unfilled'
					aria-label={isHeld ? t('Resume') : t('Hold')}
					data-tooltip={isHeld ? t('Resume') : t('Hold')}
					data-testid='vs-action-toggle-hold'
					disabled={!onHold}
					onClick={() => onHold?.(!isHeld)}
				/>
			)}

			<IconButton
				mini
				width={32}
				height={32}
				icon='dialpad'
				pressed={isDTMFActive}
				disabled={!onDTMF}
				aria-label={isDTMFActive ? t('Close_Dialpad') : t('Open_Dialpad')}
				data-tooltip={isDTMFActive ? t('Close_Dialpad') : t('Open_Dialpad')}
				data-testid='vs-action-toggle-dial-pad'
				onClick={() => onDTMF?.()}
			/>

			<IconButton
				mini
				icon='arrow-forward'
				width={32}
				height={32}
				aria-label={t('Transfer_call')}
				data-tooltip={t('Transfer_call')}
				data-testid='vs-action-transfer-call'
				pressed={isTransferActive}
				disabled={!onTransfer}
				onClick={() => onTransfer?.()}
			/>

			{onEndCall && (
				<IconButton
					mini
					secondary
					danger
					width={32}
					height={32}
					icon='phone-off'
					disabled={isHeld}
					aria-label={t('End_call')}
					data-tooltip={t('End_Call')}
					data-testid='vs-action-end-call'
					onClick={() => onEndCall()}
				/>
			)}

			{onAccept && (
				<IconButton
					mini
					success
					secondary
					width={32}
					height={32}
					icon='phone'
					aria-label={t('Accept')}
					data-tooltip={t('Accept')}
					onClick={() => onAccept()}
				/>
			)}
		</ButtonGroup>
	);
};

export default VoiceCallActions;
