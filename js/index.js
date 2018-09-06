let tabRender = (function () {
  let $tabBox = $('.tabBox'),
    $fixed = $('.tabBox.fixed');

  return {
    init: function () {
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
  }
})();
tabRender.init();

let bannerRender = (function () {

  function getData(url, cb) {
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json',
      success: cb
    });
  }

  function bindHTML(data) {
    let str = '',
      $ul = $('.ulBox');
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

bannerRender.init();

let listBoxRender = (function () {
  function getData(url, cb) {
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json',
      success: cb
    });
  }

  function bindHTML(data) {
    let str = '',
      $listBox = $('.listBox');
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
            <img src="${img}"
                alt="">
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
  }

  function getMore(url, cb) {
    console.log('getmore');
    getData(url, function (data) {
      let str = '',
        $listBox = $('.listBox');
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
            <img src="${img}"
                alt="">
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
      $listBox.html($listBox.html() + str);
      cb && cb();
    })
  }

  return {
    init: function () {
      let isBinding = false;
      getData('./data/list.json', function (data) {
        bindHTML(data);
      });
      $(document).on('scroll', function () {
        let $listBox = $('.listBox');
        let scrT = document.documentElement.scrollTop,
          tarT = $listBox[0].offsetTop + $listBox[0].offsetHeight,
          winH = document.documentElement.clientHeight;

        console.log(tarT);
        if (scrT >= tarT - winH && isBinding === false) {
          isBinding = true;
          getMore('./data/list.json', function () {
            isBinding = false;
          });
        }
      })
    }
  }
})();

listBoxRender.init();