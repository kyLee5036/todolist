import React, { useCallback, useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'react-modal';

import './App.scss';

const customStyles = {
	overlay: {
		backgroundColor: '#000000ab',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		minWidth: '331px',
	},
};

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
				tag: ['tag2_2', 'tag2_2', 'tag2_3'],
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
				tag: [],
			},
			{
				label: 'task1',
				tag: ['tag244_2', 'tag2123_2', 'tag223_3'],
			},
			{
				label: 'task23',
				tag: [],
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

export interface ITodoList {
	title: string;
	todoItem: {
		label: string;
		tag: string[];
	}[];
}

const App = () => {
	// TodoListのデータ
	const [todoList, setTodoList] = useState<ITodoList[]>(todoData);
	const [productIndex, setProductIndex] = useState(0);
	// タスクののモーダル(true: モーダルON、false：モーダルOFF)
	const [isTaskModal, setIsTaskModal] = useState(false);
	// タグ入力のモーダル(true: モーダルON、false：モーダルOFF)
	const [isTagInputModal, setIsTagInputModal] = useState(false);
	// タグ入力画面の検索のテキスト
	const [searchTag, setSearchTag] = useState('');

	const tagList = useMemo(() => {
		const list: string[] = [];
		const todo = todoList;
		todo
			.filter((todoIItem) => todoIItem.todoItem.length > 0)
			.map((item) => {
				return {
					...item.todoItem
						.filter((tagItems) => tagItems.tag.length > 0)
						.map((tagItem) => tagItem.tag)
						.flat()
						.map((value) => list.push(value)),
				};
			});
		// tagの重複をフィルタリングする
		const result = list.filter((val, idx) => {
			return list.indexOf(val) === idx;
		});
		return result;
	}, [todoList]);

	const onClickButtonAdd = useCallback(
		(index: number) => (eve: React.MouseEvent<HTMLElement>) => {
			setIsTaskModal(true);
			setProductIndex(index);
		},
		[],
	);

	const onClickCancel = useCallback(() => {
		setIsTaskModal(false);
	}, []);

	const onClickOK = useCallback(() => {
		console.log(productIndex);
		const deepCopyTodoList = todoList.map((value) => {
			return { ...value };
		});
		const addItem = {
			label: '',
			tag: [],
		};
		deepCopyTodoList[productIndex].todoItem.concat(addItem);
		setTodoList(deepCopyTodoList);
		setIsTaskModal(false);
	}, [productIndex, todoList]);

	const onClickTaskInput = useCallback(() => {
		setIsTaskModal(false);
		setIsTagInputModal(true);
	}, []);

	/**
	 * タグ入力画面のバッググラウンドを押下時のイベントハンドル
	 */
	// const onRequestClose = useCallback((eve: React.MouseEvent<HTMLElement>) => {
	// 	eve.stopPropagation();
	// 	setIsTagInputModal(false);
	// }, []);

	/**
	 * タグ入力画面の検索のテキストを入力時のイベントハンドル
	 */
	const onChangeSearchTag = useCallback((eve: React.ChangeEvent<HTMLInputElement>) => {
		// tagList.filter((list) => list.includes(eve.target.value) === true).slice(0, 10);
		setSearchTag(eve.target.value);
	}, []);

	const onClickTagCreate = useCallback(() => {
		console.log('ad');
	}, []);

	return (
		<div className="App">
			{isTaskModal ? (
				<Modal isOpen={isTaskModal} style={customStyles}>
					<div className="modal-main">
						<input type="text" className="modal-input" />
						<br />
						<button type="button" className="btn modal-btn-tag-add" onClick={onClickTaskInput}>
							+
						</button>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn modal-btn-cancel" onClick={onClickCancel}>
							Cancel
						</button>
						<button type="button" className="btn modal-btn-ok" onClick={onClickOK}>
							OK
						</button>
					</div>
				</Modal>
			) : (
				<div />
			)}
			{isTagInputModal ? (
				// <Modal isOpen={isTagInputModal} style={customStyles} shouldCloseOnOverlayClick onRequestClose={onRequestClose}>
				<Modal isOpen={isTagInputModal} style={customStyles}>
					<div className="modal-main">
						<input type="text" className="modal-input" value={searchTag} onChange={onChangeSearchTag} />
						<div className="modal-tag-input-content">
							{tagList
								.filter((item) => item.includes(searchTag) === true)
								.map((item) => {
									return (
										<p className="modal-tag-item" key={`${item}`}>
											{item}
										</p>
									);
								})}
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn modal-btn-ok" onClick={onClickTagCreate}>
							作成
						</button>
					</div>
				</Modal>
			) : (
				<div />
			)}
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
						{todoList.map((product, prodIndex) => {
							return (
								<div className="product" key={`product-${prodIndex.toString()}`}>
									<h2>{product.title}</h2>
									<div className="product-item">
										{product.todoItem.map((item, itemIndex) => {
											return (
												<div
													className={`content content-${prodIndex}`}
													key={`product-${prodIndex.toString()}-${item.label}-content-${itemIndex.toString()}`}
												>
													<p>{item.label}</p>
													<div className="tag">
														{item.tag.map((tagItem, tagIndex) => {
															return <p key={`tag-${tagItem}-${tagIndex.toString()}`}>{tagItem}</p>;
														})}
													</div>
												</div>
											);
										})}
									</div>
									<button type="button" className="btn btn-add" onClick={onClickButtonAdd(prodIndex)}>
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
