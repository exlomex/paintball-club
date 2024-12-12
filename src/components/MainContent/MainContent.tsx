import { classNames } from '@/lib/classNames';
import cls from './MainContent.module.scss';
import {Header} from "@/components/Header";
import {MainContainer} from "@/components/MainContainer";
import MainBG from '@/assets/mainBG.jpg'
import MainPerson from '@/assets/person.png'
import {Button} from "@/components/ui/Button";
import {useNavigate} from "react-router-dom";
import React, {ReactElement} from "react";
import AboutFirst from '@/assets/aboutFirst.png'
import AboutSecond from '@/assets/AboutSecond.png'
import AboutHelmets from '@/assets/helmets.png'
import PersonFull from '@/assets/personFull.png'
import {Footer} from "@/components/Footer";

interface MainContentProps {
    className?: string;
}


export const MainContent = (props: MainContentProps) => {
    const { className } = props;

    const aboutContent: {title: ReactElement, description: ReactElement, image: ReactElement}[] = [
        {image: (<img className={cls.AboutCardImage} src={AboutFirst} alt="firstImage"/>) ,title: (<p className={cls.AboutCardTitle}><span>Обширная</span> игровая зона</p>), description: (<p className={cls.AboutCardDescription}>Наша локация имеет размер 1000 кв.м2 и на открытом пространстве. Вы можете свободно перемещяться, используя укрытия для защиты или для атаки.</p>)},
        {image: (<img className={cls.AboutCardImage} src={AboutSecond} alt="secondImage"/>) ,title: (<p className={cls.AboutCardTitle}><span>Новейшие</span> маркеры</p>), description: (<p className={cls.AboutCardDescription}>Современные модели со стальными стволами длиной 30 см и диаметром - 20 мм. Имеют эргономичную рукоятку для удобного захвата. Емкость магазина - 360 шариков.</p>)},
        {image: (<img className={cls.AboutCardImage} src={AboutHelmets} alt="thirdImage"/>) ,title: (<p className={cls.AboutCardTitle}><span>Удобная</span> экипировка</p>), description: (<p className={cls.AboutCardDescription}>Мы за безопасную игру! Перед игрой все элементы защиты подбираются по размеру.</p>)},
    ]

    const GameScriptContent: {title: ReactElement, description: ReactElement, count: ReactElement}[] = [
        {count: (<p className={cls.GameScriptCount}>01</p>) ,title: (<p className={cls.GameScriptTitle}>Cвободная игра</p>), description: (<p className={cls.GameScriptDescription}>Этот сценарий особенно подходит новеньким. Каждому  участнику указывается в качестве цели другой игрок, при этом он не имеет представления, для кого сам выступает целью. Поразив одну цель, он приступает к другой. Игра продолжается, пока в ней ен останется один игрок</p>)},
        {count: (<p className={cls.GameScriptCount}>02</p>) ,title: (<p className={cls.GameScriptTitle}>Штурм объекта</p>), description: (<p className={cls.GameScriptDescription}>По этому ценарию одна команда производит штурм указанного объекта , а вторая - защищает его. Проигрывает бой команда, все члены которой будут уничтожены</p>)},
        {count: (<p className={cls.GameScriptCount}>03</p>) ,title: (<p className={cls.GameScriptTitle}>Командный бой</p>), description: (<p className={cls.GameScriptDescription}>Просто сражение двух команд до полного превосходства одной из них. Наиболее распространённый сценарий. Действуют обычно в паре, при этом один участник прикрывает второго. Условием победы выступает поддержание дисциплины среди членов команды.</p>)},
    ]

    const navigate = useNavigate()
    const onMoreClickHandler = () => {
        navigate(`/plans`, {replace: true})
    }

    return (
        <div className={classNames(cls.MainContent, {}, [className])}>
            <Header/>
            <section className={cls.MainSection}>
                <img className={cls.MainBg} src={MainBG} alt="bg"/>
                <MainContainer>
                    <div className={cls.MainSectionInner}>
                        <div className={cls.MainPerson}>
                            <img src={MainPerson} height={'535px'} alt={'person'}/>
                        </div>

                        <div className={cls.MainRightContent}>
                            <p className={cls.MainTitle}>УСТАЛ ОТ СКУЧНЫХ <br/> И УНЫЛЫХ ВЫХОДНЫХ? <br/> ТОГДА БЕГОМ НА <span>АРЕНУ!</span></p>
                            <Button onClick={onMoreClickHandler}>Принять участие</Button>
                        </div>
                    </div>
                </MainContainer>
            </section>

            <section className={cls.ClubSection}>
                <MainContainer>
                    <div className={cls.ClubInner}>
                        <div className={cls.ClubLeftContent}>
                            <h2 className={cls.ClubTitle}>Мы - профессиональная <br/> команда пейнтболистов</h2>

                            <p className={cls.ClubDescription}>У нас в клубе вы встретитесь с увлекательной и захватывающей игрой. Предлагаем насладиться совершенно уникальным спортивным развлечением, которое объединяет дружбу, командный дух и стремление к победе.У нас в клубе ты встретишься с увлекательной и захватывающей игрой пейнтбола.</p>
                            <Button onClick={onMoreClickHandler}>Принять участие</Button>
                        </div>

                        <div className={cls.ClubLeftContent}>
                            <img src={PersonFull} alt="person"/>
                        </div>
                    </div>
                </MainContainer>
            </section>

            <section className={cls.AboutSection}>
                <MainContainer>
                    <div className={cls.AboutInner}>
                        <h2 className={cls.AboutTitle}>В <span>игре</span> вас ждет</h2>

                        <div className={cls.AboutContent}>
                            {aboutContent.map((item, index) => (
                                <div key={index} className={cls.AboutCard}>
                                    {item.image}
                                    <div className={cls.AboutCardWrapper}>
                                        {item.title}
                                        {item.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </MainContainer>
            </section>

            <section className={cls.GameScriptSection}>
                <MainContainer>
                    <div className={cls.GameScriptInner}>
                        <h2 className={cls.GameScriptMainTitle}>Сценарии <span>игры</span></h2>

                        <div className={cls.GameScriptContent}>
                            {GameScriptContent.map((item, index) => (
                                <div key={index} className={cls.GameScriptCard}>
                                    <div className={cls.GameScriptCardWrapper}>
                                        {item.count}
                                        {item.title}
                                    </div>

                                    {item.description}
                                </div>
                            ))}
                        </div>
                        <Button onClick={onMoreClickHandler}>Принять участие</Button>

                    </div>

                </MainContainer>
            </section>

            <Footer/>
        </div>
    )
};
