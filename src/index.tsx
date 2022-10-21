import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
	<React.StrictMode>
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
		,
	</React.StrictMode>,
);
