import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.scss';

const todoData = [
	{
		title: '',
		todoItem: [
			{
				label: 'task1',
				tag: ['tag1_1', 'tag1_2', 'tag1_3', 'tag4_3', 'asjkfhdsjfhdf', 'asd', '435iouasd'],
			},
			{
				label: 'task2',
				tag: ['tag2_1', 'tag2_2', 'tag2_3'],
			},
		],
	},
	{
		title: '',
		todoItem: [],
	},
	{
		title: '',
		todoItem: [
			{
				label: 'task1',
				tag: ['test', 'test', 'test23'],
			},
			{
				label: 'task1',
				tag: ['asdsad123', 'testset', 'test5'],
			},
		],
	},
	{
		title: '',
		todoItem: [
			{
				label: 'task1',
				tag: [],
			},
		],
	},
];

const App = () => {
	return (
		<div className="App">
			<header>
				<h1>TODO管理アプリ</h1>
			</header>
			<main>
				<div className="tag-filter-layout">
					<button type="button" className="btn btn-tag-filter">
						タグフィルター
					</button>
				</div>
				<DndProvider backend={HTML5Backend}>
					<div className="todo-layout">
						{todoData.map((product, productIndex) => {
							return (
								<div className="product">
									<h2>{product.title}</h2>
									<div className="product-item">
										{product.todoItem.map((item, itemIndex) => {
											return (
												<div className={`content content-${productIndex}`}>
													<p>{item.label}</p>
													<div className="tag">
														{item.tag.map((tagItem) => {
															return <p>{tagItem}</p>;
														})}
													</div>
												</div>
											);
										})}
									</div>
									<button type="button" className="btn btn-add">
										+
									</button>
								</div>
							);
						})}
					</div>
				</DndProvider>
			</main>
		</div>
	);
};

export default App;
