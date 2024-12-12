import { classNames } from '@/lib/classNames';
import cls from './LoginPage.module.scss';
import {Header} from "@/components/Header";
import {LoginForm} from "@/components/LoginForm";

interface LoginPageProps {
    className?: string;
}

export const LoginPage = (props: LoginPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>
            <Header/>
            <LoginForm/>
        </div>
    )
};
