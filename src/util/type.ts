export const ITEM_TYPE = 'TODO_LIST_MOVE' as const;
export interface ITodoList {
	title: string;
	todoItem: ITodoItem[];
}
export interface ITodoItem {
	label: string;
	tag: string[];
}

export const toDoListDummyData = [
	{
		title: 'Backlog',
		todoItem: [
			{
				label: 'task1',
				tag: ['tag1_1', 'tag1_2', 'tag1_3', 'tag1_4'],
			},
			{
				label: 'task2',
				tag: ['tag2_1', 'tag2_2', 'tag2_3'],
			},
		],
	},
	{
		title: 'To Do',
		todoItem: [
			{
				label: 'task3',
				tag: ['tag3_1', 'asdasd'],
			},
		],
	},
	{
		title: 'Doing',
		todoItem: [],
	},
	{
		title: 'Done',
		todoItem: [
			{
				label: 'task4',
				tag: ['task4_1', 'task4_2'],
			},
		],
	},
];
