// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pinyin = require('pinyin-pro').pinyin
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

async function getFrom16163() {
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

function formatPinYin(list) {
    list.forEach(item => {
        item.py = pinyin(item.q, {toneType: 'none', type: 'string'})//.join('')
    })

    return list
}

(async () => {
    const objs = Object.assign(
        {},
        await getFrom16163()
    );

    let list = []
    for (const [question, answer] of Object.entries(objs)) {
        list.push({
            q: question,
            a: answer,
        })
    }
    list = formatPinYin(list)

    fs.writeFileSync(path.join(__dirname, 'keju.json'), JSON.stringify(list))
})()
