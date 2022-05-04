import tw, { styled } from 'twin.macro';

export const HighlightText = () => [
  tw`px-1 font-light transition-colors duration-150 ease-linear rounded-sm bg-unhovered hover:bg-hovered dark:hover:bg-hovered-dark dark:hover:text-white dark:bg-unhovered-dark`,
];

export const LinkButton = styled.a(() => [...HighlightText()]);
