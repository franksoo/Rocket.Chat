import { css } from '@rocket.chat/css-in-js';
import {
	ButtonGroup,
	Button,
	Box,
	ToggleSwitch,
	States,
	StatesIcon,
	StatesTitle,
	Accordion,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldHint,
} from '@rocket.chat/fuselage';
import type { FeaturePreviewProps } from '@rocket.chat/ui-client';
import { useFeaturePreviewList } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import React, { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '../../../components/Page';

const handleEnableQuery = (features: FeaturePreviewProps[]) => {
	return features.map((item) => {
		if (item.enableQuery) {
			const expected = item.enableQuery.value;
			const received = features.find((el) => el.name === item.enableQuery?.name)?.value;
			if (expected !== received) {
				item.disabled = true;
				item.value = false;
			} else {
				item.disabled = false;
			}
		}
		return item;
	});
};
const AccountFeaturePreviewPage = () => {
	const t = useTranslation();
	const dispatchToastMessage = useToastMessageDispatch();
	const { features, unseenFeatures } = useFeaturePreviewList();

	const setUserPreferences = useEndpoint('POST', '/v1/users.setPreferences');

	useEffect(() => {
		if (unseenFeatures) {
			const featuresPreview = features.map((feature) => ({
				name: feature.name,
				value: feature.value,
			}));

			void setUserPreferences({ data: { featuresPreview } });
		}
	}, [setUserPreferences, features, unseenFeatures]);

	const {
		watch,
		formState: { isDirty },
		setValue,
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: { featuresPreview: features },
	});

	const { featuresPreview } = watch();

	const handleSave = async () => {
		try {
			await setUserPreferences({ data: { featuresPreview } });
			dispatchToastMessage({ type: 'success', message: t('Preferences_saved') });
		} catch (error) {
			dispatchToastMessage({ type: 'error', message: error });
		} finally {
			reset({ featuresPreview });
		}
	};

	const handleFeatures = (e: ChangeEvent<HTMLInputElement>) => {
		const updated = featuresPreview.map((item) => (item.name === e.target.name ? { ...item, value: e.target.checked } : item));
		setValue('featuresPreview', updated, { shouldDirty: true });
	};

	const grouppedFeaturesPreview = Object.entries(
		handleEnableQuery(featuresPreview).reduce((result, currentValue) => {
			(result[currentValue.group] = result[currentValue.group] || []).push(currentValue);
			return result;
		}, {} as Record<FeaturePreviewProps['group'], FeaturePreviewProps[]>),
	);

	return (
		<Page>
			<PageHeader title={t('Feature_preview')} />
			<PageScrollableContentWithShadow>
				<Box maxWidth='x600' w='full' alignSelf='center'>
					{featuresPreview.length === 0 && (
						<States>
							<StatesIcon name='magnifier' />
							<StatesTitle>{t('No_feature_to_preview')}</StatesTitle>
						</States>
					)}
					{featuresPreview.length > 0 && (
						<>
							<Box
								className={css`
									white-space: break-spaces;
								`}
								pbe={24}
								fontScale='p1'
							>
								{t('Feature_preview_page_description')}
							</Box>
							<Accordion>
								{grouppedFeaturesPreview?.map(([group, features], index) => (
									<Accordion.Item defaultExpanded={index === 0} key={group} title={t(group as TranslationKey)}>
										<FieldGroup>
											{features.map((feature) => (
												<Fragment key={feature.name}>
													<Field>
														<FieldRow>
															<FieldLabel htmlFor={feature.name}>{t(feature.i18n)}</FieldLabel>
															<ToggleSwitch
																id={feature.name}
																checked={feature.value}
																name={feature.name}
																onChange={handleFeatures}
																disabled={feature.disabled}
															/>
														</FieldRow>
														{feature.description && <FieldHint mbs={12}>{t(feature.description)}</FieldHint>}
													</Field>
													{feature.imageUrl && <Box is='img' width='100%' height='auto' mbs={16} src={feature.imageUrl} alt='' />}
												</Fragment>
											))}
										</FieldGroup>
									</Accordion.Item>
								))}
							</Accordion>
						</>
					)}
				</Box>
			</PageScrollableContentWithShadow>
			<PageFooter isDirty={isDirty}>
				<ButtonGroup>
					<Button onClick={() => reset({ featuresPreview: features })}>{t('Cancel')}</Button>
					<Button primary disabled={!isDirty} onClick={handleSubmit(handleSave)}>
						{t('Save_changes')}
					</Button>
				</ButtonGroup>
			</PageFooter>
		</Page>
	);
};

export default AccountFeaturePreviewPage;
