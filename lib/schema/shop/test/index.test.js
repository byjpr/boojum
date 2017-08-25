import test from 'ava';
import Shop from '../index';

const testShop = {
	id: "asef",
	title: "Boojum test page"
};

test('Schema matches input', t => {
	let shop = Object.assign({}, testShop);

	var value = new Shop(shop);
	t.deepEqual(value.toObject(), testShop);
});

test('Test collection should be free of errors', t => {
	let shop = Object.assign({}, testShop);

	var value = new Shop(shop);
	t.false(value.isErrors());
});
