/**
 * @title 显示柱状图
 * @since 2018-07-16
 * @param VariflightID
 * @param VariflightData
 */
function loadVariflightData(){
  /**
   * 水印
   * @type {string}
   */
  bgPatternSrc = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAUAAAABaBAMAAAA7hJLQAAAAJ1BMVEUAAAAzgNAzgNAzgNAzgNAzgNAzgNAzgNAzgNAzgNAzgNAzgNAzgNCsJk8FAAAADXRSTlMATSc6E0YMMgUdPxgidYBE3QAABL1JREFUaN7swYEAAAAAgKD9qRepAgAAAAAAAOB2y923aSgK4wcnuKFh4EvqhhaGRFURY1uLl1hSCA8BQw0SArGYN4IFi4KQWMJbMAUh3gtBCMFWBAxsZEBC8E/xHd/bxkVpg4eiCOUnub65PTn3Z/vcE/fp06dPnz59VghslJS4v9rjqCTy4HmKbOlBQZYiV6sKydbqkuQkyuLWlL0yWRRpevVEthUVPLNfkjgYEvIR3yRJBetkFZSiCmaBajKbvbZwJQQrHCfIo2CEFi/WwkxS0AXCP7PRet1KCEYcJwk8+3cR973QCpZUUJ4cln8lOPmHYKT3xu1QVxQsC1FBsnKC2b025Zm9CcE7NVFs9a3FsM5pgFJbQvBMaARNITsJQf1qMoNb0/Cq/AXngeMqmL0KbBXXDzx/SnI/AfvQbuKyyABLLjdu5q5s/4INGX9ukeDYFAcM8P0dFNwNXBdnC4r+hMS85CI8cf5wXeS0nw/4+TS8snTFDUAK4k6ChFlT999BKCbqtt5Yjts5lIAhyiUEzfEQJhVGAYxKBsTcw9sg25mKvBOZRgTgRRzclbM2qwNlxgi6UEZEWYMN+pznzBx7TrxuJ8EIR4JYMKaREGyCHJMK1LxOQSUACaUbEd7mnjBrLthRv0iXGkrsvZXD4VqMipJDiVEeD87pGIwIOwi6XNtBYb9Q8kILE+4+DJlO6MBrZJvVLPAj20SZgt6Pi4w6F/FDF1x4dclRUL7avaqH3ApV3W5rygUUO8XqaXIcP2cjqMxZQd1IJhBsQYNY194kd/U/92QAG3W8noJHJQ80WDkT0oW1GEk0BpTsONmbWwhdRtk5Xb+eFCxbQeMTFU0GJyn4MS5nxs+YBadRNlGD3QV1C1gpdyyASU9yz5pAdf5n12GUnTMB6QQrcSbj5aLUFsx0F8xgxgquCYAFQTcCMYKDeD2Iy3ZuseAsXxbq84J5jLCSCx0EJyFGcE7XKqYUnLCCEbgJ5wX3AKNNK8jbdxMNkUecC+YFO+3iwHt+AMNLC7ZQbQumvoMOvE0yaQXdADvr01aQBfgIIU+4IZXlBKdBysvdwUZKwWQNrsJ7WRB0dFNYQd2Z0SgjObe84EfTeTvV4FyiBgupBB27i7VA2oIZvE4IVrxgY5ysi2BQGpsKZeldvBozZsEUgqYPDsSCDVkDXaZoHnxOa7ByXNQUw0babS4jmI0fxiLBYa2W7TQb0dY6oF3sLI6lEmR9fDjYZPBNnMhH0KXw9JXDLj8OaO8P9crpq22Wcx0FvdAIlj5zU7cF16B06VuGVg4weyh4zcqe3RWgnE7wJJQCY4kKtgCPYkrV4aFqTMjlSEfBCMPmEccZwgVBF/pWYS6ajMgjs0Q6QW1/HruXq+fIvpOEFQBsr3kORcxfegAda3AaQ7FgC8rRBUFhlsKgPtf7IGXTaq+nFJTzgbf58U4mCUYbn3aI5K7iTT3f9K4NbKtrDRJ/W3wpnMtwdIXBMuDPxYfiBMfl8RQvka0T9LmylRflX46/cUNrUGRf4F3j6VTTmxUu5YciY0yz1i/LvyPD8qdlUXqV+OdGot4VPImGeRfoVVajELrjGJZexfahhvQsT0C2Su+Se+Zv2yT/G78Bryf8WUitpXIAAAAASUVORK5CYII=";
  bgPatternImg = new Image;
  bgPatternImg.src = bgPatternSrc;
  bgPatternWth = 320, bgPatternHit = 90;





  var option = {
    title:{
      text: '2018国内五航司客座率\t',
      x:'center',
    },
    graphic: [{
      type: "image",
      top: 10,
      left: 10,
      z: 6,
      style: {
        image: bgPatternImg,
        width: bgPatternWth,
        height: bgPatternHit
      }
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      formatter : '{b}<br/>{a0}:{c0}%',
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend:{
      data:["客座率"],
      bottom: 0,
      show: true
    },
    xAxis: [
      {
        type: 'category',

        data: [
          '春秋航空',
          '吉祥航空',
          '南航',
          '东航',
          '国航',


        ],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min:0,
        max:100,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name:'客座率',
        type:'bar',
        data:[89.01,
          86.24,
          82.44,
          82.29,
          80.6,

        ],

        itemStyle : {
          normal: {
            color: function(params) {
              var colorList = [
                '#1790cf','#99d2dd','#88b0bb',
                '#1c7099','#038cc4','#75abd0','#afd6dd',
                '#1790cf','#99d2dd','#88b0bb',
                '#1c7099','#038cc4','#75abd0','#afd6dd',
                '#1790cf','#99d2dd','#88b0bb',
                '#1c7099','#038cc4','#75abd0','#afd6dd'
              ];
              return colorList[params.dataIndex]
            },
            label : {
              show: true,
              position: 'top',
              formatter: '{c}%'
            }
          }
        }
      },

    ]
  };


  /**
   * 载入图表
   */
  var myChart = echarts.init(document.getElementById("main"), theme_blue());
  myChart.setOption(option);
  myChart.on("click",
    function () {
      window.open("https://data.variflight.com/");
    }
  );
}

/**
 * 入口函数
 */
loadVariflightData();
