/**
 * Created by mastermin on 17-10-30.
 */
window.onload=function () {


    var chessBoard=document.getElementById('chessboard');
    var mark=document.querySelectorAll('.result')[0];
    var saying=document.querySelectorAll('p.saying')[0];
    var ctr=chessBoard.getContext('2d');
    var over=false;//游戏是否结束
    //定义赢法统计数组并初始化
    var myWin=[];
    var compWin=[];
    var count=0;
    var owners=true;
    //初始化三维数组
    var resultList=[];
    var chessList=[];
    var nowPos={};
    var yourChessNumber=0;
    var levels='veryEasy';
    drawChessBoard();   //启动棋盘
        init();         //初始化
                        //程序主逻辑
    chessBoard.addEventListener('click',function(e){

        e.stopPropagation();
        if(over||(!owners)){
            return
        }
        var x=e.offsetX;
        var y=e.offsetY;
        var i=Math.floor(x/30);
        var j=Math.floor(y/30);
        //判断是否落子，===0说明未落子
        if(chessList[i][j]===0){
            //黑子记做1，蓝子记做2
            chessMan(i,j,owners);
            yourChessNumber++;
            chessList[i][j]=1;
            for(var k=0;k<count;k++){
                //判断这个位置是否有你的棋子
                if(resultList[i][j][k]){
                    myWin[k]++;//自己的五子完成度
                    compWin[k]=666;//赋值一个较大的数表示电脑则不可能存在这种赢法
                    if(myWin[k]===5){
                            mark.style.height='100%';
                            mark.style.transition='2s';
                            mark.className='result win';
                            saying.innerHTML='恭喜你,击败了电脑!';
                            over=true//表示游戏结束
                    }
                }
            }

            //本人下完棋后还没结束，下棋权利移交给电脑

            if(!over){
                owners=!owners;//电脑获得下棋权利
                compAI()
            }
        }

    });


mark.addEventListener('click',function () {
   mark.style.height=0
});



//------------------------------------------------------
    function init(){
         over=false;//游戏是否结束
        //定义赢法统计数组并初始化
        myWin=[];
         compWin=[];
        count=0;
        owners=true;
        //初始化三维数组
       resultList=[];
        yourChessNumber=0;
        //初始化一个二维数组来记录每个网格中落子情况
        for(var i=0;i<15;i++){
            chessList[i]=[];
            for(var j=0;j<15;j++){
                chessList[i][j]=0
            }
        }
    //定义所有五子连线的情况，用三维数组保存
        for(var i=0;i<15;i++){
            resultList[i]=[]  ;
            for(var j=0;j<15;j++){
                resultList[i][j]=[]
            }

        }

        //所有横线
        for(var i=0;i<15;i++){
            for(j=0;j<11;j++){
                for(var k=0;k<5;k++){
                    resultList[i][k+j][count]=true
                }
                count++
            }
        }

        //所有竖线
        for(var i=0;i<15;i++){
            for(j=0;j<11;j++){
                for(var k=0;k<5;k++){
                    resultList[j+k][i][count]=true
                }
                count++
            }
        }
//所有斜线

        for(var i=0;i<11;i++){
            for(j=0;j<11;j++){
                for(var k=0;k<5;k++){
                    resultList[i+k][j+k][count]=true
                }
                count++
            }
        }

//所有反斜线

        for(var i=0;i<11;i++){
            for(j=14;j>3;j--){
                for(var k=0;k<5;k++){
                    resultList[i+k][j-k][count]=true
                }
                count++
            }
        }


        //初始化赢法统计数组
        for(var i=0;i<count;i++){
            myWin[i]=0;
            compWin[i]=0
        }



    }

    //------------------------------------
//棋盘绘制函数
    function drawChessBoard() {
        ctr.strokeStyle='#aaa';
        ctr.lineWidth=1.5;
        for(var i=0;i<15;i++){
            ctr.moveTo(15+i*30,15);
            ctr.lineTo(15+i*30,435);
            ctr.stroke();
            ctr.moveTo(15,15+i*30);
            ctr.lineTo(435,15+i*30);
            ctr.stroke();
        }
    }


    //----------------------------------
    //棋子绘制函数
    function chessMan(x,y,youcolor){

        var gradient=ctr.createRadialGradient(15+x*30,15+y*30,10,15+x*30,15+y*30,4);
        if(youcolor){
            //黑子
             gradient.addColorStop(0,'#0A0A0A');
             gradient.addColorStop(1,'#666');
        }
        else {
            //篮子
            gradient.addColorStop(0,'blue');
            gradient.addColorStop(1,'#4194ff');
        }
         ctr.beginPath();
        ctr.arc(15+x*30,15+y*30,15,0,2*Math.PI);
        ctr.closePath();
         ctr.fillStyle=gradient;
        ctr.fill();
    }




//-------------------------------------------

//计算机下棋的实现
function compAI(){
var level=levels;
var max=0,u=0,v=0;//分别定义最高得分，以及此时的坐标
var myScore=[];
var compScore=[];

//初始化得分数组
for(var i=0;i<15;i++){
    myScore[i]=[];
    compScore[i]=[];
for(var j=0;j<15;j++){
    myScore[i][j]=0;
    compScore[i][j]=0
}
}


//遍历棋盘算分
for(var i=0;i<15;i++){
    for(j=0;j<15;j++){
        if(chessList[i][j]===0){    //说明此处是空闲的
        for(var k=0;k<count;k++){           //遍历所有赢法
        if(resultList[i][j][k]){

switch (level) {
    //入门级的评分
    case 'veryEasy':
        (function(){
            switch
                (myWin[k])
            {
                case
                1
                :                //黑棋已经实现了一颗棋子
                    myScore[i][j] += 10;//拦截分加10
                    break;
                case
                2
                :
                    myScore[i][j] += 30;//拦截分加30
                    break;
                case
                3
                :                 //黑棋已经实现了三颗棋子
                    myScore[i][j] +=100;//拦截分加100
                    break;
                case 4:
                    myScore[i][j] += 3000;//四颗子的时候拦截价值最大
                    break;

            }


        switch (compWin[k]) {

            case 1:                //电脑已经实现了一颗棋子
                compScore[i][j] += 15;//距离胜利分加15
                break;
            case 2:
                compScore[i][j] += 100;////距离胜利分加100
                break;
            case 3:                 //电脑已经实现了三颗棋子
                compScore[i][j] += 600;//距离胜利分加600
                break;
            case 4:
                compScore[i][j] += 10000;//四颗子必须要走，在下一颗就赢了
                break;
        }
})();
 break;

//简单级的评分
    case 'easy':
        (function(){
            switch
                (myWin[k])
            {
                case
                1
                :                //黑棋已经实现了一颗棋子
                    myScore[i][j] += 10;//拦截分加10
                    break;
                case
                2
                :
                    myScore[i][j] += 30;//拦截分加30
                    break;
                case
                3
                :                 //黑棋已经实现了三颗棋子
                    myScore[i][j] += 150;//拦截分加150
                    break;
                case 4:
                    myScore[i][j] += 5000;//四颗子的时候拦截价值最大
                    break;

            }


            switch (compWin[k]) {

                case 1:                //电脑已经实现了一颗棋子
                    compScore[i][j] += 20;//距离胜利分加20
                    break;
                case 2:
                    compScore[i][j] += 50;////距离胜利分加50
                    break;
                case 3:                 //电脑已经实现了三颗棋子
                    compScore[i][j] += 400;//距离胜利分加400
                    break;
                case 4:
                    compScore[i][j] += 10000;//四颗子必须要走，在下一颗就赢了
                    break;
            }
        })();
        break;
  //普通级的评分
    case 'normal':
                    (function(){
                        switch
                            (myWin[k])
                        {
                            case
                            1
                            :                //黑棋已经实现了一颗棋子
                                myScore[i][j] += 10;//拦截分加10
                                break;
                            case
                            2
                            :
                                myScore[i][j] += 150;//拦截分加150
                                break;
                            case
                            3
                            :                 //黑棋已经实现了三颗棋子
                                myScore[i][j] += 1000;//拦截分加1000
                                break;
                            case 4:
                                myScore[i][j] += 10000;//四颗子的时候拦截价值最大
                                break;

                        }


                        switch (compWin[k]) {

                            case 1:                //电脑已经实现了一颗棋子
                                compScore[i][j] += 20;//距离胜利分加20
                                break;
                            case 2:
                                compScore[i][j] += 180;////距离胜利分加180
                                break;
                            case 3:                 //电脑已经实现了三颗棋子
                                compScore[i][j] += 700;//距离胜利分加700
                                break;
                            case 4:
                                compScore[i][j] += 20000;//四颗子必须要走，在下一颗就赢了
                                break;
                        }
                    })();
                    break;
//困难级的评分
     case 'hard':
                    (function(){
                        switch
                            (myWin[k])
                        {
                            case
                            1
                            :                //黑棋已经实现了一颗棋子
                                myScore[i][j] += 10;//拦截分加10
                                break;
                            case
                            2
                            :
                                myScore[i][j] += 400;//拦截分加400
                                break;
                            case
                            3
                            :                 //黑棋已经实现了三颗棋子
                                myScore[i][j] += 3000;//拦截分加3000
                                break;
                            case 4:
                                myScore[i][j] += 10000;//四颗子的时候拦截价值最大
                                break;

                        }


                        switch (compWin[k]) {

                            case 1:                //电脑已经实现了一颗棋子
                                compScore[i][j] += 20;//距离胜利分加20
                                break;
                            case 2:
                                compScore[i][j] += 450;////距离胜利分加450
                                break;
                            case 3:                 //电脑已经实现了三颗棋子
                                compScore[i][j] += 3300;//距离胜利分加3300
                                break;
                            case 4:
                                compScore[i][j] += 20000;//四颗子必须要走，在下一颗就赢了
                                break;
                        }
                    })();
                    break;

            }
    }

}

//分数计算结束后，找到得分最高的点的坐标
       if(myScore[i][j]>max){
            max=myScore[i][j];
            u=i;
            v=j;
       }
       else if(myScore[i][j]===max){
           if(compScore[i][j]>compScore[u][v]){
               u=i;
               v=j
           }
       }
            if(compScore[i][j]>max){
                max=compScore[i][j];
                u=i;
                v=j;
            }
            else if(compScore[i][j]===max){
                if(myScore[i][j]>myScore[u][v]){
                    u=i;
                    v=j
                }
            }
        }
    }
}
nowPos.x=u;
nowPos.y=v;

        chessMan(u,v,owners);
        chessList[u][v]=2;
        for(k=0;k<count;k++){
            //判断这个位置是否有你的棋子
            if(resultList[u][v][k]){
                compWin[k]++;//电脑的五子完成度
                myWin[k]=666;//赋值一个较大的数表示玩家则不可能存在这种赢法
                if(compWin[k]===5){
                    mark.style.height='100%';
                    mark.style.transition='2s';
                    mark.className='result fail';
                    saying.innerHTML='对不起,下次再接再厉！';
                    over=true//表示游戏结束
                }
            }
        }
        if(!over){
            owners=!owners;//玩家获得下棋权利
        }
    }








    //--------------设置面板逻辑




    (function() {
        var options=document.getElementsByClassName('option')[0];
        var chessmanNum=document.querySelectorAll('.chessmanNum>input')[0];
        var level =document.querySelectorAll('.level>select')[0];
        var withdraw =document.querySelectorAll('.withdraw>button')[0];
        var fail=document.querySelectorAll('.withdraw>button')[1];
        var reset=document.querySelectorAll('.reset>button')[0];

      reset.addEventListener('click',function() {
        chessBoard.height=chessBoard.height;//画布中的元素宽高发生变化画布就会清空

          drawChessBoard();
        init();

          chessmanNum.value=yourChessNumber;

      });

      chessBoard.addEventListener('click',function(){
          chessmanNum.value=yourChessNumber
      });
        fail.addEventListener('click',function(){
            if(yourChessNumber>1) {
                mark.style.height='100%';
                mark.style.transition='2s';
                mark.className='result fail';
                saying.innerHTML='对不起,下次再接再厉！';
                reset.click()//模拟用户点击
            }
        });



            level.addEventListener('click',function (e) {
                levels=e.target.value;
                reset.click()
            });



    })();





};


//设置面板部分





