import test from 'ava';
import Image from '../image';

const testImage = {
	id:  "Abc",
	product_id: "Abc",
	src:  "Abc",
};

test('Schema matches input', t => {
	var value = new Image(testImage);
	t.deepEqual(value.toObject(), testImage);
});

test('Test image should be free of errors', t => {
	var value = new Image(testImage);
	t.false(value.isErrors());
});

test('Empty product_id should have error', t => {
	let image = Object.assign({}, testImage);
	delete image.product_id;

	var value = new Image(image);
	t.true(value.isErrors());
});

test('Empty src should have error', t => {
	let image = Object.assign({}, testImage);
	delete image.src;

	var value = new Image(image);
	t.true(value.isErrors());
});
