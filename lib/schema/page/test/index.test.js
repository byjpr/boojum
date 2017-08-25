import test from 'ava';
import Page from '../index';

const testPage = {
	id: "asef",
	title: "Boojum Test Page"
};

test('Schema matches input', t => {
	let page = Object.assign({}, testPage);

	var value = new Page(page);
	t.deepEqual(value.toObject(), testPage);
});

test('Test page should be free of errors', t => {
	let page = Object.assign({}, testPage);

	var value = new Page(page);
	t.false(value.isErrors());
});
