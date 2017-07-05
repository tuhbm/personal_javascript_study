//1. 클래스와 아이디 선택자 사용하기
//2. 각객체 지정하기
// 기본 변수 선언 해야 할것 Start
var doc = window.document;
var btnStart = doc.getElementById('btnStart');
var btnStop = doc.getElementById('btnStop');
var slide = doc.getElementsByClassName('sliders')[0];
var slideInner = slide.getElementsByClassName('slider_inner');
var slideList = slideInner[0].getElementsByTagName('li');
var slideListCount = slideList.length;
var num = 0;
var isPlaying = false; //현재 플레잉 여부
var direction = 0; //슬라이드 방향체크 0일경우 next, 1일경우 prev
function innerWidth() { //슬라이드 리스트 크기 li갯수*300
    slideInner[0].style.width = 300 * slideListCount + 'px';
}
innerWidth();
// 기본 변수 선언 해야 할것 End


function slideMove(){
    function moveNext(){  //next 무브
        num ++;
        slideInner[0].style.left = -(num*300) +'px';
        if(num >= slideListCount){
            num = 0;
            slide.style.display = 'none';
            slideInner[0].style.left = 0+'px';
            slide.style.display = 'block';
        }
        return num;
    }
    function movePrev(){  //prev 무브
        num --;
        slideInner[0].style.left = -(num*300) +'px';
        if(num < 0){
            num = 4;
            slide.style.display = 'none';
            slideInner[0].style.left = -((slideListCount-1)*300)+'px';
            slide.style.display = 'block';
        }
        return num;
    }
    var timer = setInterval(function(){  //타이머
        if(direction === 0){
            moveNext();
        }else{
            movePrev();
        }
    },3000);

    btnStop.onclick =function(){  // 스탑버튼 클릭 이벤트
        isPlaying = false;
        clearInterval(timer);
    };
}
// var slide1 = new slideMove();
// console.log(slide1);
btnStart.onclick = function(){  //스타트버튼 클릭 이벤트
    if(isPlaying === false){
        isPlaying = true;
        slideMove();
    }
};






function slideMove2(selector){
    this.$selector = document.getElementsByClassName(selector)[0];
    this.$inner = this.$selector.children[0];
    this.length = this.$inner.children.length;
    this.current = 1;
}
slideMove2.prototype.move = function( page ){
    var moveValue = (page-1) * -300;
    this.$inner.style.left = moveValue + "px" ;
    this.current = page;
    return moveValue;
};
slideMove2.prototype.limitedMove = function( page ){
    if(page > this.length){
        this.move(1);
    }else if(page < 1){
        this.move(this.length);
    }else{
        this.move(page);
    }
};
slideMove2.prototype.prev = function(){
    this.limitedMove(this.current-1);
};
slideMove2.prototype.next = function(){
    this.limitedMove(this.current+1);
};
slideMove2.prototype.autoPlay = function( direction ){};
slideMove2.prototype.showName = function( ){
    return this.$selector;
};

var jhSlide1 = new slideMove2("slider1");
var jhSlide2 = new slideMove2("slider2");
var jhSlide3 = new slideMove2("slider3");

// 5
// jhSlide1.limitedMove(6); // === 1;


// jhSlide1.move(1); // === left: 0;
// jhSlide1.move(5); // === left: -1200;


// jhSlide1.prev();
// jhSlide1.next();
//
// jhSlide2.prev();
// jhSlide2.next();
//
//
// console.log(jhSlide1.showName());
// console.log(jhSlide2.showName());
