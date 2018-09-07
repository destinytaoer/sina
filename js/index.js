let $tabBox = $('.tabBox'),
  $fixed = $('.fixed'),
  $tabLi = $('.tabBox li'),
  $fixedLi = $('.fixed li'),
  $ul = $('.ulBox'),
  $listBox = $('.listBox');

let $newsBox = $('.newsBox'),
  $picBox = $('.picBox'),
  $videoBox = $('.videoBox');


function getData(url, cb) {
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    success: cb
  });
}

//=> lazyLoad
function loadImg(ele) {
  if (ele.loaded) return;
  let sT = document.documentElement.scrollTop,
    cH = document.documentElement.clientHeight,
    tarT = $(ele).offset().top;
  if (sT + cH > tarT) {
    $(ele).addClass('load');
    ele.loaded = true;
  }
};

//=> LOAD-IMG-ALL：所有图片的懒加载（调用前面的单个懒加载方法）
function loadImgAll(eles) {
  [].forEach.call(eles, (item) => {
    loadImg(item);
  });
};
let oImgs = document.getElementsByTagName('img');

window.addEventListener('scroll', function () {
  loadImgAll(oImgs);
});

let tabRender = (function () {
  let cur = 0;

  function show() {
    console.log('show');
    switch (cur) {
      case 0:
        newsRender.init();
        break;
      case 1:
        picRender.init();
        break;
      case 2:
        videoRender.init();
    }
  }

  function click() {
    $tabLi.on('click', function () {
      let index = $(this).index();
      if (index === cur) return;

      document.documentElement.scrollTop = $tabBox[0].offsetTop;

      $(this).addClass('current')
        .siblings().removeClass('current');
      
      $fixedLi.eq(index).addClass('current')
        .siblings().removeClass('current');
      
      cur = index;
      show();
    });

    $fixedLi.on('click', function () {
      let index = $(this).index();
      if (index === cur) return;

      document.documentElement.scrollTop = $tabBox[0].offsetTop;

      $(this).addClass('current')
        .siblings().removeClass('current');     
      console.log($tabBox);
      $tabLi.eq(index).addClass('current')
        .siblings().removeClass('current');
      
      cur = index;
      show();
    });
  }

  function scrolling() {
    $(document).on('scroll', function (e) {
      let scrT = document.documentElement.scrollTop,
        tarT = $tabBox[0].offsetTop;
      
      if (scrT >= tarT) {
        $fixed.show();
      } else {
        $fixed.hide();
      }
    });
  }

  return {
    init: function (index) {
      cur = index || 0;
      $tabLi.eq(cur).addClass('current')
        .siblings().removeClass('current');
      
      $fixedLi.eq(cur).addClass('current')
        .siblings().removeClass('current');
      
      show();

      click();
      scrolling();
    }
  }
})();

let bannerRender = (function () {
  function bindHTML(data) {
    let str = '';
    data.forEach(item => {
      let {
        img,
        title
      } = item;
      str += `<li class="swiper-slide">
      <a href="javascript:;">
        <img src="${img}"
          alt="${title}">
        <div>${title}</div>
      </a>
    </li>`
    });
    $ul.html(str);
    loadImgAll(oImgs);
  }

  return {
    init: function () {
      getData('./data/banner.json', function (data) {
        bindHTML(data);
        let mySwiper = new Swiper('.banner', {
          autoplay: {
            // 用户操作后 仍然自动播放
            disableOnInteraction: true,
            delay: 3000,
          },
          loop: true,
          pagination: {
            el: '.pageBox',
            type: 'fraction',
            currentClass: 'currentPage', // 变动数字的 盒子的类名
            totalClass: 'totalPage' // 总共数字 盒子的类名
          }
        })
      })
    }
  }
})();

let newsRender = (function () {
  function bindHTML(data, pre) {
    pre = pre || '';
    let str = pre;
    data.forEach(item => {
      let {
        img,
        title,
        num,
        mark,
        type
      } = item;

      num = num > 10000 ? (num / 10000).toFixed(1) + '万' : num;
      let markClass = ['广告', '视频', 'APP专享']

      switch (type) {
        // 只有文字的新闻
        case 0:
          str += `<a href="javascript:;">
          <div class="textBox">
            <h2>${title}</h2>
            <div class="commentBox ${ mark ? 'mark' : null}">
              ${mark? `<mark>${mark}</mark>`:'' }
              <em>
                <span>${num}</span>
                <span class="icon_com"></span>
              </em>
            </div>
          </div>
        </a>`;
          break;
          // 一张图的新闻
        case 1:
          str += `<a href="javascript:;">
          <div class="imgBox">
            <img src="${img}"
              alt="">
          </div>
          <div class="textBox">
            <h2>${title}</h2>
            <div class="commentBox ${ mark ? 'mark' : null}">
              ${mark? `<mark>${mark}</mark>`:'' }
              <em>
                <span>${num}</span>
                <span class="icon_com"></span>
              </em>
            </div>
          </div>
        </a>`;
          break;
          // 三张图的新闻
        case 3:
          str += `<a class="threeBox" href="##">
          <h2>${title}</h2>
          <div class="threePic">
            <div>
              <img src="${img[0]}"
                alt="">
            </div>
            <div>
              <img src="${img[1]}"
                alt="">
            </div>
            <div>
              <img src="${img[2]}"
                alt="">
            </div>
          </div>
          <div class="commentBox ${mark ? 'mark' : null}">
            ${ mark ? `<mark>${mark}</mark>` : '' }
            <em>
              <span>${num}</span>
              <span class="icon_com"></span>
            </em>
          </div>
        </a>`;
          break;
        case 4:
          str += `<a class="threeBox" href="##">
          <h2>${title}</h2>
          <div class="threePic">
            <div>
              <img src="${img}"
            alt="">
            </div>
          </div>
          <div class="commentBox ${mark ? 'mark' : null}">
            ${mark? `<mark>${mark}</mark>`:'' }
            <em>
              <span>${num}</span>
              <span class="icon_com"></span>
            </em>
          </div>
        </a>`;
      }
    });
    $listBox.html(str);
    loadImgAll(oImgs);
  }

  function getMore(url, cb) {
    getData(url, function (data) {
      bindHTML(data, $listBox.html());
      cb && cb();
    })
  }

  return {
    init: function () {
      $newsBox.show();
      $picBox.hide();
      $videoBox.hide();
      $picBox.children('ul').html('');
      $videoBox.children('ul').html('');
      let isBinding = false;
      getData('./data/newsList.json', function (data) {
        bindHTML(data);
      });

      //=> 获取下拉加载更多，应该使用 DOM0 级事件绑定，只绑定一个，防止执行多次 init 造成绑定了多个相同行为事件
      //=> 也可以将 事件程序 封装为一个函数，使用 DOM2 级就会认为是重复事件，但是切换选项卡的时候，应该判断是否是当前这个页面才执行加载
      window.onscroll = function () {
        let scrT = document.documentElement.scrollTop,
          tarT = $listBox[0].offsetTop + $listBox[0].clientHeight,
          cliH = document.documentElement.clientHeight;

        if (scrT > tarT - cliH && !isBinding) {
          isBinding = true;
          getMore('./data/newsList.json', function () {
            isBinding = false;
          });
        }
      };
    }
  }
})();

let picRender = (function () {

  let bindHTML = function (data) {
    data.forEach(function (item, index) {
      let str = ``;
      let {
        img,
        num,
        title,
        mark
      } = item;
      let li = document.createElement('li');
      str = `<figure>
          <img src="${img}" realSrc="${img}" alt="">
          <mark>${num ? num + '张' : mark}</mark>
        </figure>
        <h3>${title}</h3>`;
      li.innerHTML = str;
      getMinUl().appendChild(li);
    });
    loadImgAll(oImgs);
  };

  //=> GET-MIN-UL：获取页面中高度最小的 UL
  let getMinUl = function () {
    let oUl = $('.picBox ul');
    let aUl = [oUl[0], oUl[1]];
    aUl.sort(function (a, b) {
      return a.clientHeight - b.clientHeight;
    });
    return aUl[0];
  };

  function getMore(url, cb) {
    getData(url, function (data) {
      bindHTML(data);
      cb && cb();
    })
  }

  return {
    init: function () {
      $picBox.show();
      $newsBox.hide();
      $videoBox.hide();
      $listBox.html('');
      $videoBox.children('ul').html('');
      let isBinding = false;
      getData('./data/picList.json', function (data) {
        bindHTML(data);
      });
      
      window.onscroll = function () {
        let temp = getMinUl();
        let sT = document.documentElement.scrollTop,
          cH = document.documentElement.clientHeight,
          tarT = temp.offsetTop + temp.clientHeight;

        if (sT + cH > tarT && !isBinding) {
          isBinding = true;
          getMore('./data/picList.json', function () {
            isBinding = false;
          });
        }
      };
    }
  }
})();

let videoRender = (function () {

  let bindHTML = function (data, pre) {
    let str = pre || '';
    data.forEach(function (item, index) {
      let {
        img,
        title,
        time
      } = item;
      str += `<li>
        <a href="javascript:;">
          <figure>
            <img src="${img}" alt="">
            <time>${time}</time>
            <i class="icon_b_video"></i>
          </figure>
          <h3>${title}</h3>
        </a>
      </li>`;
    });
    $videoBox.children('ul').html(str);
    loadImgAll(oImgs);
  };

  function getMore(url, cb) {
    getData(url, function (data) {
      bindHTML(data, $videoBox.children('ul').html());
      cb && cb();
    })
  }

  return {
    init: function () {
      $videoBox.show();
      $newsBox.hide();
      $picBox.hide();
      $listBox.html('');
      $picBox.children('ul').html('');

      getData('./data/videoList.json', function (data) {
        bindHTML(data);
      })
      let isBinding = false;

      window.onscroll = function () {
        let scrT = document.documentElement.scrollTop,
          tarT = $videoBox.children('ul')[0].offsetTop + $videoBox.children('ul')[0].clientHeight,
          cliH = document.documentElement.clientHeight;

        if (scrT > tarT - cliH && !isBinding) {
          console.log();
          isBinding = true;
          getMore('./data/videoList.json', function () {
            isBinding = false;
          });
        }
      };
    }
  }
})();

tabRender.init(0);
bannerRender.init();