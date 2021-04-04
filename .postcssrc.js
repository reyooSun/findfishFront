module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.0', 'iOS >= 7']
        },
        'postcss-pxtorem': {
            rootValue: 16,//结果为：设计稿元素尺寸/16，
            propList: ['*']
        }
    }
}