const { assert } = require('chai')
const { describe, it } = require('mocha')

const hilightText = (desc, keywords) => {
	let i, j, k, max, tmp, max_index, count = 0, state_count, state_insert, before_char, queue = []
	//create array of queue
	for (i = 0; i < keywords.length; i++) {
		queue.push({"size_of_char": keywords[i].hls[1] - keywords[i].hls[0],"idx": i})           
	}
	//sort array min to max 
	queue.sort(function(a, b){return a.size_of_char - b.size_of_char});
	//insert <em></em>
	for(i = keywords.length-1; i >= 0; i--) {
		for(j = 0; j < keywords[queue[i].idx].hls.length; j+=2) {
			count = 0
			state_count = -1
			state_insert = 1
			for(k = 0; k < desc.length; k++) {
				if(desc[k] == '<' && desc[k + 1] && desc[k + 1] != ' ') {
					if(desc[k] == '<' && desc[k + 1] == 'e' && desc[k + 2] == 'm' && desc[k + 3] == '>') {
						k+=3
						state_insert = 0
					} else if(desc[k] == '<' && desc[k + 1] == '/' && desc[k + 2] == 'e' && desc[k + 3] == 'm' && desc[k + 4] == '>') {
						k+=4
						state_insert = 1
					} else {
						while(desc[k] != '>') {
							k++
						}
					}
				} else {
					if(state_count == -1) {
						if(desc[k] != ' ') {
							state_count = 1
						}             
					}
					if(state_count == 1) {
						if(state_insert == 1) {
							if(count == keywords[queue[i].idx].hls[j]) {
								if(desc[k] != '<' && desc[k + 1] != 'e') {
									if(before_char == ' ' && desc[k] == ' ') {
									} else {
										desc = desc.substring(0, k) + '<em>' + desc.substring(k, desc.length);
										desc = desc.substring(0, k + queue[i].size_of_char + 4) + '</em>' + desc.substring(k + queue[i].size_of_char + 4, desc.length);
									}
								}                                                                                     
							}
						}                                                   
						if(before_char == ' ' && desc[k] == ' ') {
						} else {
							before_char = desc[k]
							count++
						}                                                      
					}
				}
					
			}
		}
	}         
	return desc
}

const message = {
	desc: 'xxx bnk48 xxxx ornbnk48 bnk',
	raw_desc: '<img src="yyy" title="bnk48"/> xxx bnk48 xxxx <br /> ornbnk48 bnk',
	keywords: [{
		hls: [4, 9, 18, 23]
	}, {
		hls: [15, 23]
	}]
}

describe('test function', () => {
	/*it('# hilight desc', () => {
		const desc = hilightText(message.desc, message.keywords)
		assert.equal(desc, 'xxx <em>bnk48</em> xxxx <em>ornbnk48</em> bnk')
	})*/

	it('hilight raw_desc', () => {
		const raw_desc = hilightText(message.raw_desc, message.keywords)
		assert.equal(raw_desc, '<img src="yyy" title="bnk48"/> xxx <em>bnk48</em> xxxx <br /> <em>ornbnk48</em> bnk')
	})
})
