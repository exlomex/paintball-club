import cls from './Button.module.scss'
import {ButtonHTMLAttributes, ReactNode} from "react";
import {classNames, Mods} from "@/lib/classNames";

type OmittedBtnType = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>

interface ButtonProps extends OmittedBtnType{
    className?: string,
    children?: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    fullWidth?: boolean;
}
export const Button = (props: ButtonProps) => {
    const {className, children, onClick, disabled, fullWidth} = props

    const mods: Mods = {
        [cls.FullWidthButton]: fullWidth,
        [cls.DisabledButton]: disabled
    }

    return (
        <button className={classNames(cls.Button, mods, [className])} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

