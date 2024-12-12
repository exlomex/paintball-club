import { classNames } from '@/lib/classNames';
import cls from './Modal.module.scss';
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {ReactNode} from "react";

interface ModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void
    children?: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { className, isOpen, onClose, children } = props;

    return (
        <Dialog
            className={classNames(cls.Modal, {}, [className])}
            open={isOpen}
            onClose={onClose}
            as={'div'}
        >
            <DialogBackdrop className={cls.ModalInner} transition onClick={onClose}>
                <DialogPanel transition className={cls.ModalContent}>
                    <div>
                        {children}
                    </div>
                </DialogPanel>
            </DialogBackdrop>
        </Dialog>
    )
};
