import React, { FC } from 'react';
import Modal from 'react-modal';

import { ITodoItem } from '../../../util/type';
import { ModalStyle } from '../../../util/style';

interface ModalTagFilterSearchResultProps {
	isTagFilterSearchResult: boolean;
	tagFilterResult: ITodoItem[];
	onClickTagFilterResultClose: () => void;
}

const ModalTagFilterSearchResult: FC<ModalTagFilterSearchResultProps> = ({
	isTagFilterSearchResult,
	tagFilterResult,
	onClickTagFilterResultClose,
}) => {
	return (
		<Modal isOpen={isTagFilterSearchResult} style={ModalStyle} ariaHideApp={false}>
			<div className="modal-main">
				<div className="product" style={{ height: 'auto', maxHeight: '500px', paddingTop: '20px', marginTop: '20px' }}>
					<div className="product-item">
						{tagFilterResult.length === 0 ? (
							<>検索結果が0件です。</>
						) : (
							<>
								{tagFilterResult.map((item, itemIndex) => {
									return (
										<div className="content" key={`${itemIndex.toString()}-content-${item.label}`}>
											<p>{item.label}</p>
											<div className="tag">
												{item.tag.map((tagItem, tagIndex) => {
													return <p key={`tag-${tagItem}-${tagIndex.toString()}`}>{tagItem}</p>;
												})}
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn modal-btn-ok" onClick={onClickTagFilterResultClose}>
					閉じる
				</button>
			</div>
		</Modal>
	);
};

export default ModalTagFilterSearchResult;
