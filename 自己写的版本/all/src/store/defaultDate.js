//默认值，所有右侧模块的默认值填写
const storeDefault = {
    left: 0,
    top: 0,
    width: 200,
    height: "暂无",
    childName: '无',
    parentName: '无',
}

const setTest = false;

//如果是发布的环境，一定不是测试的 为 false，运行环境下面 就取设置的setTest值
const isTest = process.env.NODE_ENV == 'production'?false:setTest;

export {
    storeDefault,
    isTest
};