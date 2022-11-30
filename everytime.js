const puppeteer = require("puppeteer");
const everytimeUser = require('./index.js')

async function crawl() {
  // 가상 브라우져를 실행, headless: false를 주면 벌어지는 일을 새로운 창을 열어 보여준다(default: true)
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({width:2500,height: 800,})

  //회원가입할때 에타 아이디 비밀번호도 입력받거나.. 에타 로그인창을 따로 만들어야...

  const id = everytimeUser.getID(); // 에브리타임 아이디를 넣어주세요
  const pw = everytimeUser.getPW(); // 에브리타임 비밀번호를 넣어주세요

  console.log(id + " and " + pw)

  //페이지로 이동
  await page.goto('https://everytime.kr/login');

  //console.log(page);
  /*await page.evaluate((id,pw) =>{
    document.querySelector('input[name="userid"]').value = id;
    document.querySelector('input[name="password"]').value = pw;
  }, id, pw);*/

  await page.type('input[name="userid"]',id);
  await page.type('input[name="password"]',pw);
  //console.log(page.url());

  await page.click('input[type="submit"]');
  
  if(page.url() === "https://everytime.kr/"){
    
    await page.goto('https://everytime.kr/timetable');
    
    await page.waitForSelector('#container > div');
    await page.$eval('#container > ul[class="floating"]', el => el.remove());
    let element = await page.$('#container > div');

    //await element.screenshot({path: 'timetable.png'});
    await element.screenshot({path: 'public/image/timetable.png'});
  
    //await page.screenshot({path:'test.png'});

    page.close();
    browser.close();
  }
};

crawl();  
