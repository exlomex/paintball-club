import { classNames } from '@/lib/classNames';
import cls from './Header.module.scss';
import {Link} from "react-router-dom";
import {MainContainer} from "@/components/MainContainer";
import {useSelector} from "react-redux";
import {getUserAuth} from "@/store/selectors/getUserValues";
import {Button} from "@/components/ui/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {UserSliceActions} from "@/store/reducers/UserSlice";

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    const navItems: {title: string, to: string}[] = [
        { title: 'Главная', to: '/' },
        { title: 'Тарифы', to: '/plans' }
    ]

    const AuthNavItems: {title: string, to: string}[] = [
        { title: 'Главная', to: '/' },
        { title: 'Тарифы', to: '/plans' },
        { title: 'Мои записи', to: '/reservations' },
    ]

    const isAuth = useSelector(getUserAuth)

    const dispatch = useAppDispatch()
    const onLogoutClickHandler = () => {
        dispatch(UserSliceActions.logout())
    }

    return (
        <div className={classNames(cls.Header, {}, [className])}>
            <MainContainer>
                <div className={cls.HeaderInner}>
                    <Link to={'/'} className={cls.Logo}>PAINTBALL</Link>

                    <div className={cls.HeaderRight}>
                        <nav className={cls.HeaderNavigation}>
                            {!isAuth ?
                                (
                                    navItems.map((item, index) => <Link key={index} to={item.to}>{item.title}</Link>)
                                ) : (AuthNavItems.map((item, index) => <Link key={index} to={item.to}>{item.title}</Link>))}
                        </nav>

                        {!isAuth ? <Button><Link to={'/login'} state={{ from: window.location.pathname }} className={cls.HeaderAuth}>Авторизация</Link></Button> : <Button onClick={onLogoutClickHandler}>Выйти</Button>}
                    </div>
                </div>
            </MainContainer>
        </div>
    )
};
