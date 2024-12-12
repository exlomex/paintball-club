import { classNames } from '@/lib/classNames';
import cls from './Footer.module.scss';
import {MainContainer} from "@/components/MainContainer";
import {Link} from "react-router-dom";

interface FooterProps {
    className?: string;
}

export const Footer = (props: FooterProps) => {
    const { className } = props;
    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <MainContainer>
                <div className={cls.FooterInner}>
                    <Link to={'/'} className={cls.Logo}>PAINTBALL</Link>

                    <div className={cls.FooterRight}>
                        <p><span>Телефон: </span>+7 (909) 906-77-33</p>
                        <p><span>e-mail: </span>8414065@gmail.com</p>
                    </div>
                </div>
            </MainContainer>
        </footer>
    )
};
