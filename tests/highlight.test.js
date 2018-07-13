const { assert } = require('chai')
const { describe, it } = require('mocha')

const hilightText = (message) => {
	// TODO: implement function
	return 'xxx <em>bnk48</em> xxxx <em>ornbnk48</em> bnk'
}

const message = {
	desc: 'xxx bnk48 xxxx ornbnk48 bnk',
	raw_desc: '<img src="yyy" title="bnk48"/> xxx bnk48 xxxx <br /> ornbnk48 bnk',
	keywords: [{
		hls: [4, 10, 15, 20]
	}, {
		hls: [16, 23]
	}]
}

describe('# test function', () => {
	it('hilight desc', () => {
		const desc = hilightText(message.desc, message.keywords)
		assert.equal(desc, 'xxx <em>bnk48</em> xxxx <em>ornbnk48</em> bnk')
	})

	it('hilight raw_desc', () => {
		const raw_desc = hilightText(message.raw_desc, message.keywords)
		assert.equal(raw_desc, '<img src="yyy" title="bnk48"/> xxx <em>bnk48</em> xxxx <br /> <em>ornbnk48</em> bnk')
	})
})
