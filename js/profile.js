var text_elem = document.getElementById('text-to-change');
var changer = 1;

function changeText()
{
  console.log(changer);
  if(changer === 0)
  {
    text_elem.innerHTML = "Android Applications.";
  }
  else if(changer === 1)
  {
    text_elem.innerHTML = "Web Applications.";
  }
  else
  {
    text_elem.innerHTML = "Desktop Apllications.";
  }

  changer = (changer + 1) % 3;

  
}

setInterval(changeText, 6995);