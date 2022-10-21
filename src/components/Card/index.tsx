/* eslint-disable no-useless-return */
import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ITEM_TYPE, ITodoList } from '../../util/type';

export interface ICardProps {
	productIndex: number;
	itemIndex: number;
	label: string;
	tag: string[];
	setTodoList: React.Dispatch<React.SetStateAction<ITodoList[]>>;
}

const Card: FC<ICardProps> = ({ productIndex, itemIndex, label, tag, setTodoList }) => {
	// ドラッグ&ドロップ
	const ref = useRef<HTMLDivElement>(null);

	/**
	 * ドロップ時のイベントハンドル
	 */
	const [, drop] = useDrop({
		accept: ITEM_TYPE,
		hover(item: any, monitor) {
			// マウスがカードコンポーネントをドロップをするか判断
			if (!ref.current) return;
			// クリックしたカードを移動するカードと同じかを判断
			if (item.dragProductIndex === productIndex && item.dragItemIndex === itemIndex) return;
			const hoverRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
			const mousePosition = monitor.getClientOffset();
			if (!mousePosition) return;
			const hoverClientY = mousePosition.y - hoverRect.top;
			if (productIndex < itemIndex && hoverClientY < hoverMiddleY * 0.5) return;
			if (productIndex > itemIndex && hoverClientY > hoverMiddleY * 1.5) return;

			// todoListをスワップする処理
			setTodoList((prev) => {
				const deepCopyPrev = [...prev];

				// const moveProduct = deepCopyPrev[productIndex];
				// const newItems = deepCopyPrev.filter((_, idx) => {
				// 	console.log(idx, item.dragProductIndex, idx !== item.dragProductIndex);
				// 	return idx !== item.dragProductIndex;
				// });
				// deepCopyPrev.filter((_, rowIndex) => {
				// 	console.log(rowIndex, item.dragProductIndex, rowIndex === item.dragProductIndex);
				// 	return rowIndex === item.dragProductIndex;
				// });

				// const selectedToDo = deepCopyPrev[item.dragProductIndex].todoItem[item.dragItemIndex];
				// console.log(selectedToDo);
				// // deepCopyPrev[item.dragProductIndex].todoItem.splice(1, 0);
				// deepCopyPrev[item.dragProductIndex].todoItem.splice(item.dragItemIndex, 1);
				// deepCopyPrev[item.dragProductIndex].todoItem.splice(0, 1);
				// console.log(item.dragProductIndex, item.dragItemIndex);

				// return deepCopyPrev;
				return deepCopyPrev;
			});
		},
	});

	/**
	 * ドラッグ時のイベントハンドル
	 */
	const [{ isDragging, canDrag }, drag] = useDrag(
		{
			type: ITEM_TYPE,
			item: {
				dragProductIndex: productIndex,
				dragItemIndex: itemIndex,
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
				canDrag: monitor.canDrag(),
			}),
		},
		[],
	);

	drag(drop(ref));

	return (
		<div
			className="content"
			key={`product-${productIndex.toString()}-${label}-content-${itemIndex.toString()}`}
			ref={ref}
			style={{
				opacity: isDragging ? 0.4 : 1,
				cursor: canDrag ? 'move' : 'default',
			}}
		>
			<p>{label}</p>
			<div className="tag">
				{tag.map((tagItem, tagIndex) => {
					return <p key={`tag-${tagItem}-${tagIndex.toString()}`}>{tagItem}</p>;
				})}
			</div>
		</div>
	);
};

export default Card;
