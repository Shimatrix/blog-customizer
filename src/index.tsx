import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState(defaultArticleState);
	const [styleState, setStyleState] = useState({});

	function changeStyle() {
		setStyleState({
			'--font-family': state.fontFamilyOption.value,
			'--font-size': state.fontSizeOption.value,
			'--font-color': state.fontColor.value,
			'--container-width': state.contentWidth.value,
			'--bg-color': state.backgroundColor.value,
		} as CSSProperties);
	}

	function resetStyle() {
		setStyleState({});
	}

	return (
		<div className={clsx(styles.main)} style={styleState}>
			<ArticleParamsForm
				articleState={state}
				setArticleState={setState}
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
