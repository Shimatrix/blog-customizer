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
	defaultArticleState
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	changeStyle: () => void;
	resetStyle: () => void;
};

export const ArticleParamsForm = ({state, setState, changeStyle, resetStyle}: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	function handleClick() {
		setIsOpen((prevState) => !prevState);
	};

	function handleChangeFontFamily(value: OptionType) {
		setState({...state, fontFamilyOption: value});
	}

	function handleChangeFontSize(value: OptionType) {
		setState({...state, fontSizeOption: value});
	}

	function handleChangeFontColor(value: OptionType) {
		setState({...state, fontColor: value});
	}

	function handleChangeBackgroundColor(value: OptionType) {
		setState({...state, backgroundColor: value});
	}

	function handleChangeContentWidth(value: OptionType) {
		setState({...state, contentWidth: value});
	}

	function handleSetStyle(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		changeStyle();
	};

	function handleResetStyle() {
		setState(defaultArticleState);
		resetStyle();
	};

	useOutsideClickClose({isOpen: isOpen, rootRef: formRef, onClose: () => setIsOpen(false), onChange: setIsOpen});

	return (
		<>
			<ArrowButton onClick={handleClick} state={isOpen} />
			<aside className={clsx(styles.container, {[styles.container_open]: isOpen})} ref={formRef}>
				<form className={styles.form} onSubmit={handleSetStyle}>
					<Text as={"h2"} size={31} weight={800} uppercase>Задайте параметры</Text>
					<Select selected={state.fontFamilyOption} options={fontFamilyOptions} title={'Шрифт'} onChange={handleChangeFontFamily} />
					<RadioGroup selected={state.fontSizeOption} options={fontSizeOptions} name={'Размер шрифта'} title={'Размер шрифта'} onChange={handleChangeFontSize} />
					<Select selected={state.fontColor} options={fontColors} title={'Цвет шрифта'} onChange={handleChangeFontColor} />
					<Separator />
					<Select selected={state.backgroundColor} options={backgroundColors} title={'Цвет фона'} onChange={handleChangeBackgroundColor} />
					<Select selected={state.contentWidth} options={contentWidthArr} title={'Ширина контента'} onChange={handleChangeContentWidth} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetStyle} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
