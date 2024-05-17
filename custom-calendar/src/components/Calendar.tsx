import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LeftArrowIcon, RightArrowIcon } from '../assets'
import { months } from '../constants'

interface CalendarProps {
        onClose: () => void
}
const Calendar: FC<CalendarProps> = ({ onClose }) => {
        const calendarRef = useRef<HTMLDivElement | null>(null)
        const [currentYear, setCurrentYear] = useState<number>(
                new Date().getFullYear()
        )
        const [currentMonth, setCurrentMonth] = useState<number>(
                new Date().getMonth()
        )
        const [selectedDay, setSelectedDay] = useState<number | null>(null)
        useEffect(() => {
                const handleOutsideClickListener = (event: MouseEvent) => {
                        if (
                                calendarRef.current &&
                                !calendarRef.current.contains(
                                        event.target as Node
                                )
                        ) {
                                onClose()
                        }
                }
                document.addEventListener('mouseup', handleOutsideClickListener)
                return () =>
                        document.removeEventListener(
                                'click',
                                handleOutsideClickListener
                        )
        }, [])

        const onClickItemHandler = (
                event: React.MouseEvent<HTMLUListElement>
        ) => {
                console.log((event.target as HTMLUListElement).innerText)
                setSelectedDay(
                        Number((event.target as HTMLUListElement).innerText)
                )
        }

        const renderCalendar = useCallback(() => {
                const firstDayofMonth = new Date(
                        currentYear,
                        currentMonth,
                        1
                ).getDay()
                const lastDateofMonth = new Date(
                        currentYear,
                        currentMonth + 1,
                        0
                ).getDate()
                const lastDayofMonth = new Date(
                        currentYear,
                        currentMonth,
                        lastDateofMonth
                ).getDay()
                const lastDateofLastMonth = new Date(
                        currentYear,
                        currentMonth,
                        0
                ).getDate()

                let days: React.ReactNode[] = []
                for (let i = firstDayofMonth; i > 0; i--) {
                        days.push(
                                <li className="inactive">
                                        {lastDateofLastMonth - i + 1}
                                </li>
                        )
                }
                for (let i = 1; i <= lastDateofMonth; i++) {
                        const currentDate = new Date()
                        const isToday =
                                i === currentDate.getDate() &&
                                currentMonth === new Date().getMonth() &&
                                currentYear === currentDate.getFullYear()
                                        ? 'active'
                                        : ''
                        const shouldSelect: boolean = selectedDay === i
                        if (shouldSelect) console.log('hello')
                        days.push(
                                <li
                                        className={`isToday ${shouldSelect ? 'selected' : ''} ${isToday}`}
                                >
                                        {i}
                                </li>
                        )
                }
                for (let i = lastDayofMonth; i < 6; i++) {
                        days.push(
                                <li className="inactive">
                                        {i - lastDayofMonth + 1}
                                </li>
                        )
                }
                return days
        }, [currentYear, currentMonth, selectedDay])

        const getDays = useMemo(
                () => renderCalendar(),
                [selectedDay, currentMonth, currentYear]
        )
        return (
                <div
                        ref={calendarRef}
                        className="transition 
                        wrapper
                        absolute 
                        height-[400px] 
                        top-[-200px]
                        left-[120%]
                        rounded-xl
                        "
                >
                        <div className="flex items-center justify-around">
                                <img src={LeftArrowIcon} />
                                <span>{`${months[currentMonth]}, ${currentYear}`}</span>
                                <img src={RightArrowIcon} />
                        </div>
                        <div className="calendar">
                                <ul className="weeks">
                                        <li>Sun</li>
                                        <li>Mon</li>
                                        <li>Tue</li>
                                        <li>Wed</li>
                                        <li>Thu</li>
                                        <li>Fri</li>
                                        <li>Sat</li>
                                </ul>
                                <ul
                                        onClick={onClickItemHandler}
                                        className="days"
                                >
                                        {getDays}
                                </ul>
                        </div>
                </div>
        )
}

export default Calendar
