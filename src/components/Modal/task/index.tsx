import React, { FC } from 'react';
import Modal from 'react-modal';

import { ModalStyle } from '../../../util/style';

interface ModalTaskProps {
	isTaskModal: boolean;
	textTask: string;
	onChangeTextTask: (eve: React.ChangeEvent<HTMLInputElement>) => void;
	tag: string[];
	onClickTagItemAdd: () => void;
	onClickCancel: () => void;
	onClickOK: () => void;
}

const ModalTask: FC<ModalTaskProps> = ({
	isTaskModal,
	textTask,
	onChangeTextTask,
	tag,
	onClickTagItemAdd,
	onClickCancel,
	onClickOK,
}) => {
	return (
		<Modal isOpen={isTaskModal} style={ModalStyle} ariaHideApp={false}>
			<div className="modal-main">
				<input type="text" className="modal-input" value={textTask} onChange={onChangeTextTask} />
				<br />
				<div className="modal-task-layout">
					{tag.map((value, index) => {
						return (
							<p className="modal-selected-tag" key={`tag-${index.toString()}-${value}`}>
								{value}
							</p>
						);
					})}
				</div>
				<button type="button" className="btn modal-btn-tag-add" onClick={onClickTagItemAdd}>
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
	);
};

export default ModalTask;
