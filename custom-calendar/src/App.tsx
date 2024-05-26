import { FC, useState } from 'react'
import { CalendarPrimaryIcon } from './assets'
import Calendar from './components/Calendar'

const App: FC = () => {
  const [deadline,] = useState<Date | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center 
                                 gap-2 
                                 px-6 
                                 py-2 
                                 border-2 
                                 border-primary 
                                 rounded-xl 
                                 shadow-xl 
                                 relative
                                 hover:cursor-pointer
                                 "
      >
        <img
          src={CalendarPrimaryIcon}
          height={24}
          width={24}
        />
        <span className="text-primary">
          {deadline === null
            ? 'Set Deadling'
            : deadline.toString()}
        </span>
        {showModal && (
          <Calendar
            onClose={() =>
              setShowModal(false)
            }
          />
        )}
      </div>
    </div>
  )
}

export default App
