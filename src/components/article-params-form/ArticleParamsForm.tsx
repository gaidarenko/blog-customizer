import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import type { FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

export type OnChange = (params: ArticleStateType) => void;

type ArticleParamsFormProps = {
	onChange: OnChange;
	initialValues: ArticleStateType;
};

export const ArticleParamsForm = ({
	onChange,
	initialValues,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [articleFontSize, setArticleFontSize] = useState<OptionType>(
		initialValues.fontSizeOption
	);
	const [articleFontColor, setArticleFontColor] = useState<OptionType>(
		initialValues.fontColor
	);
	const [articleFontFamily, setArticleFontFamily] = useState<OptionType>(
		initialValues.fontFamilyOption
	);
	const [articleBackgroundColor, setArticleBackgroundColor] =
		useState<OptionType>(initialValues.backgroundColor);
	const [articleContentWidth, setArticleContentWidth] = useState<OptionType>(
		initialValues.contentWidth
	);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			window.addEventListener('mousedown', handleClick);
		} else {
			window.removeEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isFormOpen]);

	function handleFontSizeChange(value: OptionType) {
		setArticleFontSize(value);
	}

	function handleFontColorChange(selected: OptionType) {
		setArticleFontColor(selected);
	}

	function handleFontFamilyChange(selected: OptionType) {
		setArticleFontFamily(selected);
	}

	function handleBackgroundColorChange(selected: OptionType) {
		setArticleBackgroundColor(selected);
	}

	function handleContentWidthChange(selected: OptionType) {
		setArticleContentWidth(selected);
	}

	function handleArrowClick() {
		setIsFormOpen(!isFormOpen);
	}

	function onReset() {
		setArticleFontFamily(defaultArticleState.fontFamilyOption);
		setArticleFontSize(defaultArticleState.fontSizeOption);
		setArticleFontColor(defaultArticleState.fontColor);
		setArticleBackgroundColor(defaultArticleState.backgroundColor);
		setArticleContentWidth(defaultArticleState.contentWidth);

		onChange(defaultArticleState);
	}

	function onApply(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const params: ArticleStateType = {
			fontFamilyOption: articleFontFamily,
			fontColor: articleFontColor,
			backgroundColor: articleBackgroundColor,
			contentWidth: articleContentWidth,
			fontSizeOption: articleFontSize,
		};

		onChange(params);
	}

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowClick} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isFormOpen,
				})}
				ref={rootRef}>
				<form className={styles.form} onSubmit={onApply} onReset={onReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleFontFamily}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='size'
						options={fontSizeOptions}
						selected={articleFontSize}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleFontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleBackgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleContentWidth}
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
