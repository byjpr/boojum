import test from 'ava';
import Collection from '../index';

const testCollection = {
	id: "asef",
	title: "Boojum Test Collection"
};

test('Schema matches input', t => {
	let collection = Object.assign({}, testCollection);

	var value = new Collection(collection);
	t.deepEqual(value.toObject(), testCollection);
});

test('Test collection should be free of errors', t => {
	let collection = Object.assign({}, testCollection);

	var value = new Collection(collection);
	t.false(value.isErrors());
});
