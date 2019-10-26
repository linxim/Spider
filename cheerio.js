const cheerio=require('cheerio');
const $ = cheerio.load('<div><p>你好</p><img src="http://www.baidu.com"><img src="http://www.bilibili.com"> </div>')
//将html格式的字符串转化为类dom 之后可以通过jq的语法选中其中的元素
// console.log($('img').attr('src'));
// console.log($('p').text())
$('img').each((index,el)=>{
    console.log($(el).attr('src'))
})