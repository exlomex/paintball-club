import { classNames } from '@/lib/classNames';
import cls from './PlanPage.module.scss';
import {Header} from "@/components/Header";
import {PlanContent} from "@/components/PlanContent";
import {useSelector} from "react-redux";
import {getUserIsModalOpen} from "@/store/selectors/getUserValues";
import {Modal} from "@/components/ui/Modal";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {UserSliceActions} from "@/store/reducers/UserSlice";
import {PlanBooking} from "@/components/PlanBooking";

interface PlanPageProps {
    className?: string;
}

export const PlanPage = (props: PlanPageProps) => {
    const { className } = props;

    const isModalOpen = useSelector(getUserIsModalOpen)

    const dispatch = useAppDispatch()
    const onCloseHandler = () => {
        dispatch(UserSliceActions.setModalIsOpen(false))
    }

    return (
        <div className={classNames(cls.PlanPage, {}, [className])}>
            <Header/>
            <PlanContent/>
            <Modal isOpen={isModalOpen} onClose={onCloseHandler}>
                <PlanBooking/>
            </Modal>
        </div>
    )
};
