import { classNames } from '@/lib/classNames';
import cls from './PlanContent.module.scss';
import {useParams} from "react-router-dom";
import {MainContainer} from "@/components/MainContainer";
import React, {useEffect} from "react";
import Human from '@/assets/planImage.png'
import {planDescriptions} from "@/const/planDescriptions";
import {Button} from "@/components/ui/Button";
import {useSelector} from "react-redux";
import {getUserAuth} from "@/store/selectors/getUserValues";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {UserSliceActions} from "@/store/reducers/UserSlice";


interface PlanContentProps {
    className?: string;
}

export const PlanContent = (props: PlanContentProps) => {
    const { className } = props;

    const { id } = useParams();

    const extraPlanContent: {title: string, price: string}[] = [
        {title: 'Маска термальная', price: '500р'},
        {title: 'Защита головы и шеи', price: '350р'},
        {title: 'Маркер электронный', price: '4000р'},
    ]

    function getValidId(id: string | undefined) {
        if (id === undefined) return 1
        const numId = parseInt(id, 10);

        if (isNaN(numId) || numId < 1 || numId >= 4) {
            return 1;
        } else {
            return numId;
        }
    }

    const validId = getValidId(id);

    const currentPlan = planDescriptions.filter(plan => plan.id === validId)[0]
    useEffect(() => {
        dispatch(UserSliceActions.setCurrentPlanInfo(currentPlan))
    }, [currentPlan]);

    const isAuth = useSelector(getUserAuth)

    const dispatch = useAppDispatch()
    const onPreBookingButtonClickHandler = () => {
        dispatch(UserSliceActions.setModalIsOpen(true))
    }

    return (
        <div className={classNames(cls.PlanContent, {}, [className])}>
            <MainContainer>
                <div className={cls.PlanInner}>
                    <h2 className={cls.PlanTitle}>
                        <span>{currentPlan.title.split(' ')[0]}</span>{currentPlan.title.split(' ')[1]}
                    </h2>

                    <div className={cls.PlanContentWrapper}>
                        <div className={cls.PlanLeftContent}>
                            <div className={cls.PlanImage}>
                                <img src={Human} alt="human"/>
                            </div>

                            <div className={cls.PlanExtra}>
                                <h2 className={cls.PlanExtraTitle}>Доп. услуги</h2>

                                <div className={cls.PlanExtraWrapper}>
                                    {extraPlanContent.map((extraValue, index) => (
                                        <p key={index} className={cls.PlanExtraElement}>{extraValue.title}
                                            <span>{extraValue.price}</span></p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={cls.PlanRightContent}>
                            <h3 className={cls.FeaturesTitle}>Особенности тарифа</h3>

                            <div className={cls.PlanFeatures}>
                                {currentPlan.features.map((feature, index) => (
                                    <div className={cls.PlanFeature} key={index}>{feature}</div>
                                ))}
                            </div>

                            <div className={cls.PlanExtra}>
                                <p className={cls.ExtraTitle}>Пейнтбольные шары:</p>
                                <p className={cls.ExtraDescription}><span>Коробка (2000 шт)</span> <span>3500р</span></p>
                            </div>

                            <Button onClick={onPreBookingButtonClickHandler} fullWidth disabled={!isAuth}>Записаться</Button>
                            {!isAuth && <p className={cls.bookingError}>Запись доступна только авторизированным
                                пользователям </p>}
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    )
};
