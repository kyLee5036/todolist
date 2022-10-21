/* eslint-disable array-callback-return */
import React, { useCallback, useMemo, useState } from 'react';

import './App.scss';
import Card from './components/Card/index';
import ModalTag from './components/Modal/tag';
import ModalTask from './components/Modal/task';
import ModalTagFilter from './components/Modal/tagFilter';
import ModalTagFilterSearchResult from './components/Modal/tagFilterSearchResult';

import { ITodoItem, ITodoList, toDoListDummyData } from './util/type';

const App = () => {
	// TodoListのデータ
	const [todoList, setTodoList] = useState<ITodoList[]>(toDoListDummyData);
	const [selectedProductIndex, setSelectedProductIndex] = useState(0);
	// タスクののモーダル (true: モーダルON、false：モーダルOFF)
	const [isTaskModal, setIsTaskModal] = useState(false);
	// タグ入力のモーダル (true: モーダルON、false：モーダルOFF)
	const [isTagModal, setIsTagModal] = useState(false);
	// タグフィルタリングのモーダル (true: モーダルON、false：モーダルOFF)
	const [isTagFilter, setIsTagFilter] = useState(false);
	// タグフィルタリングのモーダル (true: モーダルON、false：モーダルOFF)
	const [isTagFilterSearchResult, setIsTagFilterSearchResult] = useState(false);
	// タグ入力画面の検索のテキスト
	const [textTag, setTextTag] = useState('');
	// タグリスト
	const [tag, setTag] = useState<string[]>([]);
	// タスクのテキスト
	const [textTask, setTextTask] = useState('');
	// タグフィルターのテキスト
	const [tagFilterText, setTagFilterText] = useState('');
	// タグフィルターのリスト
	const [tagFilterList, setTagFilterList] = useState<string[]>([]);
	// 絞り込むの結果のリスト
	const [tagFilterResult, setTagFilterResult] = useState<ITodoItem[]>([]);

	const tagList = useMemo(() => {
		const list: string[] = [];
		const todo = [...todoList];
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

	/**
	 * タスクの「+：追加」ボタンを押下時のイベントハンドル
	 * @param {number} index タスクのn番目のインデクス
	 */
	const onClickButtonAdd = useCallback(
		(index: number) => (eve: React.MouseEvent<HTMLElement>) => {
			setIsTaskModal(true);
			setSelectedProductIndex(index);
		},
		[],
	);

	/**
	 * タスクのモダールで「Cancel：キャンセル」ボタンを押下時のイベントハンドル
	 */
	const onClickCancel = useCallback(() => {
		setIsTaskModal(false);
		setTag([]);
		setTextTag('');
		setTextTask('');
	}, []);

	/**
	 * タスクのモダールで「OK：確認」ボタンを押下時のイベントハンドル
	 */
	const onClickOK = useCallback(() => {
		const deepCopyTodoList = todoList.map((value) => {
			return { ...value };
		});
		const addItem = {
			label: textTask,
			tag,
		};
		deepCopyTodoList[selectedProductIndex].todoItem.push(addItem);
		setTodoList(deepCopyTodoList);
		setIsTaskModal(false);
		setTag([]);
		setTextTag('');
		setTextTask('');
	}, [selectedProductIndex, todoList, tag, textTask]);

	/**
	 * タグの「+:追加」のボタンを押下時のイベントハンドル
	 */
	const onClickTagItemAdd = useCallback(() => {
		setIsTaskModal(false);
		setIsTagModal(true);
	}, []);

	/**
	 * タスクのテキストの入力時のイベントハンドル
	 */
	const onChangeTextTask = useCallback((eve: React.ChangeEvent<HTMLInputElement>) => {
		setTextTask(eve.target.value);
	}, []);

	/**
	 * タグ入力画面の検索のテキストを入力時のイベントハンドル
	 */
	const onChangeTextTag = useCallback((eve: React.ChangeEvent<HTMLInputElement>) => {
		setTextTag(eve.target.value);
	}, []);

	/**
	 * タグモーダルの作成ボタンを押下時のイベントハンドル
	 */
	const onClickTagCreate = useCallback(() => {
		if (!textTag || textTag.trim().length === 0) return;
		setTag((prev) => prev.concat(textTag));
		setIsTagModal(false);
		setIsTaskModal(true);
		setTextTag('');
	}, [textTag]);

	/**
	 * タグモーダルでタグを選択した時のイベントハンドル
	 */
	const onClickTagItem = useCallback(
		(item: string) => () => {
			setTag((prev) => prev.concat(item));
			setIsTagModal(false);
			setIsTaskModal(true);
			setTextTag('');
		},
		[],
	);

	/**
	 * タグフィルターを選択した時のイベントハンドル
	 */
	const onClickTagFilter = useCallback(() => {
		setIsTagFilter(true);
	}, []);

	/**
	 * フィルターのテキストを入力時のイベントハンドル
	 */
	const onChangeTagFilterText = useCallback((eve: React.ChangeEvent<HTMLInputElement>) => {
		setTagFilterText(eve.target.value);
	}, []);

	/**
	 * 絞り込むボタンを押下時のイベントハンドル
	 */
	const onClickTagFilterItem = useCallback(
		(item: string) => () => {
			const result = tagFilterList.findIndex((value) => value === item);
			if (result > -1) return;
			setTagFilterList((prev) => prev.concat(item));
			setTagFilterText('');
		},
		[tagFilterList],
	);

	/**
	 * 絞り込むボタンを押下時のイベントハンドル
	 */
	const onClickTagFilterSearch = useCallback(() => {
		const duplicateFilter = tagFilterList.filter((val, idx) => {
			return tagFilterList.indexOf(val) === idx;
		});
		const result: ITodoItem[] = [];
		const deppTodoList = [...todoList];
		deppTodoList.map((row, rowIndex) => {
			const deepRow = { ...row };
			deepRow.todoItem.map((cell, cellIndex) => {
				const deepCell = { ...cell };
				deepCell.tag.map((item) => {
					duplicateFilter.map((filterItem) => {
						if (item === filterItem) {
							result.push(deppTodoList[rowIndex].todoItem[cellIndex]);
						}
					});
				});
			});
		});
		const filterResult = result.filter((val, idx) => {
			return result.indexOf(val) === idx;
		});
		setTagFilterResult(filterResult);
		setIsTagFilter(false);
		setTagFilterText('');
		setTagFilterList([]);
		setIsTagFilterSearchResult(true);
	}, [todoList, tagFilterList]);

	/**
	 * 絞り込んでから閉じるボタンを押下時のイベントハンドル
	 */
	const onClickTagFilterResultClose = useCallback(() => {
		setTagFilterResult([]);
		setIsTagFilterSearchResult(false);
	}, []);

	return (
		<div className="App">
			{/* タスクモーダル */}
			{isTaskModal ? (
				<ModalTask
					isTaskModal={isTaskModal}
					textTask={textTask}
					onChangeTextTask={onChangeTextTask}
					tag={tag}
					onClickTagItemAdd={onClickTagItemAdd}
					onClickCancel={onClickCancel}
					onClickOK={onClickOK}
				/>
			) : (
				<div />
			)}
			{/* タグモーダル */}
			{isTagModal ? (
				<ModalTag
					isTagModal={isTagModal}
					textTag={textTag}
					onChangeTextTag={onChangeTextTag}
					tagList={tagList}
					onClickTagItem={onClickTagItem}
					onClickTagCreate={onClickTagCreate}
				/>
			) : (
				<div />
			)}
			{/* タグフィルターモーダル */}
			{isTagFilter ? (
				<ModalTagFilter
					isTagFilter={isTagFilter}
					tagList={tagList}
					tagFilterList={tagFilterList}
					tagFilterText={tagFilterText}
					onChangeTagFilterText={onChangeTagFilterText}
					onClickTagFilterItem={onClickTagFilterItem}
					onClickTagFilterSearch={onClickTagFilterSearch}
				/>
			) : (
				<div />
			)}
			{/* タグフィルター検索結果 */}
			{isTagFilterSearchResult ? (
				<ModalTagFilterSearchResult
					isTagFilterSearchResult={isTagFilterSearchResult}
					tagFilterResult={tagFilterResult}
					onClickTagFilterResultClose={onClickTagFilterResultClose}
				/>
			) : (
				<div />
			)}

			<header>
				<h1>TODO管理アプリ</h1>
			</header>
			<main>
				<div className="tag-filter-layout">
					<button type="button" className="btn btn-tag-filter" onClick={onClickTagFilter}>
						タグフィルター
					</button>
				</div>
				<div className="todo-layout">
					{todoList.map((product, productIndex) => {
						return (
							<div className="product" key={`product-${productIndex.toString()}`}>
								<h2>{product.title}</h2>
								<div className="product-item">
									{product.todoItem.map((item, itemIndex) => {
										return (
											<Card
												key={`${item.label}-${itemIndex.toString}`}
												productIndex={productIndex}
												label={item.label}
												itemIndex={itemIndex}
												tag={item.tag}
												setTodoList={setTodoList}
											/>
										);
									})}
								</div>
								<button type="button" className="btn btn-add" onClick={onClickButtonAdd(productIndex)}>
									+
								</button>
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
};

export default App;
