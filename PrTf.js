//Секундомер
var secWatch = document.getElementById("secWatch"),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;
function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  secWatch.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}
timer();
//конец секундомера

//карточки во втором блоке
$("figure").hover(
  function () {
    // задаем функцию при наведении курсора на элемент
    $(this).find(".On").css({
      transform: "scale(2)",
      opacity: "1",
      "transition-duration": "1s",
    });
    $(this)
      .find(".readyProject")
      .css({ opacity: "1", "transition-duration": "1s" });
    $(this).find(".Off").css("opacity", "0");
    $(this).find(".description").css("opacity", "0");
  },
  function () {
    // задаем функцию, которая срабатывает, когда указатель выходит из элемента
    $(".On").css({ transform: "scale(1)", opacity: "0" });
    $(".readyProject").css("opacity", "0");
    $(".Off").css("opacity", "1");
    $(this).find(".description").css("opacity", "1");
  }
);
// конец карточки во втором блоке

//Анимированное меню
let menu = document.querySelector("#menu"),
  isOpened = false;

setInterval(() => {
  if (isOpened) {
    menu.classList.remove("-opened");
  } else {
    menu.classList.add("-opened");
  }

  isOpened = !isOpened;
}, 1500);
//конец Анимированное меню

//Перетаскивание картинок
const dragAndDrop = () => {
  const blockses = document.querySelectorAll(".js-cell");
  const ideaIMG = document.querySelector("#HeadIdea");

  const dragstart = function () {
    setTimeout(() => {
      this.classList.add("hide"); //прячем картинку после того как взяли ее
    }, 0);
  };

  const dragend = function () {
    this.classList.remove("hide"); //отображаем еартинку когда отпустили
  };

  const dragOver = function (event) {
    event.preventDefault();
  };

  const dragEnter = function (event) {
    //пересечение границы блока
    event.preventDefault();
    this.classList.remove("hovered");
  };

  const dragLeave = function () {
    // покидает границы блока
    this.classList.add("hovered");
  };

  const dragDrop = function () {
    // бросаем картинку
    this.classList.add("hovered");
    this.append(ideaIMG);
  };

  blockses.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragEnter);
    cell.addEventListener("dragleave", dragLeave);
    cell.addEventListener("drop", dragDrop);
    cell.classList.add("hovered");
  });

  const Drop1 = function () {
    ideaIMG.setAttribute("src", "img/HeadIdea.svg");
  };

  const Drop2 = function () {
    ideaIMG.setAttribute("src", "img/work-station.svg");
  };

  const Drop3 = function () {
    ideaIMG.setAttribute("src", "img/CompleteWork.svg");
  };

  blockses[0].addEventListener("drop", Drop1);
  blockses[1].addEventListener("drop", Drop2);
  blockses[2].addEventListener("drop", Drop3);

  ideaIMG.addEventListener("dragstart", dragstart);
  ideaIMG.addEventListener("dragend", dragend);
};
dragAndDrop();

//Перетаскивание картинок на мобилке
const dragAndDropMobile = () => {
  const wrapper = document.querySelector(".howItWorksBlok");
  const empty = Array.from(document.querySelectorAll(".js-cell"));
  const drag = document.querySelector("#HeadIdea");

  drag.addEventListener("touchmove", touchMove);
  //drag.addEventListener('touchend', touchEnd);//Проверить нужно ли эта функция, вдруг компьютерный браузер неправитльно понимает дейстаие touchEnd

  let itemAppend;
  // ------------------------ touchMove
  function touchMove(event) {
    event.preventDefault();

    let touch = event.targetTouches[0];
    drag.style.top = `${
      touch.pageY - wrapper.offsetTop * 1.13 /*- (drag.offsetWidth / 2)*/
    }px`; //Здесь значение 1,13 подобранно методом тыка
    drag.style.left = `${touch.pageX - drag.width / 2}px`;

    empty.map((item) => {
      if (
        drag.getBoundingClientRect().top + drag.offsetWidth / 2 <
          item.getBoundingClientRect().bottom &&
        drag.getBoundingClientRect().right - drag.offsetWidth / 2 >
          item.getBoundingClientRect().left &&
        drag.getBoundingClientRect().bottom - drag.offsetWidth / 2 >
          item.getBoundingClientRect().top &&
        drag.getBoundingClientRect().left + drag.offsetWidth / 2 <
          item.getBoundingClientRect().right
      ) {
        item.classList.remove("hovered");
        itemAppend = item;
      } else {
        item.classList.add("hovered");
      }
    });
  }

  //Проверить нужно ли эта функция на мобилке, вдруг компьютерный браузер неправитльно понимает дейстаие touchEnd
  /*function touchEnd(element) {
  if (itemAppend.classList.contains('hovered')) {// если блок имеет класс hovered
    itemAppend.append(this);
    this.style.top = `${itemAppend.offsetTop}px`;
    this.style.left = `${itemAppend.offsetLeft}px`;
  }
  else {
    this.style.top = `${itemAppend.offsetTop}px`;
    this.style.left = `${itemAppend.offsetLeft}px`;
  }
}
*/
};
dragAndDropMobile();
//Конец Перетаскивание картинок на мобилке

// перемещение кнопочки контактов по наведению на футер с помощью jquery.attr
$(".link").hover(
  () => {
    $(".fab").attr("style", "right:50vw; transition-duration: 1s;");
  },
  () => {
    $(".fab").attr("style", "right:10px; transition-duration: 1s;");
  }
);

//Конец перемещение кнопочки контактов по скролу

// Найти все ссылки начинающиеся на #
const anchors = document.querySelectorAll('a[href^="#"]');

// Цикл по всем ссылкам
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute("href")
      ? anchor.getAttribute("href")
      : "body";
    // Плавная прокрутка до элемента с id = href у ссылки
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
