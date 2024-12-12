import { classNames } from '@/lib/classNames';
import cls from './RegisterPage.module.scss';
import {Header} from "@/components/Header";
import {RegisterForm} from "@/components/RegisterForm";

interface RegisterPageProps {
    className?: string;
}

export const RegisterPage = (props: RegisterPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.RegisterPage, {}, [className])}>
            <Header/>
            <RegisterForm/>
        </div>
    )
};
