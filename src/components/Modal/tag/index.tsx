import React, { FC } from 'react';
import Modal from 'react-modal';

import { ModalStyle } from '../../../util/style';

interface ModalTagProps {
	isTagModal: boolean;
	textTag: string;
	onChangeTextTag: (eve: React.ChangeEvent<HTMLInputElement>) => void;
	tagList: string[];
	onClickTagItem: (item: string) => () => void;
	onClickTagCreate: () => void;
}

const ModalTag: FC<ModalTagProps> = ({
	isTagModal,
	textTag,
	onChangeTextTag,
	tagList,
	onClickTagItem,
	onClickTagCreate,
}) => {
	return (
		<Modal isOpen={isTagModal} style={ModalStyle} ariaHideApp={false}>
			<div className="modal-main">
				<input type="text" className="modal-input" value={textTag} onChange={onChangeTextTag} />
				<div className="modal-tag-input-content">
					{tagList
						.filter((item) => item.includes(textTag) === true)
						.map((item) => {
							return (
								<p className="modal-tag-item" key={`${item}`} onClick={onClickTagItem(item)} aria-hidden="true">
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
	);
};

export default ModalTag;
