import { classNames } from '@/lib/classNames';
import cls from './ReservationsContent.module.scss';
import { MainContainer } from '@/components/MainContainer';
import {useFetchReservations} from "@/components/ReservationsContent/api/fetchReservations";
import {Button} from "@/components/ui/Button";
import {addHours, format} from "date-fns";
import {ru} from "date-fns/locale";
import {useNavigate} from "react-router-dom";

interface ReservationsContentProps {
    className?: string;
}

export const ReservationsContent = (props: ReservationsContentProps) => {
    const { className } = props;

    const {data: ReservationsData, isLoading, isFetching} = useFetchReservations(null)

    const plansById: Record<number, string> = {
        1: 'Тариф - базовый',
        2: 'Тариф - стандрарт',
        3: 'Тариф - Все Включено (ВВК)',
    }

    const navigate = useNavigate()
    const onMoreClickHandler = (id: number) => () => {
        navigate(`/plans/${id}`)
    }

    if (isLoading) {
        return (
            <div className={classNames(cls.ReservationsContent, {}, [className])}>
                <MainContainer>
                    <div className={cls.ReservationInner}>
                        <h2 className={cls.ReservationsTitle}>Активные записи</h2>
                        <span></span>
                        <div className={cls.LoaderWrapper}><span className={cls.Loader}></span></div>
                    </div>
                </MainContainer>
            </div>
        )
    }

    if (!isLoading && !ReservationsData) {
        return (
            <div className={classNames(cls.ReservationsContent, {}, [className])}>
                <MainContainer>
                    <div className={cls.ReservationInner}>
                        <h2 className={cls.ReservationsTitle}>Активные записи</h2>
                        <p className={cls.ReservationNotFound}>Записей не найдено</p>
                    </div>
                </MainContainer>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ReservationsContent, {}, [className])}>
            <MainContainer>
                <div className={cls.ReservationInner}>
                    <h2 className={cls.ReservationsTitle}>Активные записи</h2>

                    <span></span>

                    <table className={cls.Table}>
                        <thead>
                        <tr className={cls.TableRow}>
                            <th className={cls.TablePlan}>Тариф</th>
                            <th className={cls.TableTime}>Время</th>
                            <th className={cls.TableDate}>Дата</th>
                            <th className={cls.TablePrice}>Стоимость</th>
                            <th className={cls.TableExtra}></th>
                        </tr>
                        </thead>
                        <tbody>
                            {ReservationsData && ReservationsData.map(reservation => (
                                <tr className={cls.TableRowData}>
                                    <td className={cls.TableElement}>{plansById[reservation.gamePlan.id]}</td>
                                    <td className={cls.TableElement}>{`${format(new Date(reservation.time), 'HH:mm')} - ${format(addHours(new Date(reservation.time), 2), 'HH:mm')}`}</td>
                                    <td className={cls.TableElement}>{format(new Date(reservation.time), 'dd MMM yyyy', { locale: ru })}</td>
                                    <td className={cls.TableElement}>{reservation.gamePlan.price}р</td>
                                    <td className={classNames(cls.TableElement, {}, [cls.TableButton])}><Button onClick={onMoreClickHandler(reservation.gamePlan.id)}>Подробнее</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MainContainer>
        </div>
    );
};
