function livechatHandler() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);

  var liveChatParams = urlParams.get('livechat') === 'true';

  if (liveChatParams) {
    Tawk_API.toggle();
  }
}

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/63aaee0447425128790a46fa/1gl9r3h1m';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);

setTimeout(() => {
  livechatHandler();
}, 1000)
})();
