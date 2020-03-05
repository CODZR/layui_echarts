// 获取真实的数据
$.get("http://api.tianapi.com/txapi/ncovcity/index?key=4c2072d494ce2d0aa98c398743990ac6",
    function (data, status) {
        // console.log(data); // data就是获取到的数据，输出到控制台查看
        var arr = [];
        // 处理数据，成地图需要的数据结构
        data.newslist.forEach(item => {
            // 循环的过程中，向空数组中加入所需的内容
            arr.push({
                name: item.provinceShortName, // name固定
                value: item.confirmedCount, // value固定
                zuixin: item.currentConfirmedCount, // 当前确诊
                zhiyu: item.curedCount,
                siwang: item.deadCount
            });
        });
        // 循环结束之后，我们就得到了地图需要的数据了。数据是arr，但是还稍微有点问题
        // 手动自行添加一个南海诸岛的数据
        arr.push({
            name: '南海诸岛', // name固定
            value: '未统计', // value固定
            zuixin: '未统计', // 当前确诊
            zhiyu: '未统计',
            siwang: '未统计'
        });
        // 到此为止，所有的数据全部处理好了。
        console.log(arr);

        // 下面开始做地图
        // 1. 初始化
        var myChart = echarts.init(document.getElementById('main'));

        // 2. 配置
        var option = {
            // 标题部分
            title: {
                text: '众志成城，抗击疫情',
                textStyle: {
                    fontSize: 28
                },
                left: 'center', // 左右居中
                subtext: '传智播客前端与移动开发教研部',
                subtextStyle: {
                    fontSize: 14
                }
            },
            // 设置地图及数据
            series: [{
                type: 'map',
                map: 'china', // 指定是中国地图
                data: arr, // 设置地图中的数据
                label: { // 控制默认显示省的名字
                    show: true
                }
            }],
            tooltip: { // 鼠标悬浮提示
                formatter: function (params) { // 允许我们自定义悬浮提示的内容
                    console.log(params);
                    // return 你需要提示的内容
                    return `累计确诊：${params.data.value}<br/>
                    当前确诊：${params.data.zuixin}<br/>
                    治愈：${params.data.zhiyu}<br/>
                    死亡：${params.data.siwang}<br/>
                    `;
                }
            },
            visualMap: {
                type: 'piecewise',
                pieces: [
                    { gt: 10000 }, // 大于10000
                    { gt: 5000, lte: 10000 },
                    { gt: 1000, lte: 5000 },
                    { gt: 500, lte: 1000 },  // (900, 1500]
                    { gt: 100, lte: 500 },  // (310, 1000]
                    { gt: 10, lte: 100 },   // (200, 300]
                    { gt: 0, lte: 10 },       // (0, 10]
                ],
                inRange: {
                    color: ['#ffcfc3', '#eda595', '#d27b64', '#d5462a', '#a8352e', '#6a211d', '#562a2a']
                }
            }
        };

        // 3. 生成地图
        myChart.setOption(option);
    });
