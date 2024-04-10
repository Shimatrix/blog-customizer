import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleProps = {
	articleState: typeof defaultArticleState;
	setArticleState: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
	changeStyle: () => void;
	resetStyle: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	changeStyle,
	resetStyle,
}: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	function handleClick() {
		setIsOpen((prevState) => !prevState);
	}

	function handlecChangeStyles(value: OptionType, property: string) {
		setArticleState({ ...articleState, [property]: value });
	}

	function handleSetStyle(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		changeStyle();
	}

	function handleResetStyle() {
		setArticleState(defaultArticleState);
		resetStyle();
	}

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton onClick={handleClick} state={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSetStyle}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) => handlecChangeStyles(value, 'fontFamilyOption')}
					/>
					<RadioGroup
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						name={'Размер шрифта'}
						title={'Размер шрифта'}
						onChange={(value) => handlecChangeStyles(value, 'fontSizeOption')}
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) => handlecChangeStyles(value, 'fontColor')}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) => handlecChangeStyles(value, 'backgroundColor')}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(value) => handlecChangeStyles(value, 'contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetStyle} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
