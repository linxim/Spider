/*
    1.请求网站数据
    2.将数据保存本地文件
*/
//http协议就只能用http
//https协议就用https://...;

const http = require('https')
//fs 文件模块
const fs = require('fs')
//服务器端对DOM进行操作
const cheerio = require('cheerio')
const request = require('request');
let url = "https://www.youku.com"
let json = 'http://nodejs.org/dist/index.json'
http.get(url, (res) => {
    //安全判断

    const {
        statusCode
    } = res; //状态码
    const contentType = res.headers['content-type']; //文件类型
    console.log(statusCode, contentType);

    //判断状态码
    let err = null;
    if (statusCode !== 200) {
        err = new Error('请求状态错误')
    } else if (!/^text\/html/.test(contentType)) {
        //格式类型是网页
        err = new Error('请求类型错误');
    }
    //err触发条件是上面两个判断出错
    if (err) {
        console.log(err);
        res.resume(); //重置缓存
        return false;
    }
    //数据处理
    let rawData = ''
    res.on('data', (chunk) => {
        rawData += chunk.toString('utf8');
        // console.log(chunk.toString('utf8'));
    });
    //数据流传输完毕
    res.on('end', () => {
        //将请求的数据保存到本地
        fs.writeFileSync('./xiaoshuo.html', rawData);
        console.log('数据流传输完毕');
        //通过cheerio分析
        //将请求的网页数据进行转化
        let $ = cheerio.load(rawData);
        $('img').each((index,el)=>{
            // console.log($(el).attr('src'));
            console.log($(el).attr('src'));
         
        })
    })
}).on('error', (err) => {
    console.log('出现错误');
})