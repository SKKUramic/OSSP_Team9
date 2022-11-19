var keywords = new Array(0);
var keylen = 0;
var schedules = new Array(0);
var schedulelen = 0;

function addkeyword(){
  var newkey = document.getElementById('keyword').value;

  if(newkey !== ''){
    if(keywords.includes(newkey)){
      alert("이미 존재하는 키워드입니다.\nAlready existing keyword.");
    }
  else{
    keylen++;
    keywords.push(newkey);
    displaykeyword();
    document.getElementById('keyword').value ='';
    }
  }
}

function displaykeyword(){
  document.getElementById('key').innerHTML = "";
  for(let i=0; i<keylen; i++){
    document.getElementById('key').innerHTML += createkeyword(keywords[i]);
  }
}

function createkeyword(keyword){
  return '<label id="'+keyword+'" class="list-group-item d-flex gap-3"><span class="pt-1 form-checked-content"><i class="bi bi-dash-circle" id="'+keyword+'" onclick="removekeyword(this.id)" style="cursor:pointer"></i><i class="bi bi-gear" id="'+keyword+'" onclick="modifykeyword(this.id)" style="cursor:pointer"></i><strong>  ' + keyword +'</strong></span><label>'
}

function removekeyword(keyword){
  for(let i=0; i<keywords.length; i++){
    if(keywords[i] === keyword){
      keywords.splice(i,1);
      keylen--;
      i--;
    }
  }
  displaykeyword();
}

function modifykeyword(keyword){
  document.getElementById(keyword).innerHTML = '<label class="list-group-item d-flex gap-3 bg-light"><span class="pt-1 form-checked-content"><input id="b'+keyword+'" type="text" name="" value="" class="w-50"><input id="'+keyword+'" type="button" name="" value="modify" class="w-30" onclick="modify(this.id)"></span></label>';
}

function modify(keyword){
  mkey = document.getElementById('b'+keyword).value;
  if(mkey !== ''){
    if(keyword === mkey){
      alert('수정 전과 동일한 키워드입니다.\nSame as before.');
    }
    else if(keywords.includes(mkey)){
      alert('이미 존재하는 키워드입니다.\nAlready existing keyword.');
    }
    else{
      for(let i = 0; i < keylen; i++){
        if(keywords[i] === keyword){
          keywords[i] = mkey;
        }
      }
      displaykeyword();
    }
  }
}

function addschedule(){
  schedulelen++;
  var newtitle = document.getElementById('s_title').value;
  var newdead = document.getElementById('s_dead').value;
  schedules.push([newtitle,newdead]);
  console.log(schedules);
  displayschedule();
  document.getElementById('s_title').value="";
  document.getElementById('s_dead').value="";
}

function displayschedule(){
  document.getElementById('schedule').innerHTML = "";
  for(let i = 0; i<schedulelen; i++){
    console.log(schedules[i]);
    document.getElementById('schedule').innerHTML += createschedule(schedules[i]);
  }
}

function createschedule(schedule){
  return '<label class="list-group-item d-flex gap-3"><input class="form-check-input flex-shrink-0" type="checkbox" value=""  style="font-size: 1.375em;"><span class="pt-1 form-checked-content"><strong>'+schedule[0]+'</strong><small class="d-block text-muted"><svg class="bi me-1" width="1em" height="1em"><use xlink:href="#calendar-event"/></svg>'+schedule[1]+'</small></span></label>'
}
