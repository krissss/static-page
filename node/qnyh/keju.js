// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

async function getFrom16163() {
    console.log('getFrom16163')
    // http://www.16163.com/zt/qnm/dtq/index.html
    const data = await axios.get('http://www.16163.com/zt/qnm/dtq/index_files/data-keju.js')
    if (data.status !== 200) {
        return
    }
    eval(data.data)
    // a 变量是从 data.data eval 生成的
    // eslint-disable-next-line no-undef
    const questions = a.xlinfo
    let result = {}
    questions.forEach(item => {
        result[item.question] = item.opt1
    })
    return result
}

async function getFrom4399() {
    console.log('getFrom4399')
    // http://news.4399.com/mobile/app/datiqi/index.php?gid=12
    const data = await axios.get('http://news.4399.com/mobile/app/datiqi/index.php?gid=12')
    if (data.status !== 200) {
        return
    }
    eval(data.data.match(new RegExp('var list =(.*);', 'g'))[0])
    // list 变量是从 data.data eval 生成的
    // eslint-disable-next-line no-undef
    const questions = list
    let result = {}
    questions.forEach(item => {
        result[item.question] = item.answer.trimRight('\\r')
    })
    return result
}

(async () => {
    const objs = Object.assign(
        {},
        await getFrom16163(),
        await getFrom4399(),
    )
    //console.log(objs)

    let list = []
    for (const [question, answer] of Object.entries(objs)) {
        list.push({
            q: question,
            a: answer,
        })
    }

    console.log('write json')
    fs.writeFileSync(path.join(__dirname, 'keju.json'), JSON.stringify(list))
    console.log('over')
})()
