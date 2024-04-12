import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleState, setStyleState] = useState({});

	function changeStyle(styleState = defaultArticleState) {
		setStyleState({
			'--font-family': styleState.fontFamilyOption.value,
			'--font-size': styleState.fontSizeOption.value,
			'--font-color': styleState.fontColor.value,
			'--container-width': styleState.contentWidth.value,
			'--bg-color': styleState.backgroundColor.value,
		} as CSSProperties);
	}

	function resetStyle() {
		setStyleState({});
	}

	return (
		<div className={clsx(styles.main)} style={styleState}>
			<ArticleParamsForm
				defaultState={defaultArticleState}
				changeStyle={changeStyle}
				resetStyle={resetStyle}
			/>
			<Article styleState={styleState} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
