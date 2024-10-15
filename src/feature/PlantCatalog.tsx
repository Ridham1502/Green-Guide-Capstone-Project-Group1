import React, { useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer'; 

const MyGarden: React.FC = () => {
    const [reminders] = useState<{ name: string; date: string; description: string }[]>([
        { name: 'Indoor Plant', date: '03/08/2024', description: 'This is a reminder for watering your indoor plant.' },
        { name: 'Flower', date: '03/08/2024', description: 'This is a reminder for fertilizing your flowers.' },
        { name: 'Vegetable', date: '03/08/2024', description: 'This is a reminder for harvesting your vegetables.' },
    ]);

    return (
        <>
            <Header />
            <div className="p-4 mt-9">
                <div className="flex justify-center mb-6">
                    <button className="py-2 px-4 font-bold bg-slate-100 rounded-md mx-2">Water Time</button>
                    <button className="py-2 px-4 font-bold bg-slate-100 rounded-md mx-2">Sunlight Time</button>
                </div>

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                    <CategoryBox title="Indoor Plants" items={['Aloe Vera', 'Spider Plant', 'Peace Lily']} />
                    <CategoryBox
                        title="Flowers"
                        items={['Sunflower', 'Rose', 'Tulip']}
                        isFlowerCategory={true}
                    />
                    <CategoryBox title="Vegetables" items={['Tomato', 'Cucumber', 'Carrot']} />
                </div>

                <h2 className="text-center text-xl font-bold mb-4">Reminders</h2>
                <div className="flex flex-col items-center">
                    {reminders.map((reminder, index) => (
                        <Reminder key={index} reminder={reminder} />
                    ))}
                </div>
            </div>
            <Footer /> 
        </>
    );
};

const CategoryBox: React.FC<{ title: string; items: string[]; isFlowerCategory?: boolean }> = ({ title, items, isFlowerCategory }) => {
    return (
        <div className={`rounded-lg p-4 shadow-md w-full md:w-1/5 ${isFlowerCategory ? 'bg-black text-white' : 'bg-white border border-gray-300'}`}>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <ul className="list-disc list-inside mb-4">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <button className={`w-full py-2 rounded-md ${isFlowerCategory ? 'bg-white text-black' : 'bg-black text-white'}`}>
                View More
            </button>
        </div>
    );
};

const Reminder: React.FC<{ reminder: { name: string; date: string; description: string } }> = ({ reminder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-2 w-full max-w-md bg-slate-100">
            <div className="flex justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className='font-bold'>{reminder.name} [{reminder.date}]</span>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <p className="mt-2 text-gray-600">{reminder.description}</p>
            )}
        </div>
    );
};

export default MyGarden;
