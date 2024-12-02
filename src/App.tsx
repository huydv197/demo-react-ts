import { useState, useEffect } from 'react';
import './App.css';

type ColorItem = {
	id: string;
	color: string;
	idColor: string;
};

const generateRandomColor = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function App() {
	const [cols, setCols] = useState(5);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [colorList, setColorList] = useState<ColorItem[]>([]);

	useEffect(() => {
		const list = Array.from({ length: 30 }, (_, index) => ({
			idColor: `color-${index % 10}`,
			color: generateRandomColor(),
			id: `color-${index + 1}`,
		}));
		setColorList(list);
	}, []);

	const handleClick = (id: string) => {
		setSelectedId(id);
	};

	return (
		<div className='h-screen w-full flex flex-col items-center justify-start p-4 bg-gray-900'>
			<div className='mb-4'>
				<button
					onClick={() => setCols(5)}
					className='px-4 py-2 bg-blue-500 text-white rounded mr-2'>
					5 Columns
				</button>
				<button
					onClick={() => setCols(10)}
					className='px-4 py-2 bg-blue-500 text-white rounded'>
					10 Columns
				</button>
			</div>

			<div
				className={`grid grid-cols-${cols} gap-4 w-full`}
				style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
				{colorList.map(({ id, color, idColor }) => (
					<div
						key={id}
						className={`h-32 cursor-pointer flex items-center justify-center ${
							selectedId === idColor
								? 'border-4 border-blue-500'
								: ''
						}`}
						style={{ backgroundColor: color }}
						onClick={() => handleClick(idColor)}>
						{id}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
