var data1 = ['管理员项', '客户信息', '管理动作', '业务考评', '资产管理维护', '分析图表', '退出'];
var data2 = [
    ['权限分配', '部门设置', '员工管理', '押品设置', '操作纪录', "客户性质", "货款产品", "收款方式", "合作银行", "全部银行", "渠道"],
    ['费用发放', '相关人员', '客户照片', '数据导入', '贷款明细', '还款明细'],
    ['客户签约', '签约审核', '风控验收', '货款到款', '货款发放', '客户调查'],
    ['业绩情况', '市场开放', '市场维护', '费用支出'],
    ['资产管理', '设备设置', '设备保修', '保修审核', '已审核问题'],
    ['月日均变化图', '贷款笔数变化图'],
    ['通知', '个人资料', '退出']
];

// array = [1,2,3];
// array2 = [[11],[21],[31]];
// array[0] = 1;
// array[1][1] = 2;
// [1,11,2,21,3,31]
var datas = new Array();
for (var i = 0; i < data1.length; i++) {
    datas.push(data1[i]);
    // datas.push(data2[i]);
    var dd = data2[i];
    for (var j = 0; j < dd.length; j++) {

        datas.push(dd[j]);
    }
    // if(i == 0)break;
}
console.log(datas);


function initTree(t) {
    var tree = document.getElementById(t);

    var lists = tree.getElementsByTagName('li');
    for (var i = 0; i < lists.length; i++) {
        var item = lists[i]; //li
        (function (num) {
            var sub_ul = item.getElementsByTagName('ul');
            var a_el = item.getElementsByTagName('a');
            var b_el = item.getElementsByTagName('b');
            if (sub_ul.length != 0) { //1表
                sub_ul[0].style.display = 'none';
                a_el[0].onclick = function () {
                    if (sub_ul[0].style.display == 'block') {
                        sub_ul[0].style.display = 'none';
                        b_el[0].style.backgroundImage = 'url("./sources/images/arrow-right.png")';
                    } else {
                        sub_ul[0].style.display = 'block';
                        b_el[0].style.backgroundImage = 'url("./sources/images/arrow-down.png")';
                    }
                }
            } else { //2表

                a_el[0].onclick = function () {
                    var li_el = this.parentNode.parentNode.getElementsByTagName('li');
                    for (var i = 0; i < li_el.length; i++) {
                        var sub_a = li_el[i].getElementsByTagName('a');
                        // sub_a[0].classList.remove('item-selected');
                        sub_a[0].style.borderLeft = '4px solid #f8f6f7';
                    }
                    // this.classList.add('item-selected');
                    this.style.borderLeft = '4px solid #f47f03';
                    console.log(datas[num]);
                    document.getElementById('show').innerText = datas[num];

                }
            }

        })(i);
    }

}

function createLeftNavs(id) {
    var ul_el = document.getElementById(id);
    if (data1.length != 0) {
        for (var i = 0; i < data1.length; i++) {
            var li = document.createElement('li');
            var b = document.createElement('b');
            var a = document.createElement('a');
            a.innerText = data1[i];
            a.style.background = '#f5f3f3 url("./sources/images/home.png") no-repeat left center';
            a.setAttribute('href', 'javascript:void(0);');
            li.appendChild(b);
            li.appendChild(a);
            var sub_ul = document.createElement('ul');
            sub_ul.classList.add('sub-item');
            for (var j = 0; j < data2[i].length; j++) {
                var s_li = document.createElement('li');
                var s_a = document.createElement('a');
                s_a.innerText = data2[i][j];
                s_li.appendChild(s_a);
                sub_ul.appendChild(s_li);
            }
            li.appendChild(sub_ul);
            ul_el.appendChild(li);
        }
    }

}

var pages_total_data = new Array();
//显示页内容
function showPage(el, page) {


    for (var i = 0; i < 20; i++) {
        if ((pages_total_data.length) === (20 * (page - 1) + i)) {
            break;
        }
        var tr = document.createElement('ul');
        for (var j = 0; j < 2; j++) {
            var td = document.createElement('li');
            td.innerText = 'td' + (i + 1) + (j + 1);
            td.style.display = "inline-block";
            tr.appendChild(td);
        }
        //console.log(el);
        el.appendChild(tr);
    }

}


//获取当前指定显示数据容器
function getContentWrapper(page) {
    var get_content = document.getElementById('t_body');
    if (get_content) {
        get_content.parentNode.removeChild(get_content);
    }
    get_content = document.createElement('div');
    get_content.setAttribute('id', 't_body');
    document.getElementsByClassName('table')[0].appendChild(get_content);
    return get_content;
}
//创建页码
var currentPage = 1; //当前页数，pages是总页数
function createPages(cla, pages) {
    var pages_el = document.getElementsByClassName(cla)[0];
    var p_ul = pages_el.getElementsByTagName('ul')[0];

    var li_count = 0;

    if (pages < 5) {

    } else {

    }
    for (var index = 0; index < 5; index++) {
        var page_li = document.createElement('li');
        switch (index) {
            case 0:
                {
                    var a_el = document.createElement('a');
                    a_el.setAttribute('href', 'javascript:void(0);')
                    a_el.innerText = '当前页:';
                    var current_sapn = document.createElement('span');
                    current_sapn.innerText = '1';
                    current_sapn.style.color = '#f47f03';
                    var total_span = document.createElement('span');
                    total_span.innerText = '/' + pages.length;
                    a_el.appendChild(current_sapn);
                    a_el.appendChild(total_span);
                    page_li.appendChild(a_el);
                }

                break;

            default:
                {
                    var a_el = document.createElement('a');
                    a_el.innerText = index;
                    a_el.setAttribute('href', 'javascript:void(0);');
                    (function (num) {
                        a_el.onclick = function () {
                            switch (num) {
                                case 1:
                                    if (currentPage == 1) {
                                        break; //如果页面就是第一页，不执行也不刷新
                                    }
                                    //执行，刷新当前页的数据
                                    currentPage = 1;
                                    break;
                                case 2:
                                    if (currentPage != 1)
                                        currentPage -= 1;
                                    else {

                                    }
                                    break;
                                case 3:
                                    if (currentPage < pages)
                                        currentPage += 1;
                                    else {

                                    }
                                    break;
                                case 4:
                                    if (currentPage == pages)
                                        break;
                                    else {
                                        currentPage = pages;
                                    }
                                default:
                                    break;
                            }
                        }
                    })(index);
                }
                break;
        }
    }

    for (i = 0; i < 2; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', 'javascript:void(0);');
        a.innerText = i + 1;
        li.appendChild(a);
        //闭包
        (function (num) {
            a.onclick = function () {
                //实现切换页
                var el = getContentWrapper();
                currentPage = num + 1;
                showPage(el, currentPage);
            }
        })(i);
        p_ul.appendChild(li);

    }
}

function getCarsAndHourse() {
    //创建XMLHttpRequest对象
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8885/data";
    // open()初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求。
    // open() 的第三个参数中使用了 "true"，该参数规定请求是否异步处理。
    xhr.open('GET', url, true);
    // send()发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
    xhr.send();
    xhr.onreadystatechange = function () {
        //readyState：HTTP 请求的状态.
        //当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4。
        if (4 == xhr.readyState) {    
        // status由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 "Not Found" 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 "Not Found" 错误。
        // 当 readyState 小于 3 的时候读取这一属性会导致一个异常。
            if (200 == xhr.status) {
                var obj = JSON.parse(xhr.responseText);
                var datas = {};
                var temp = new Array();
                for (var i = 0; i < obj['hourses'].length; i++) {
                    temp.push(obj['hourses'][i]['score']);
                }
                datas.hourses = temp;

                temp = [];
                for (var i = 0; i < obj['cars'].length; i++) {
                    temp.push(obj['cars'][i]['score']);
                }
                datas.cars = temp;

                drawTu(datas);

            }
        }
    }
}

function drawTu(datas) {
    var tu1 = document.getElementById("data_show").getElementsByClassName('row')[1].getElementsByClassName('col')[0];
    //console.log(tu1);   
    var myBar = echarts.init(tu1);
    var option = {
        //title标题组件，包含主标题和副标题。
        title: {
            text: '已完成业务年统计图',
            subtext: '2018年'
        },
        //图例
        legend: {
            data: ['房贷', '车贷']
        },
        //提示框
        tooltip:{
            trigger:'axis'
        },
        //x轴
        xAxis: {
            //
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value',
            name: '单',
            min: 0,
            max: 300,
            //强制设置坐标轴分割间隔
            interval: 100,
            axisLable: {
                //刻度标签的内容格式器（格式化）
                formatter: '{value}'
            }
        },
        series: [{
                name: '房贷',
                type: 'bar',
                barWidth:10,
                color: '#3db6f5',
                data: datas['hourses']
            },
            {
                name: '车贷',
                type: 'bar',
                color: '#fb8005',
                data: datas['cars']
            }
        ]

    }
    myBar.setOption(option);
    
}