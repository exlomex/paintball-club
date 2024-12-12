import { classNames } from '@/lib/classNames';
import cls from './PlansContent.module.scss';
import {MainContainer} from "@/components/MainContainer";
import {planDescriptions} from "@/const/planDescriptions";
import {Button} from "@/components/ui/Button";
import { useNavigate} from "react-router-dom";

interface PlansContentProps {
    className?: string;
}

export const PlansContent = (props: PlansContentProps) => {
    const { className } = props;

    const navigate = useNavigate()
    const onPlanClickHandler = (id: number) => () => {
        navigate(`/plans/${id}`, {replace: true})
    }

    return (
        <div className={classNames(cls.PlansContent, {}, [className])}>
            <MainContainer>
                <div className={cls.PlansInner}>
                    <h2 className={cls.PlansTitle}>Тарифы</h2>

                    <div className={cls.PlansWrapper}>
                        {planDescriptions.map((plan, index) => (
                            <div key={index} className={cls.PlanCard}>
                                <div className={cls.PlanUpperLine}>
                                    <span className={cls.PlanCount}>0{plan.id}</span>
                                    <h3 className={cls.PlanTitle}><span>{plan.title.split(' ')[0]}</span> <br/> {plan.title.split(' ')[1]}</h3>
                                </div>

                                <div className={cls.PlanFeatures}>
                                    {plan.features.map((feature, index) => (
                                        <div className={cls.PlanFeature} key={index}>{feature}</div>
                                    ))}
                                </div>

                                <div className={cls.PlanExtra}>
                                    <p className={cls.ExtraTitle}>Пейнтбольные шары:</p>
                                    <div className={cls.ExtraWrapper}><p>Коробка (2000 шт)</p>  <p>3500р</p></div>
                                </div>

                                <div className={cls.PlanPrice}>
                                    <h3>Цена</h3>
                                    <p>{plan.price}р</p>
                                </div>

                                <Button onClick={onPlanClickHandler(plan.id)} fullWidth className={cls.PlansButton}>Подробнее</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </MainContainer>
        </div>
    )
};
