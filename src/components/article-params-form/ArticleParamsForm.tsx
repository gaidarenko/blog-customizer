import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useState } from "react";
import clsx from 'clsx';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { OptionType, ArticleStateType, defaultArticleState } from 'src/constants/articleProps';
import type { FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onChange: Function;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [fontSize, setFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [fontFamily, setFontFamily] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);

	function handleFontSizeChange(value: OptionType) {
      setFontSize(value);
	}

	function handleFontColorChange(selected: OptionType) {
	  setFontColor(selected);
	}

	function handleFontFamilyChange(selected: OptionType) {
	  setFontFamily(selected);
	}

	function handleBackgroundColorChange(selected: OptionType) {
	  setBackgroundColor(selected);
	}

	function handleContentWidthChange(selected: OptionType) {
	  setContentWidth(selected);
	}

	function handleArrowClick() {
      setOpen(!isOpen);
	}

	function onReset() {
      setFontFamily(defaultArticleState.fontFamilyOption);
	  setFontSize(defaultArticleState.fontSizeOption);
	  setFontColor(defaultArticleState.fontColor);
	  setBackgroundColor(defaultArticleState.backgroundColor);
	  setContentWidth(defaultArticleState.contentWidth);

	  onChange(defaultArticleState);
	}

	function onApply(e: FormEvent<HTMLFormElement>) {
	  e.preventDefault();

      const params: ArticleStateType = {
        fontFamilyOption: fontFamily,
		fontColor: fontColor,
		backgroundColor: backgroundColor,
		contentWidth: contentWidth,
		fontSizeOption: fontSize
	  }

	  onChange(params);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside className={clsx({[styles.container]: true, [styles.container_open]: isOpen})}>
				<form className={styles.form} onSubmit={onApply}>
					<Text size={31} weight={800} uppercase>Задайте параметры</Text>
					<Select title='Шрифт' options={fontFamilyOptions} selected={fontFamily} onChange={handleFontFamilyChange} />
					<RadioGroup title='Размер шрифта' name='size' options={fontSizeOptions} selected={fontSize} onChange={handleFontSizeChange}/>
					<Select title='Цвет шрифта' options={fontColors} selected={fontColor} onChange={handleFontColorChange} />
					<Separator />
					<Select title='Цвет фона' options={backgroundColors} selected={backgroundColor} onChange={handleBackgroundColorChange}/>
					<Select title='Ширина контента' options={contentWidthArr} selected={contentWidth} onChange={handleContentWidthChange}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={onReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
