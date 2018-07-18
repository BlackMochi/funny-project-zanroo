const { assert } = require('chai')
const { describe, it } = require('mocha')

const hilightText = (message) => {
	let keywords = message.keywords
	let raw_desc = message.raw_desc
	let desc = message.desc
	  let keywords_arr = []
	  let chk
	  for (let i = 0; i < keywords.length; i++) {
		  if(keywords[i].hls && keywords[i].hls.length >= 2) {
			  chk = 1
			  for (let j = 0; j < keywords_arr.length; j++) {
				//console.log("["+keywords_arr[j]+"] == [" + desc.substring(keywords[i].hls[0], keywords[i].hls[1]) + "]")
				if(keywords_arr[j].localeCompare(desc.substring(keywords[i].hls[0], keywords[i].hls[1])) == 0) {
				  //console.log("["+keywords_arr[j]+"] == [" + desc.substring(keywords[i].hls[0], keywords[i].hls[1]) + "]")
				  //console.log('chk = 0')
				  chk = 0
				}
				 
			  }
			  //console.log(keywords[i].hls[0] + " " + keywords[i].hls[1] + " [" + desc.substring(keywords[i].hls[0], keywords[i].hls[1]) + "]")
			  if(chk)             
				keywords_arr.push(desc.substring(keywords[i].hls[0], keywords[i].hls[1]))                                 
		  }
	  }
	  keywords_arr.sort(function(a, b){return b.length - a.length;})
	  let max_length = keywords_arr[0].length
	  let state_em = 1
	  let rawdesclength = raw_desc.length
	  //console.log(keywords_arr)
	  for (let i = 0; i < keywords_arr.length; i++) {     
		//console.log('ok')               
		for (let j = 0; j < rawdesclength ; j++) {
		  if(raw_desc.substring(j,j+4).localeCompare('<em>') == 0)  {
			state_em = 0
			//console.log(raw_desc.substring(j,j+4) +', state = ' + state_em)
		  }
		  else if(raw_desc.substring(j,j+5).localeCompare('</em>') == 0) {
			state_em = 1
			//console.log(raw_desc.substring(j,j+5) +', state = ' + state_em)
		  }
		  else if(raw_desc[j] == '<' && raw_desc[j] != ' ') {
			while(raw_desc[j] != '>') j++
		  }
		  if((raw_desc.substring(j,j + keywords_arr[i].length).localeCompare(keywords_arr[i]) == 0) && state_em) {             
			//console.log('state = ' + state_em)
			//console.log(raw_desc.substring(j,j + keywords_arr[i].length) + ' == ' + keywords_arr[i])
			raw_desc = raw_desc.slice(0, j) + "<em>" + raw_desc.slice(j,j + keywords_arr[i].length) + "</em>" + raw_desc.slice(j + keywords_arr[i].length,raw_desc.length)
			j+=9+keywords_arr[i].length
			rawdesclength += 9
			//console.log(raw_desc)
		  }
		}
	  }
	  //console.log(raw_desc)
	  return raw_desc
  }

const message = {
	desc: 'xxx bnk48 xxxx ornbnk48 bnk',
	raw_desc: '<img src="yyy" title="bnk48"/> xxx bnk48 xxxx <br /> ornbnk48 bnk',
	keywords: [{
		hls: [4, 9, 18, 23]
	}, {
		hls: [15, 23]
	}, {
		
	}]
}

describe('test function', () => {
	/*it('# hilight desc', () => {
		const desc = hilightText(message.desc, message.keywords)
		assert.equal(desc, 'xxx <em>bnk48</em> xxxx <em>ornbnk48</em> bnk')
	})*/

	it('hilight raw_desc', () => {
		const raw_desc = hilightText(message)
		assert.equal(raw_desc, '<img src="yyy" title="bnk48"/> xxx <em>bnk48</em> xxxx <br /> <em>ornbnk48</em> bnk')
	})
})
