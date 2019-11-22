"use strict";
var app = app ||{}
app =(()=>{
	let _,js
	let init=()=>{
		_ = $.ctx()
		js = $.js()
		
	}
	let run = x =>{
		$.when(
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x))
			}),
			$.getScript(x+'/resources/js/pop.js')		
		)
		.done(()=>{
			init()
			onCreate()
		})
		.fail(()=>{
			alert('fail')
		})
	}
	let onCreate=()=>{
		$(pop.view()).appendTo('#wrapper')
		pop.open()
		setContentView()
	}
	let setContentView =()=>{
		$('<table id="tab"><tr></tr></table>')
		.css({
            width: '80%',
            height: '800px',
            border: '1px solid black',
            margin: '0 auto'
        })
		.appendTo('#wrapper')	
		$('<td/>',{id : 'left'})
		.css({
            width: '20%',
            height: '100%',
            border: '1px solid black',
            'vertical-align': 'top'
        })
		.appendTo('tr')
		$('<td/>',{id : 'right'})
		.css({
            width: '80%',
            height: '100%',
            border: '1px solid black',
            'vertical-align': 'top'
        })
		.appendTo('tr')
		$.each(['NAVER','CGV','BUGS'],(i,j)=>{
			$('<div/>')
			.text(j)
			.css({
				width: '100%',
	            height: '50px',
	            border: '1px solid black',
	            'text-align' : 'center'
			}).appendTo('#left')
			.click(function() {
				$(this).css({'background-color':'yellow'})
				$(this).siblings().css({'background-color':'white'});
				_ = $.ctx()
				switch($(this).text()){
				case 'NAVER':
					$.getJSON(_+'/crawls/naver',d=>{
						$('#right').empty()
						$.each(d, (i,j)=>{
							$('<div/>')
							.css({width: '40%',
					              height: '40%',
					              border: '3px solid red',
					              float: 'left'})
					        .html('<h1>'+j.origin+'</h1><h4>'+j.trans+'</h4>')
							.appendTo('#right')
						})
					})
					break
				case 'CGV':
					$.getJSON(_+'/crawls/cgv',d=>{
						$('#right').empty()
						$.each(d, (i,j)=>{
							$('<div><img style="width:200px;" src="'+j.photo+'"/><br/>'+j.title+'<br/>'+j.percent+'<br/>'+j.info+'</div>')
							.css({
					              border: '3px solid red',
					              float: 'left'})
							.appendTo('#right')
						})
					})
					break
				case 'BUGS':
					list(1)
					break
					
				}
			})
		})
		
		
		
	}
	let list = x =>{
		$.getJSON(_+'/crawls/bugs/page/'+x,d=>{
			let pager = d.pager;
			let list = d.list;
			// No. ,title, artist, thumbnail
			
			$('#right').empty()
			
			$('<table id="content"><tr id="head"></tr></table>')
			.css({width: '99%',
					height: '50px',
	              border: '1px solid black'})
			.appendTo('#right')
			$.each(['No.','제목','가수','앨범'],(i, j)=>{
				$('<th/>')
				.html('<b>'+j+'</b>')
				.css({width: '25%',height: '100%',
		              border: '1px solid black'})
				.appendTo('#head')
			})
			$.each(list, (i, j)=>{
				$('<tr><td>'+j.seq+'</td><td><img src="'+j.thumbnail+'"/></td><td>'+j.title+'</td><td>'+j.artist+'</td></tr>')
				.css({width: '25%',height: '100%',
		              border: '1px solid black'})
				.appendTo('#content tbody')
			})
			$('#content tr td').css({border: '1px solid black'})
			$('<div/>',{
				id : 'pagination'
			})
			.css({width: '50%',
				  height: '50px',
				  margin: '20px auto'})
			.appendTo('#right')
			if(pager.existPrev){
				$('<span/>')
				.css({width: '50px',
					  height: '30px',
					  display: 'inline-block',
		              border: '1px solid black'})
				.text('PREV')
				.appendTo('#pagination')
				.click(()=>{
					app.list(pager.prevBlock)
				})
			}
			let i = pager.startPage
			for(;i<=pager.endPage; i++){
				$('<span/>')
				.css({width: '30px',
					  height: '30px',
					  display: 'inline-block',
		              border: '1px solid black'})
				.text(i+1)
				.appendTo('#pagination')
				.click(function(){
					let page = parseInt($(this).text())
					
					app.list(page - 1)
				})
			}
			if(pager.existNext){
				$('<span/>')
				.css({width: '50px',
					  height: '30px',
					  display: 'inline-block',
		              border: '1px solid black'})
				.text('NEXT')
				.appendTo('#pagination')
				.click(()=>{
					app.list(pager.nextBlock)
				})
			}
			
			
			
		})
	}
	return {run, list}
	
})()