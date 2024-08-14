import { Box, IconButton } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import React from 'react';

type VoiceCallHeaderProps = {
	children: ReactNode;
	onClose?: () => void;
};

const VoiceCallHeader = ({ children, onClose }: VoiceCallHeaderProps) => {
	return (
		<Box is='header' p={12} pbe={4} display='flex' alignItems='center' justifyContent='space-between'>
			{children && (
				<Box is='h3' id='voiceCallPopupTitle' color='font-titles-labels' fontScale='p2' fontWeight='700'>
					{children}
				</Box>
			)}

			{onClose && <IconButton mini mis={8} icon='cross' onClick={onClose} />}
		</Box>
	);
};

export default VoiceCallHeader;
