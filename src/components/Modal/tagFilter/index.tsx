import React, { FC } from 'react';
import Modal from 'react-modal';

import { ModalStyle } from '../../../util/style';

interface ModalTagFilterProps {
	isTagFilter: boolean;
	tagList: string[];
	tagFilterList: string[];
	tagFilterText: string;
	onChangeTagFilterText: (eve: React.ChangeEvent<HTMLInputElement>) => void;
	onClickTagFilterItem: (item: string) => () => void;
	onClickTagFilterSearch: () => void;
}

const ModalTagFilter: FC<ModalTagFilterProps> = ({
	isTagFilter,
	tagList,
	tagFilterList,
	tagFilterText,
	onChangeTagFilterText,
	onClickTagFilterItem,
	onClickTagFilterSearch,
}) => {
	return (
		<Modal isOpen={isTagFilter} style={ModalStyle} ariaHideApp={false}>
			<div className="modal-main">
				<input type="text" className="modal-input" value={tagFilterText} onChange={onChangeTagFilterText} />
				<div className="modal-tag-filter-layout">
					{tagFilterList.map((item, itemIndex) => {
						return (
							<p key={`${itemIndex.toString()}-${item}`} className="modal-selected-tag">
								{item}
							</p>
						);
					})}
				</div>
				<div className="modal-tag-input-content">
					<div>
						{tagList
							.filter((item) => item.includes(tagFilterText) === true)
							.map((item) => {
								return (
									<p className="modal-tag-item" key={`${item}`} onClick={onClickTagFilterItem(item)} aria-hidden="true">
										{item}
									</p>
								);
							})}
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn modal-btn-ok" onClick={onClickTagFilterSearch}>
					絞り込む
				</button>
			</div>
		</Modal>
	);
};

export default ModalTagFilter;
